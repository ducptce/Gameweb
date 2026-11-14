import test from 'node:test';
import assert from 'node:assert/strict';
import { GAME_CONFIG, ITEMS } from '../src/data/gameData.js';
import {
  advanceRound,
  buyItem,
  calculateLiquidationValue,
  createNewGame,
  finishGame,
  getMaxBuyQuantity,
  getMaxSellQuantity,
  getRoundDurationSeconds,
  sellItem
} from '../src/game/gameEngine.js';

const fixedRandom = () => 0.5;
function seededRandom(seed = 123456789) {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

test('new game starts with 10,000 cash, 15 rounds and a random subset of tradable goods', () => {
  const state = createNewGame('Test Merchant', fixedRandom);
  assert.equal(state.cash, 10_000);
  assert.equal(state.day, 1);
  assert.equal(ITEMS.length, 15);
  assert.equal(Object.keys(state.market).length, 15);
  assert.ok(state.availableItemIds.length >= 6 && state.availableItemIds.length <= 10);
  assert.equal(new Set(state.availableItemIds).size, state.availableItemIds.length);
  assert.equal(state.availableItemIds.every((id) => state.market[id].available), true);
  assert.ok(state.availableItemIds.includes(state.currentRumor.itemId), 'the current rumor good should be tradable today');
  assert.equal(state.status, 'active');
});

test('each game schedules exactly four official notice days and 15 unique rumors', () => {
  const state = createNewGame('Test Merchant', fixedRandom);
  const scheduledNotices = state.noticesByDay.filter(Boolean);
  const scheduledRumors = state.rumorsByDay.slice(1);
  assert.equal(scheduledNotices.length, GAME_CONFIG.noticesPerGame);
  assert.equal(scheduledRumors.length, GAME_CONFIG.totalRounds);
  assert.equal(new Set(scheduledRumors.map((rumor) => rumor.id)).size, GAME_CONFIG.totalRounds);
});

test('every item has one shared daily price for buying, selling and end-of-game valuation', () => {
  const state = createNewGame('Same Price', fixedRandom);
  for (const item of ITEMS) {
    assert.ok(Number.isInteger(state.market[item.id].price));
    assert.ok(state.market[item.id].price > 0);
    assert.equal('buyPrice' in state.market[item.id], false);
    assert.equal('sellPrice' in state.market[item.id], false);
  }

  const itemId = state.availableItemIds[0];
  const unitPrice = state.market[itemId].price;
  const buyResult = buyItem(state, itemId, 2);
  assert.equal(buyResult.ok, true);
  assert.equal(buyResult.unitPrice, unitPrice);
  const sellResult = sellItem(state, itemId, 1);
  assert.equal(sellResult.ok, true);
  assert.equal(sellResult.unitPrice, unitPrice);
  assert.equal(state.transactions[0].unitPrice, state.transactions[1].unitPrice);
});

test('daily purchase supply and customer demand are separately limited', () => {
  const state = createNewGame('Daily Capacity', fixedRandom);
  const itemId = state.availableItemIds[0];
  const quote = state.market[itemId];
  const buyLimit = getMaxBuyQuantity(state, itemId);
  assert.ok(buyLimit > 0);
  assert.ok(buyLimit <= quote.remainingStock);
  assert.equal(buyItem(state, itemId, quote.remainingStock + 1).ok, false);

  assert.equal(buyItem(state, itemId, 3).ok, true);
  assert.equal(state.inventory[itemId], 3);
  assert.ok(getMaxSellQuantity(state, itemId) <= quote.remainingDemand);
  assert.equal(sellItem(state, itemId, quote.remainingDemand + 1).ok, false);
  const sellResult = sellItem(state, itemId, 2);
  assert.equal(sellResult.ok, true);
  assert.equal(state.inventory[itemId], 1);
  assert.equal(quote.remainingDemand, quote.totalDemand - 2);
});

test('goods not listed in the current day market cannot be bought or sold', () => {
  const state = createNewGame('Off Market', fixedRandom);
  const unavailable = ITEMS.find((item) => !state.market[item.id].available);
  assert.ok(unavailable);
  assert.equal(getMaxBuyQuantity(state, unavailable.id), 0);
  assert.equal(buyItem(state, unavailable.id, 1).ok, false);
  state.inventory[unavailable.id] = 1;
  assert.equal(getMaxSellQuantity(state, unavailable.id), 0);
  assert.equal(sellItem(state, unavailable.id, 1).ok, false);
});

test('market listings and daily trade quantities are regenerated on each new round', () => {
  const rng = seededRandom(98765);
  const state = createNewGame('Market Rotation', rng);
  const firstDay = state.availableItemIds.join(',');
  const firstPrices = ITEMS.map((item) => state.market[item.id].price).join(',');
  const result = advanceRound(state, rng);
  assert.equal(result.finished, false);
  assert.equal(state.day, 2);
  assert.ok(state.availableItemIds.length >= 6 && state.availableItemIds.length <= 10);
  const secondDay = state.availableItemIds.join(',');
  const secondPrices = ITEMS.map((item) => state.market[item.id].price).join(',');
  assert.notEqual(secondDay, firstDay);
  assert.notEqual(secondPrices, firstPrices);
  for (const itemId of state.availableItemIds) {
    assert.ok(state.market[itemId].remainingStock >= 0);
    assert.ok(state.market[itemId].remainingDemand >= 0);
  }
});

test('game advances through all 15 rounds and final score values all remaining inventory', () => {
  const state = createNewGame('Finisher', fixedRandom);
  const itemId = state.availableItemIds[0];
  assert.equal(buyItem(state, itemId, 1).ok, true);

  for (let round = 1; round < GAME_CONFIG.totalRounds; round += 1) {
    const result = advanceRound(state, fixedRandom);
    assert.equal(result.finished, false);
    assert.equal(state.day, round + 1);
    assert.ok(state.availableItemIds.includes(state.currentRumor.itemId));
    if (state.currentNotice) assert.ok(state.availableItemIds.includes(state.currentNotice.itemId));
  }

  const expectedLiquidation = calculateLiquidationValue(state);
  finishGame(state);
  assert.equal(state.status, 'finished');
  assert.equal(state.liquidationValue, expectedLiquidation);
  assert.equal(state.finalScore, state.cash + expectedLiquidation);
  assert.equal(advanceRound(state, fixedRandom).finished, true);
});

test('each notice is paired with the rumor on the immediately preceding round', () => {
  const state = createNewGame('Paired Events', fixedRandom);
  for (let day = 2; day <= GAME_CONFIG.totalRounds; day += 1) {
    const notice = state.noticesByDay[day];
    if (!notice) continue;
    assert.equal(state.rumorsByDay[day - 1].eventId, notice.eventId);
    assert.equal(state.rumorsByDay[day - 1].itemId, notice.itemId);
  }
});

test('round timeout defaults to 60 seconds without modifying gameData.js', () => {
  assert.equal(getRoundDurationSeconds(), 60);
});
