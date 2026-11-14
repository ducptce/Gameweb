import Phaser from 'phaser';
import MarketScene from './scenes/MarketScene.js';
import { GAME_CONFIG, ITEMS } from './data/gameData.js';
import {
  advanceRound,
  buyItem,
  createNewGame,
  getMaxBuyQuantity,
  getMaxSellQuantity,
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
  $('#topbar-right').innerHTML = `<span class="player-chip">✦ ${escapeHtml(gameState.playerName)}</span>`;
  renderGame();
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

  $('#market-grid').innerHTML = ITEMS.map((item) => {
    const quote = gameState.market[item.id];
    const soldOut = quote.remainingStock <= 0;
    const affordable = getMaxBuyQuantity(gameState, item.id) > 0;
    return `
      <article class="item-card ${soldOut ? 'is-sold-out' : ''}">
        <div class="item-card-top"><span class="item-category">${escapeHtml(item.category)}</span><span class="stock-count">${soldOut ? 'HẾT HÀNG' : `CÒN ${quote.remainingStock}`}</span></div>
        <div class="item-identity"><span class="item-icon">${item.icon}</span><div><h3>${escapeHtml(item.name)}</h3><p>${money(item.basePrice)} <span>· giá gốc</span></p></div></div>
        <div class="price-row"><span>Giá mua</span><strong class="buy-price">${money(quote.buyPrice)}</strong></div>
        <div class="price-row"><span>Giá bán lại</span><strong class="sell-price">${money(quote.sellPrice)}</strong></div>
        <button class="buy-button" type="button" data-action="open-buy" data-item-id="${item.id}" ${soldOut || !affordable ? 'disabled' : ''}>${soldOut ? 'ĐÃ BÁN HẾT' : !affordable ? 'KHÔNG ĐỦ VỐN' : 'MUA HÀNG'} <span>＋</span></button>
      </article>`;
  }).join('');

  const ownedItems = ITEMS.filter((item) => (gameState.inventory[item.id] ?? 0) > 0);
  const totalUnits = ownedItems.reduce((sum, item) => sum + gameState.inventory[item.id], 0);
  $('#warehouse-count').textContent = `${totalUnits} món`;
  if (!ownedItems.length) {
    $('#warehouse-track').innerHTML = '<div class="warehouse-empty"><span>▧</span> Kho đang trống. Hãy mua món hàng đầu tiên ở phiên chợ phía trên.</div>';
  } else {
    $('#warehouse-track').innerHTML = ownedItems.map((item) => {
      const quote = gameState.market[item.id];
      const quantity = gameState.inventory[item.id];
      return `
        <article class="warehouse-item">
          <div class="warehouse-item-main"><span class="warehouse-item-icon">${item.icon}</span><div><strong>${escapeHtml(item.name)}</strong><small>${quantity} đơn vị · ${money(quote.sellPrice)}/món</small></div></div>
          <button type="button" class="sell-button" data-action="open-sell" data-item-id="${item.id}">BÁN <span>↗</span></button>
        </article>`;
    }).join('');
  }

  $('#next-round-button').textContent = gameState.day === GAME_CONFIG.totalRounds ? 'KẾT SỔ VÁN CHƠI ✓' : 'SANG NGÀY TIẾP →';
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
  const unitPrice = buying ? quote.buyPrice : quote.sellPrice;
  const limit = getDialogLimit();
  quantityDialog.quantity = Math.max(1, Math.min(limit || 1, Math.floor(quantityDialog.quantity) || 1));
  const total = quantityDialog.quantity * unitPrice;

  $('#modal-icon').textContent = item.icon;
  $('#modal-kicker').textContent = buying ? 'MUA HÀNG TỪ CỬA HÀNG' : 'BÁN HÀNG TỪ KHO';
  $('#modal-title').textContent = item.name;
  $('#modal-price-line').innerHTML = `${buying ? 'Giá mua' : 'Giá bán'} mỗi món: <strong>${money(unitPrice)}</strong>`;
  $('#quantity-input').value = String(quantityDialog.quantity);
  $('#quantity-input').max = String(limit);
  $('#quantity-limit').textContent = buying ? `Tối đa ${limit} món (theo vốn và tồn kho)` : `Đang có ${limit} món trong kho`;
  $('#trade-total-label').textContent = buying ? 'Tổng thanh toán' : 'Tiền nhận được';
  $('#trade-total-value').textContent = money(total);
  $('#confirm-trade-button').textContent = buying ? 'XÁC NHẬN MUA HÀNG' : 'XÁC NHẬN BÁN HÀNG';
  $('#confirm-trade-button').disabled = limit < 1;
  $('#modal-error').textContent = limit < 1
    ? buying ? 'Bạn không đủ tiền hoặc cửa hàng đã hết hàng.' : 'Bạn không còn mặt hàng này trong kho.'
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

function goToNextRound() {
  if (!gameState || gameState.status !== 'active') return;
  const result = advanceRound(gameState);
  if (result.finished) {
    completeGame();
  } else {
    renderGame();
  }
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
  const unitPrice = quantityDialog.action === 'buy' ? itemQuote.buyPrice : itemQuote.sellPrice;
  $('#trade-total-value').textContent = money(quantityDialog.quantity * unitPrice);
  $('#quantity-limit').textContent = quantityDialog.action === 'buy'
    ? `Tối đa ${limit} món (theo vốn và tồn kho)`
    : `Đang có ${limit} món trong kho`;
}

$('#start-form').addEventListener('submit', (event) => {
  event.preventDefault();
  beginGame($('#player-name').value);
});
$('#next-round-button').addEventListener('click', goToNextRound);
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
