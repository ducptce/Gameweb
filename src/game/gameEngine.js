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

function validRange(range, fallback) {
  if (!Array.isArray(range) || range.length < 2) return fallback;
  const min = Math.floor(Number(range[0]));
  const max = Math.floor(Number(range[1]));
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < min) return fallback;
  return [min, max];
}

/**
 * GAME_CONFIG.roundDurationSeconds is intentionally optional so projects using
 * the previous gameData.js keep working. Default round duration is 60 seconds.
 */
export function getRoundDurationSeconds() {
  const configured = Number(GAME_CONFIG.roundDurationSeconds ?? 60);
  return Number.isFinite(configured) && configured > 0
    ? Math.max(1, Math.floor(configured))
    : 60;
}

function getAvailableItemCount(rng) {
  // Configure this in gameData.js with dailyAvailableItemCountRange: [min, max].
  const fallback = [6, Math.min(10, ITEMS.length)];
  const [configuredMin, configuredMax] = validRange(
    GAME_CONFIG.dailyAvailableItemCountRange,
    fallback
  );
  const min = Math.min(ITEMS.length, Math.max(1, configuredMin));
  const max = Math.min(ITEMS.length, Math.max(min, configuredMax));
  return randomInt(min, max, rng);
}

function createRoundSchedule(rng) {
  const noticeCount = Math.min(
    Math.max(0, Math.floor(Number(GAME_CONFIG.noticesPerGame) || 0)),
    Math.max(0, GAME_CONFIG.totalRounds - 1),
    NOTIFICATIONS.length
  );
  const selectedNotices = shuffled(NOTIFICATIONS, rng).slice(0, noticeCount);
  const possibleDays = Array.from({ length: GAME_CONFIG.totalRounds - 1 }, (_, index) => index + 2);
  const noticeDays = shuffled(possibleDays, rng).slice(0, noticeCount).sort((a, b) => a - b);

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

/**
 * Every item gets a daily market quote, but only a random subset is tradable.
 * `price` is the one shared buy/sell price for that item during this day.
 * Tradable goods have unlimited daily supply and demand; cash and inventory
 * are the only quantity constraints on purchases and sales.
 */
function buildDailyMarket(rng, modifiers = {}, featuredItemIds = []) {
  const availableCount = getAvailableItemCount(rng);
  const selected = shuffled(ITEMS, rng).slice(0, availableCount).map((item) => item.id);
  // Keep the daily selection random, while ensuring today's rumor/notice goods can be traded.
  const featured = [...new Set(featuredItemIds.filter((id) => ITEMS.some((item) => item.id === id)))];
  for (const featuredId of featured) {
    if (selected.includes(featuredId)) continue;
    let replaceIndex = -1;
    for (let index = selected.length - 1; index >= 0; index -= 1) {
      if (!featured.includes(selected[index])) {
        replaceIndex = index;
        break;
      }
    }
    if (replaceIndex >= 0) selected[replaceIndex] = featuredId;
  }
  const availableItemIds = selected;
  const availableSet = new Set(availableItemIds);
  const market = {};

  for (const item of ITEMS) {
    const baseFactor = randomBetween(GAME_CONFIG.dailyPriceMin, GAME_CONFIG.dailyPriceMax, rng);
    const modifier = modifiers[item.id] ?? 1;
    const price = Math.max(1, Math.round(item.basePrice * baseFactor * modifier));
    const available = availableSet.has(item.id);
    // No daily quantity caps: tradable goods have unlimited shop supply and market demand.
    // The player's cash and owned inventory are the only quantity constraints.
    market[item.id] = { price, available };
  }

  return { market, availableItemIds };
}

export function createNewGame(playerName, rng = Math.random) {
  const cleanName = String(playerName ?? '').trim().slice(0, 18);
  if (!cleanName) throw new Error('Please enter a merchant name.');

  const { rumorsByDay, noticesByDay } = createRoundSchedule(rng);
  const { market, availableItemIds } = buildDailyMarket(rng, {}, [rumorsByDay[1]?.itemId]);
  return {
    playerName: cleanName,
    day: 1,
    cash: GAME_CONFIG.initialCash,
    initialCash: GAME_CONFIG.initialCash,
    inventory: Object.fromEntries(ITEMS.map((item) => [item.id, 0])),
    market,
    availableItemIds,
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
  if (!quote?.available || quote.price <= 0) return 0;
  return Math.max(0, Math.floor(state.cash / quote.price));
}

export function getMaxSellQuantity(state, itemId) {
  const quote = state.market[itemId];
  if (!quote?.available) return 0;
  return Math.max(0, state.inventory[itemId] ?? 0);
}

export function buyItem(state, itemId, quantity) {
  const quote = state.market[itemId];
  const item = ITEMS.find((entry) => entry.id === itemId);
  if (state.status !== 'active') return { ok: false, message: 'Ván chơi đã kết thúc.' };
  if (!item || !quote) return { ok: false, message: 'Không tìm thấy mặt hàng.' };
  if (!Number.isSafeInteger(quantity) || quantity < 1) return { ok: false, message: 'Số lượng phải là số nguyên lớn hơn 0.' };
  if (!quote.available) return { ok: false, message: 'Mặt hàng này không được giao dịch hôm nay.' };
  const total = quantity * quote.price;
  if (total > state.cash) return { ok: false, message: 'Bạn không đủ tiền để mua số lượng này.' };

  state.cash -= total;
  state.inventory[itemId] += quantity;
  state.transactions.push({ day: state.day, action: 'buy', itemId, quantity, unitPrice: quote.price, total });
  return { ok: true, message: `Đã mua ${quantity} ${item.name.toLowerCase()}.`, total, unitPrice: quote.price };
}

export function sellItem(state, itemId, quantity) {
  const quote = state.market[itemId];
  const item = ITEMS.find((entry) => entry.id === itemId);
  if (state.status !== 'active') return { ok: false, message: 'Ván chơi đã kết thúc.' };
  if (!item || !quote) return { ok: false, message: 'Không tìm thấy mặt hàng.' };
  if (!Number.isSafeInteger(quantity) || quantity < 1) return { ok: false, message: 'Số lượng phải là số nguyên lớn hơn 0.' };
  if (!quote.available) return { ok: false, message: 'Chợ không giao dịch mặt hàng này hôm nay.' };
  if (quantity > (state.inventory[itemId] ?? 0)) return { ok: false, message: 'Kho hàng không có đủ số lượng này.' };

  const total = quantity * quote.price;
  state.cash += total;
  state.inventory[itemId] -= quantity;
  state.transactions.push({ day: state.day, action: 'sell', itemId, quantity, unitPrice: quote.price, total });
  return { ok: true, message: `Đã bán ${quantity} ${item.name.toLowerCase()}.`, total, unitPrice: quote.price };
}

export function calculateLiquidationValue(state) {
  return ITEMS.reduce((total, item) => {
    const quantity = state.inventory[item.id] ?? 0;
    // Every good receives a current daily valuation even if it is not tradable today.
    return total + quantity * (state.market[item.id]?.price ?? item.basePrice);
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
      noticeDisplay = { type: 'correction', title: 'Đính chính tin đồn', text: nextNotice.correction, itemId: nextNotice.itemId };
      delete modifiers[nextNotice.itemId];
    }
  }

  state.day = nextDay;
  state.currentRumor = state.rumorsByDay[nextDay];
  state.currentNotice = noticeDisplay;
  const dailyMarket = buildDailyMarket(rng, modifiers, [state.currentRumor?.itemId, noticeDisplay?.itemId]);
  state.market = dailyMarket.market;
  state.availableItemIds = dailyMarket.availableItemIds;

  return { finished: false, state };
}
