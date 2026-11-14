import Phaser from 'phaser';
import MarketScene from './scenes/MarketScene.js';
import { GAME_CONFIG, ITEMS } from './data/gameData.js';
import {
  advanceRound,
  buyItem,
  createNewGame,
  getMaxBuyQuantity,
  getMaxSellQuantity,
  getRoundDurationSeconds,
  sellItem
} from './game/gameEngine.js';
import { readLeaderboard, saveBestRecord } from './storage/leaderboard.js';
import './style.css';

const $ = (selector) => document.querySelector(selector);
const money = (value) => `${Math.round(value).toLocaleString('vi-VN')} xu`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

let gameState = null;
let quantityDialog = null;
let leaderboard = readLeaderboard();
let phaserGame = null;
let roundTimerId = null;
let roundDeadline = 0;
let isAdvancingRound = false;

function startPhaser() {
  phaserGame = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-backdrop',
    transparent: true,
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: window.innerWidth,
      height: window.innerHeight
    },
    render: {
      antialias: true,
      powerPreference: 'low-power'
    },
    scene: [MarketScene]
  });
}

function renderLeaderboard(target, records = leaderboard, highlightName = '') {
  const normalizedHighlight = highlightName.trim().toLocaleLowerCase('vi');
  if (!records.length) {
    target.innerHTML = '<div class="empty-leaderboard">Chưa có kỷ lục nào. Hãy là người đầu tiên!</div>';
    return;
  }

  target.innerHTML = records.slice(0, 5).map((record, index) => {
    const isHighlight = normalizedHighlight && record.name.toLocaleLowerCase('vi') === normalizedHighlight;
    return `
      <div class="leaderboard-row ${isHighlight ? 'is-highlight' : ''}">
        <span class="leader-rank rank-${index + 1}">${index + 1}</span>
        <span class="leader-name">${escapeHtml(record.name)}</span>
        <strong class="leader-score">${money(record.score)}</strong>
      </div>`;
  }).join('');
}

function showWelcome() {
  stopRoundTimer();
  $('#app').classList.remove('is-playing');
  $('#welcome-screen').classList.remove('hidden');
  $('#game-screen').classList.add('hidden');
  $('#topbar-right').innerHTML = '<span class="topbar-note">15 ngày · 1 cơ hội làm giàu</span>';
  renderLeaderboard($('#welcome-leaderboard'));
  $('#player-name').value = gameState?.playerName ?? $('#player-name').value;
  $('#player-name').focus({ preventScroll: true });
}

function beginGame(name) {
  try {
    gameState = createNewGame(name);
  } catch (error) {
    window.alert(error.message);
    return;
  }
  quantityDialog = null;
  $('#welcome-screen').classList.add('hidden');
  $('#game-screen').classList.remove('hidden');
  $('#app').classList.add('is-playing');
  $('#topbar-right').innerHTML = `<span class="player-chip">✦ ${escapeHtml(gameState.playerName)}</span>`;
  startRoundTimer();
  renderGame();
}

