import { GAME_CONFIG, ITEMS, NOTIFICATIONS, RUMORS } from '../data/gameData.js';

const randomInt = (min, max, rng) => Math.floor(rng() * (max - min + 1)) + min;
const randomBetween = (min, max, rng) => min + rng() * (max - min);

function shuffled(items, rng) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function createRoundSchedule(rng) {
  const selectedNotices = shuffled(NOTIFICATIONS, rng).slice(0, GAME_CONFIG.noticesPerGame);
  const possibleDays = Array.from({ length: GAME_CONFIG.totalRounds - 1 }, (_, index) => index + 2);
  const noticeDays = shuffled(possibleDays, rng).slice(0, GAME_CONFIG.noticesPerGame).sort((a, b) => a - b);

  const rumorsByDay = Array(GAME_CONFIG.totalRounds + 1).fill(null);
  const noticesByDay = Array(GAME_CONFIG.totalRounds + 1).fill(null);
  const usedRumorIds = new Set();

  selectedNotices.forEach((notice, index) => {
    const day = noticeDays[index];
    const rumor = RUMORS.find((entry) => entry.eventId === notice.eventId);
    if (!rumor) throw new Error(`Missing rumor paired with event: ${notice.eventId}`);
    rumorsByDay[day - 1] = { ...rumor, isTrue: rng() < rumor.truthChance };
    noticesByDay[day] = notice;
    usedRumorIds.add(rumor.id);
  });

  const remainingRumors = shuffled(RUMORS.filter((rumor) => !usedRumorIds.has(rumor.id)), rng)
    .map((rumor) => ({ ...rumor, isTrue: rng() < rumor.truthChance }));
  let nextRumorIndex = 0;

  for (let day = 1; day <= GAME_CONFIG.totalRounds; day += 1) {
    if (!rumorsByDay[day]) {
      rumorsByDay[day] = remainingRumors[nextRumorIndex];
      nextRumorIndex += 1;
    }
  }

  return { rumorsByDay, noticesByDay };
}

function buildMarket(rng, previousMarket = null, modifiers = {}) {
  const market = {};

  for (const item of ITEMS) {
    const baseFactor = randomBetween(GAME_CONFIG.dailyPriceMin, GAME_CONFIG.dailyPriceMax, rng);
    const modifier = modifiers[item.id] ?? 1;
    const buyPrice = Math.max(1, Math.round(item.basePrice * baseFactor * modifier));
    const previousStock = previousMarket?.[item.id];
    const stockRange = item.stockRange;

    market[item.id] = {
      buyPrice,
      sellPrice: Math.max(1, Math.round(buyPrice * GAME_CONFIG.sellPriceRatio)),
      totalStock: previousStock?.totalStock ?? randomInt(stockRange[0], stockRange[1], rng),
      remainingStock: previousStock?.remainingStock ?? randomInt(stockRange[0], stockRange[1], rng)
    };

    // Keep totalStock and remainingStock consistent when a new market is generated.
    if (!previousStock) {
      market[item.id].totalStock = market[item.id].remainingStock;
    }
  }

  return market;
}

export function createNewGame(playerName, rng = Math.random) {
  const cleanName = String(playerName ?? '').trim().slice(0, 18);
  if (!cleanName) throw new Error('Please enter a merchant name.');

  const { rumorsByDay, noticesByDay } = createRoundSchedule(rng);
  return {
    playerName: cleanName,
    day: 1,
    cash: GAME_CONFIG.initialCash,
    initialCash: GAME_CONFIG.initialCash,
    inventory: Object.fromEntries(ITEMS.map((item) => [item.id, 0])),
    market: buildMarket(rng),
    rumorsByDay,
    noticesByDay,
    currentRumor: rumorsByDay[1],
    currentNotice: null,
    transactions: [],
    status: 'active',
    finalScore: null,
    liquidationValue: 0
  };
}

export function getMaxBuyQuantity(state, itemId) {
  const quote = state.market[itemId];
  if (!quote) return 0;
  return Math.max(0, Math.min(quote.remainingStock, Math.floor(state.cash / quote.buyPrice)));
}

