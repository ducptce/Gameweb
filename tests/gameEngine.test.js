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
  sellItem
} from '../src/game/gameEngine.js';

const fixedRandom = () => 0.5;

test('new game starts with 10,000 cash, 15 rounds and 15 unique goods', () => {
  const state = createNewGame('Test Merchant', fixedRandom);
  assert.equal(state.cash, 10_000);
  assert.equal(state.day, 1);
  assert.equal(ITEMS.length, 15);
  assert.equal(Object.keys(state.market).length, 15);
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

test('buying respects both cash and shop stock, then selling respects owned quantity', () => {
  const state = createNewGame('Trader', fixedRandom);
  const itemId = ITEMS[0].id;
  const maxBuy = getMaxBuyQuantity(state, itemId);
  assert.ok(maxBuy > 0);
  assert.equal(buyItem(state, itemId, maxBuy + 1).ok, false);

  const buyResult = buyItem(state, itemId, 2);
  assert.equal(buyResult.ok, true);
  assert.equal(state.inventory[itemId], 2);
  assert.ok(state.cash <= GAME_CONFIG.initialCash);

  assert.equal(sellItem(state, itemId, 3).ok, false);
  const sellResult = sellItem(state, itemId, 1);
  assert.equal(sellResult.ok, true);
  assert.equal(state.inventory[itemId], 1);
});

test('game advances through all 15 rounds and final score includes remaining stock value', () => {
  const state = createNewGame('Finisher', fixedRandom);
  const firstItemId = ITEMS[0].id;
  assert.equal(buyItem(state, firstItemId, 1).ok, true);

  for (let round = 1; round < GAME_CONFIG.totalRounds; round += 1) {
    const result = advanceRound(state, fixedRandom);
    assert.equal(result.finished, false);
    assert.equal(state.day, round + 1);
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