function formatTimer(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function renderRoundTimer() {
  const remaining = Math.max(0, Math.ceil((roundDeadline - Date.now()) / 1000));
  const timerValue = $('#timer-value');
  const timerCard = $('#round-timer-card');
  if (timerValue) timerValue.textContent = formatTimer(remaining);
  if (timerCard) timerCard.classList.toggle('is-urgent', remaining <= 10);
  return remaining;
}

function stopRoundTimer() {
  if (roundTimerId !== null) {
    window.clearInterval(roundTimerId);
    roundTimerId = null;
  }
}

function startRoundTimer() {
  stopRoundTimer();
  roundDeadline = Date.now() + getRoundDurationSeconds() * 1000;
  renderRoundTimer();
  roundTimerId = window.setInterval(() => {
    const remaining = renderRoundTimer();
    if (remaining <= 0) goToNextRound('timeout');
  }, 200);
}

function renderGame() {
  if (!gameState) return;

  $('#day-pill').textContent = `NGÀY ${String(gameState.day).padStart(2, '0')} / ${GAME_CONFIG.totalRounds}`;
  $('#day-caption').textContent = gameState.day === 1 ? 'Phiên chợ vừa mở cửa' : `Thương hội đã hoạt động ${gameState.day - 1} ngày`;
  $('#progress-fill').style.width = `${(gameState.day / GAME_CONFIG.totalRounds) * 100}%`;
  $('#cash-value').textContent = money(gameState.cash);

  const rumor = gameState.currentRumor;
  $('#rumor-text').textContent = rumor?.text ?? 'Hôm nay không có lời đồn đáng chú ý.';
  $('#rumor-foot').textContent = gameState.day < GAME_CONFIG.totalRounds
    ? 'Lời đồn này dự báo giá ở ngày kế tiếp; có thể đúng hoặc sai.'
    : 'Ngày cuối cùng: không còn vòng tiếp theo để kiểm chứng lời đồn.';

  const noticeCard = $('#notice-card');
  if (gameState.currentNotice) {
    noticeCard.classList.toggle('notice-correction', gameState.currentNotice.type === 'correction');
    $('#notice-tag').textContent = gameState.currentNotice.type === 'confirmed' ? 'ĐÃ XÁC NHẬN' : 'ĐÍNH CHÍNH';
    $('#notice-text').textContent = gameState.currentNotice.text;
    $('#notice-foot').textContent = gameState.currentNotice.type === 'confirmed'
      ? 'Sự kiện tác động đến giá hôm nay; lời đồn đã xuất hiện ở vòng trước.'
      : 'Lời đồn hôm qua là sai; sự kiện này không làm giá tăng hoặc giảm đột biến.';
  } else {
    noticeCard.classList.remove('notice-correction');
    $('#notice-tag').textContent = 'CHÍNH THỨC';
    $('#notice-text').textContent = 'Hôm nay không có thông báo chính thức. Hãy quan sát biến động giá và cân nhắc giao dịch.';
    $('#notice-foot').textContent = 'Chỉ có 4 ngày trong mỗi ván xuất hiện thông báo.';
  }

  const dailyItems = gameState.availableItemIds
    .map((itemId) => ITEMS.find((item) => item.id === itemId))
    .filter(Boolean);
  $('#market-count').textContent = `${dailyItems.length}/${ITEMS.length} mặt hàng hôm nay`;
  $('#market-grid').innerHTML = dailyItems.map((item) => {
    const quote = gameState.market[item.id];
    const buyLimit = getMaxBuyQuantity(gameState, item.id);
    return `
      <article class="item-card">
        <div class="item-card-top"><span class="item-category">${escapeHtml(item.category)}</span></div>
        <div class="item-identity"><span class="item-icon">${item.icon}</span><div><h3>${escapeHtml(item.name)}</h3><p>${money(item.basePrice)} <span>· giá gốc</span></p></div></div>
        <div class="price-row"><span>Giá mua / bán</span><strong class="market-price">${money(quote.price)}</strong></div>
        <button class="buy-button" type="button" data-action="open-buy" data-item-id="${item.id}" ${buyLimit < 1 ? 'disabled' : ''}>${buyLimit < 1 ? 'KHÔNG ĐỦ VỐN' : 'MUA HÀNG'} <span>＋</span></button>
      </article>`;
  }).join('');
  if (!dailyItems.length) {
    $('#market-grid').innerHTML = '<div class="market-empty">Hôm nay không có mặt hàng nào được mở giao dịch.</div>';
  }

  const ownedItems = ITEMS.filter((item) => (gameState.inventory[item.id] ?? 0) > 0);
  const totalUnits = ownedItems.reduce((sum, item) => sum + gameState.inventory[item.id], 0);
  $('#warehouse-count').textContent = `${totalUnits} món`;
  if (!ownedItems.length) {
    $('#warehouse-track').innerHTML = '<div class="warehouse-empty"><span>▧</span> Kho đang trống. Hãy mua món hàng đầu tiên ở phiên chợ phía trên.</div>';
  } else {
    $('#warehouse-track').innerHTML = ownedItems.map((item) => {
      const quote = gameState.market[item.id];
      const quantity = gameState.inventory[item.id];
      const sellLimit = getMaxSellQuantity(gameState, item.id);
      return `
        <article class="warehouse-item">
          <div class="warehouse-item-main"><span class="warehouse-item-icon">${item.icon}</span><div><strong>${escapeHtml(item.name)}</strong><small>${quantity} món · ${money(quote.price)}/món</small></div></div>
          <button type="button" class="sell-button" data-action="open-sell" data-item-id="${item.id}" ${sellLimit < 1 ? 'disabled' : ''}>BÁN <span>↗</span></button>
        </article>`;
    }).join('');
  }

  $('#next-round-button').textContent = gameState.day === GAME_CONFIG.totalRounds ? 'KẾT SỔ VÁN CHƠI ✓' : 'SANG NGÀY TIẾP →';
  renderRoundTimer();
}

function getDialogLimit() {
  if (!quantityDialog || !gameState) return 0;
  return quantityDialog.action === 'buy'
    ? getMaxBuyQuantity(gameState, quantityDialog.itemId)
    : getMaxSellQuantity(gameState, quantityDialog.itemId);
}

function renderQuantityDialog() {
  if (!quantityDialog || !gameState) return;
  const item = ITEMS.find((entry) => entry.id === quantityDialog.itemId);
  const quote = gameState.market[quantityDialog.itemId];
  if (!item || !quote) return;
  const buying = quantityDialog.action === 'buy';
  const unitPrice = quote.price;
  const limit = getDialogLimit();
  quantityDialog.quantity = Math.max(1, Math.min(limit || 1, Math.floor(quantityDialog.quantity) || 1));
  const total = quantityDialog.quantity * unitPrice;

  $('#modal-icon').textContent = item.icon;
  $('#modal-kicker').textContent = buying ? 'MUA HÀNG TỪ CỬA HÀNG' : 'BÁN HÀNG TỪ KHO';
  $('#modal-title').textContent = item.name;
  $('#modal-price-line').innerHTML = `Giá chung hôm nay (mua và bán): <strong>${money(unitPrice)}</strong>`;
  $('#quantity-input').value = String(quantityDialog.quantity);
  $('#quantity-input').max = String(limit);
  $('#quantity-limit').textContent = buying ? `Tối đa ${limit} món (theo số tiền hiện có)` : `Tối đa ${limit} món (theo số lượng trong kho)`;
  $('#trade-total-label').textContent = buying ? 'Tổng thanh toán' : 'Tiền nhận được';
  $('#trade-total-value').textContent = money(total);
  $('#confirm-trade-button').textContent = buying ? 'XÁC NHẬN MUA HÀNG' : 'XÁC NHẬN BÁN HÀNG';
  $('#confirm-trade-button').disabled = limit < 1;
  $('#modal-error').textContent = limit < 1
    ? buying ? 'Bạn không đủ tiền để mua mặt hàng này.' : 'Kho hàng của bạn không còn mặt hàng này.'
    : '';
  $('#trade-modal').classList.remove('hidden');
}

function openTradeDialog(action, itemId) {
  quantityDialog = { action, itemId, quantity: 1 };
  renderQuantityDialog();
}

function closeTradeDialog() {
  quantityDialog = null;
  $('#trade-modal').classList.add('hidden');
}

function updateDialogQuantity(nextQuantity) {
  if (!quantityDialog) return;
  const limit = getDialogLimit();
  quantityDialog.quantity = Math.max(1, Math.min(limit || 1, Math.floor(Number(nextQuantity)) || 1));
  renderQuantityDialog();
}

function confirmTrade() {
  if (!quantityDialog || !gameState) return;
  const { action, itemId, quantity } = quantityDialog;
  const result = action === 'buy'
    ? buyItem(gameState, itemId, quantity)
    : sellItem(gameState, itemId, quantity);

  if (!result.ok) {
    $('#modal-error').textContent = result.message;
    return;
  }

  phaserGame?.events.emit('merchant:trade', { action, total: result.total });
  closeTradeDialog();
  renderGame();
}

function completeGame() {
  stopRoundTimer();
  quantityDialog = null;
  $('#trade-modal').classList.add('hidden');
  const result = saveBestRecord(gameState.playerName, gameState.finalScore);
  leaderboard = result.leaderboard;
  $('#result-player').textContent = `Thương gia ${gameState.playerName} đã hoàn thành hành trình.`;
  $('#result-score').textContent = money(gameState.finalScore);
  $('#result-breakdown').innerHTML = `
    <div><span>Tiền mặt còn lại</span><strong>${money(gameState.cash)}</strong></div>
    <div><span>Giá trị thanh lý kho hàng</span><strong>${money(gameState.liquidationValue)}</strong></div>
    <div class="breakdown-total"><span>Tổng tài sản</span><strong>${money(gameState.finalScore)}</strong></div>`;
  $('#result-record').textContent = !result.saved
    ? 'Trình duyệt không cho phép lưu kỷ lục. Hãy kiểm tra quyền lưu dữ liệu của trang web.'
    : result.newRecord
      ? '✦ Kỷ lục mới đã được ghi nhận cho tên thương gia này!'
      : 'Bạn chưa vượt kỷ lục tốt nhất trước đó của tên thương gia này.';
  renderLeaderboard($('#result-leaderboard-list'), leaderboard, gameState.playerName);
  $('#game-screen').classList.add('hidden');
  $('#result-modal').classList.remove('hidden');
}

function goToNextRound(reason = 'manual') {
  if (!gameState || gameState.status !== 'active' || isAdvancingRound) return;
  isAdvancingRound = true;
  stopRoundTimer();
  closeTradeDialog();
  const result = advanceRound(gameState);
  if (result.finished) {
    completeGame();
  } else {
    startRoundTimer();
    renderGame();
    if (reason === 'timeout') {
      $('#timer-status').textContent = 'Tự động sang ngày mới';
    } else {
      $('#timer-status').textContent = 'Thời gian của vòng';
    }
  }
  isAdvancingRound = false;
}

function handleClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  switch (button.dataset.action) {
    case 'open-buy':
      openTradeDialog('buy', button.dataset.itemId);
      break;
    case 'open-sell':
      openTradeDialog('sell', button.dataset.itemId);
      break;
    case 'close-modal':
      closeTradeDialog();
      break;
    case 'quantity-minus':
      updateDialogQuantity((quantityDialog?.quantity ?? 1) - 1);
      break;
    case 'quantity-plus':
      updateDialogQuantity((quantityDialog?.quantity ?? 1) + 1);
      break;
    case 'quantity-max':
      updateDialogQuantity(getDialogLimit());
      break;
    case 'confirm-trade':
      confirmTrade();
      break;
    case 'play-again':
      $('#result-modal').classList.add('hidden');
      gameState = null;
      showWelcome();
      break;
    default:
      break;
  }
}