export function getMaxSellQuantity(state, itemId) {
  return Math.max(0, state.inventory[itemId] ?? 0);
}

export function buyItem(state, itemId, quantity) {
  const quote = state.market[itemId];
  const item = ITEMS.find((entry) => entry.id === itemId);
  if (state.status !== 'active') return { ok: false, message: 'Ván chơi đã kết thúc.' };
  if (!item || !quote) return { ok: false, message: 'Không tìm thấy mặt hàng.' };
  if (!Number.isSafeInteger(quantity) || quantity < 1) return { ok: false, message: 'Số lượng phải là số nguyên lớn hơn 0.' };
  if (quantity > quote.remainingStock) return { ok: false, message: 'Cửa hàng không còn đủ hàng.' };

  const total = quantity * quote.buyPrice;
  if (total > state.cash) return { ok: false, message: 'Bạn không đủ tiền để mua số lượng này.' };

  state.cash -= total;
  state.inventory[itemId] += quantity;
  quote.remainingStock -= quantity;
  state.transactions.push({ day: state.day, action: 'buy', itemId, quantity, unitPrice: quote.buyPrice, total });
  return { ok: true, message: `Đã mua ${quantity} ${item.name.toLowerCase()}.`, total };
}

export function sellItem(state, itemId, quantity) {
  const quote = state.market[itemId];
  const item = ITEMS.find((entry) => entry.id === itemId);
  if (state.status !== 'active') return { ok: false, message: 'Ván chơi đã kết thúc.' };
  if (!item || !quote) return { ok: false, message: 'Không tìm thấy mặt hàng.' };
  if (!Number.isSafeInteger(quantity) || quantity < 1) return { ok: false, message: 'Số lượng phải là số nguyên lớn hơn 0.' };
  if (quantity > (state.inventory[itemId] ?? 0)) return { ok: false, message: 'Kho hàng không có đủ số lượng này.' };

  const total = quantity * quote.sellPrice;
  state.cash += total;
  state.inventory[itemId] -= quantity;
  state.transactions.push({ day: state.day, action: 'sell', itemId, quantity, unitPrice: quote.sellPrice, total });
  return { ok: true, message: `Đã bán ${quantity} ${item.name.toLowerCase()}.`, total };
}

export function calculateLiquidationValue(state) {
  return ITEMS.reduce((total, item) => {
    const quantity = state.inventory[item.id] ?? 0;
    return total + quantity * (state.market[item.id]?.sellPrice ?? 0);
  }, 0);
}

export function finishGame(state) {
  if (state.status === 'finished') return state;
  state.liquidationValue = calculateLiquidationValue(state);
  state.finalScore = state.cash + state.liquidationValue;
  state.status = 'finished';
  return state;
}

export function advanceRound(state, rng = Math.random) {
  if (state.status !== 'active') return { finished: true, state };
  if (state.day >= GAME_CONFIG.totalRounds) {
    finishGame(state);
    return { finished: true, state };
  }

  const nextDay = state.day + 1;
  const previousRumor = state.rumorsByDay[state.day];
  const nextNotice = state.noticesByDay[nextDay];
  const modifiers = {};
  let noticeDisplay = null;

  if (previousRumor?.isTrue) {
    modifiers[previousRumor.itemId] = previousRumor.rumorMultiplier;
  }

  if (nextNotice) {
    if (previousRumor?.eventId === nextNotice.eventId && previousRumor.isTrue) {
      modifiers[nextNotice.itemId] = (modifiers[nextNotice.itemId] ?? 1) * nextNotice.effectMultiplier;
      noticeDisplay = { type: 'confirmed', title: nextNotice.title, text: nextNotice.message, itemId: nextNotice.itemId };
    } else {
      // A scheduled notice still appears on this day, but can officially debunk the rumor.
      noticeDisplay = { type: 'correction', title: 'Đính chính tin đồn', text: nextNotice.correction, itemId: nextNotice.itemId };
      delete modifiers[nextNotice.itemId];
    }
  }

  state.day = nextDay;
  state.currentRumor = state.rumorsByDay[nextDay];
  state.currentNotice = noticeDisplay;
  state.market = buildMarket(rng, state.market, modifiers);

  return { finished: false, state };
}