function handleInput(event) {
  if (event.target.id !== 'quantity-input' || !quantityDialog) return;
  if (event.target.value === '') return;
  const inputValue = Math.floor(Number(event.target.value));
  const limit = getDialogLimit();
  quantityDialog.quantity = Math.max(1, Math.min(limit || 1, Number.isFinite(inputValue) ? inputValue : 1));
  const itemQuote = gameState.market[quantityDialog.itemId];
  const unitPrice = itemQuote.price;
  $('#trade-total-value').textContent = money(quantityDialog.quantity * unitPrice);
  $('#quantity-limit').textContent = quantityDialog.action === 'buy'
    ? `Tối đa ${limit} món (theo số tiền hiện có)`
    : `Tối đa ${limit} món (theo số lượng trong kho)`;
}

$('#start-form').addEventListener('submit', (event) => {
  event.preventDefault();
  beginGame($('#player-name').value);
});
$('#next-round-button').addEventListener('click', () => goToNextRound('manual'));
$('#app').addEventListener('click', handleClick);
$('#trade-modal').addEventListener('click', (event) => {
  if (event.target.id === 'trade-modal') closeTradeDialog();
});
$('#trade-modal').addEventListener('click', handleClick);
$('#trade-modal').addEventListener('input', handleInput);
$('#trade-modal').addEventListener('change', (event) => {
  if (event.target.id === 'quantity-input' && quantityDialog) {
    updateDialogQuantity(event.target.value);
  }
});
$('#result-modal').addEventListener('click', handleClick);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quantityDialog) closeTradeDialog();
});
$('#confirm-trade-button').addEventListener('click', confirmTrade);

leaderboard = readLeaderboard();
renderLeaderboard($('#welcome-leaderboard'));
startPhaser();
