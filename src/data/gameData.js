/**
 * CENTRAL GAME CONTENT FILE
 * Add/edit goods, rumors, notices and balance values here.
 * Each rumor's eventId must match its paired notice's eventId.
 */
export const GAME_CONFIG = {
  initialCash: 10_000,
  totalRounds: 15,
  noticesPerGame: 4,
  dailyAvailableItemCountRange: [4, 7],
  roundDurationSeconds: 100,
  dailyPriceMin: 0.84,
  dailyPriceMax: 1.16,
  leaderboardKey: 'moonlit-merchant-leaderboard-v1'
};

export const ITEMS = [
  { id: 'iron', name: 'Sắt', icon: '⚒️', basePrice: 125, category: 'Nguyên liệu' },
  { id: 'gemstone', name: 'Đá quý', icon: '💎', basePrice: 520, category: 'Quý hiếm' },
  { id: 'wisteria', name: 'Hoa tử đằng', icon: '🪻', basePrice: 95, category: 'Thảo mộc' },
  { id: 'cake', name: 'Bánh ngọt', icon: '🍰', basePrice: 78, category: 'Thực phẩm' },
  { id: 'wheat', name: 'Lúa mì', icon: '🌾', basePrice: 48, category: 'Nông sản' },
  { id: 'tomato', name: 'Cà chua', icon: '🍅', basePrice: 38, category: 'Nông sản' },
  { id: 'salt', name: 'Muối', icon: '🧂', basePrice: 58, category: 'Nguyên liệu' },
  { id: 'herb', name: 'Dược thảo', icon: '🌿', basePrice: 118, category: 'Thảo mộc' },
  { id: 'silk', name: 'Lụa', icon: '🧵', basePrice: 235, category: 'Vải vóc' },
  { id: 'honey', name: 'Mật ong', icon: '🍯', basePrice: 102, category: 'Thực phẩm' },
  { id: 'leather', name: 'Da thuộc', icon: '👜', basePrice: 165, category: 'Nguyên liệu' },
  { id: 'crystal', name: 'Tinh thể phép', icon: '🔮', basePrice: 410, category: 'Quý hiếm' },
  { id: 'fish', name: 'Cá tươi', icon: '🐟', basePrice: 68, category: 'Thực phẩm' },
  { id: 'coffee', name: 'Cà phê', icon: '☕', basePrice: 142, category: 'Thực phẩm' },
  { id: 'candle', name: 'Nến thơm', icon: '🕯️', basePrice: 55, category: 'Đồ gia dụng' }
];

// A true rumor applies a small price movement on the following round.
// A false rumor has no direct price effect. The official notice may confirm it.
export const RUMORS = [
  { id: 'rumor-demon-moon', eventId: 'demon-moon', itemId: 'wisteria', text: 'Người đi rừng quả quyết rằng lũ quỷ sẽ tràn vào làng trong đêm trăng tròn. Có lời đồn hoa tử đằng có thể xua đuổi chúng.', truthChance: 0.72, rumorMultiplier: 1.08, falseText: 'Tin đồn về lũ quỷ bị xác nhận là chuyện thêu dệt.' },
  { id: 'rumor-royal-gems', eventId: 'royal-gems', itemId: 'gemstone', text: 'Nghe nói hoàng gia đang tìm mua đá quý để chuẩn bị cho một buổi lễ bí mật.', truthChance: 0.62, rumorMultiplier: 1.07, falseText: 'Hoàng gia phủ nhận tin đồn thu mua đá quý.' },
  { id: 'rumor-iron-strike', eventId: 'iron-strike', itemId: 'iron', text: 'Thợ rèn trong vùng có thể sẽ đình công vì chưa được trả đủ tiền công.', truthChance: 0.68, rumorMultiplier: 1.06, falseText: 'Các lò rèn vẫn hoạt động bình thường.' },
  { id: 'rumor-wheat-locust', eventId: 'wheat-locust', itemId: 'wheat', text: 'Một đàn châu chấu lớn được cho là đang tiến về cánh đồng lúa mì phía bắc.', truthChance: 0.66, rumorMultiplier: 1.07, falseText: 'Đàn châu chấu đã đổi hướng, mùa màng vẫn an toàn.' },
  { id: 'rumor-tomato-frost', eventId: 'tomato-frost', itemId: 'tomato', text: 'Có người dự báo một đợt sương giá bất thường sẽ làm hỏng vườn cà chua.', truthChance: 0.64, rumorMultiplier: 1.08, falseText: 'Dự báo sương giá là sai; vườn cà chua vẫn tốt.' },
  { id: 'rumor-salt-caravan', eventId: 'salt-caravan', itemId: 'salt', text: 'Đoàn xe muối từ miền biển được đồn là sắp tới với số hàng lớn chưa từng có.', truthChance: 0.70, rumorMultiplier: 0.94, falseText: 'Đoàn xe muối đã bị hoãn, nguồn cung không tăng.' },
  { id: 'rumor-herb-fever', eventId: 'herb-fever', itemId: 'herb', text: 'Một căn bệnh lạ có thể đang lan rộng; dân làng bắt đầu tìm mua dược thảo.', truthChance: 0.61, rumorMultiplier: 1.08, falseText: 'Thầy thuốc cho biết không có dịch bệnh nào trong vùng.' },
  { id: 'rumor-silk-route', eventId: 'silk-route', itemId: 'silk', text: 'Con đường thương mại phía đông được cho là sắp mở lại, mang theo rất nhiều lụa.', truthChance: 0.67, rumorMultiplier: 0.94, falseText: 'Con đường phía đông vẫn bị phong tỏa.' },
  { id: 'rumor-honey-banquet', eventId: 'honey-banquet', itemId: 'honey', text: 'Đầu bếp hoàng gia được cho là đang săn lùng mật ong cho một yến tiệc lớn.', truthChance: 0.63, rumorMultiplier: 1.06, falseText: 'Yến tiệc bị hủy; hoàng gia không đặt mua mật ong.' },
  { id: 'rumor-leather-flood', eventId: 'leather-flood', itemId: 'leather', text: 'Mưa lớn có thể làm ngập xưởng thuộc da ở hạ lưu.', truthChance: 0.65, rumorMultiplier: 1.07, falseText: 'Mực nước đã rút, xưởng thuộc da không bị ảnh hưởng.' },
  { id: 'rumor-crystal-ritual', eventId: 'crystal-ritual', itemId: 'crystal', text: 'Hội pháp sư được đồn là cần một lượng lớn tinh thể phép cho nghi lễ sắp tới.', truthChance: 0.69, rumorMultiplier: 1.08, falseText: 'Hội pháp sư thông báo nghi lễ đã bị hủy.' },
  { id: 'rumor-fish-storm', eventId: 'fish-storm', itemId: 'fish', text: 'Ngư dân lo ngại một cơn bão sẽ khiến thuyền cá không thể ra khơi.', truthChance: 0.71, rumorMultiplier: 1.07, falseText: 'Cơn bão đã tan trước khi chạm vào bờ biển.' },
  { id: 'rumor-coffee-tax', eventId: 'coffee-tax', itemId: 'coffee', text: 'Có tin thuế nhập khẩu cà phê sắp được bãi bỏ theo sắc lệnh mới.', truthChance: 0.60, rumorMultiplier: 0.94, falseText: 'Sắc lệnh giảm thuế cà phê không được thông qua.' },
  { id: 'rumor-candle-festival', eventId: 'candle-festival', itemId: 'candle', text: 'Làng đang chuẩn bị một đêm hội thắp đèn, nhu cầu nến thơm có thể tăng mạnh.', truthChance: 0.73, rumorMultiplier: 1.06, falseText: 'Lễ hội thắp đèn bị hoãn vì thời tiết.' },
  { id: 'rumor-cake-festival', eventId: 'cake-festival', itemId: 'cake', text: 'Một cuộc thi làm bánh lớn có thể được tổ chức tại quảng trường vào ngày mai.', truthChance: 0.67, rumorMultiplier: 1.06, falseText: 'Cuộc thi làm bánh chỉ là tin đồn.' }
];

// Only four notices are selected per run. Keep eventId aligned with RUMORS.
export const NOTIFICATIONS = [
  { eventId: 'demon-moon', itemId: 'wisteria', title: 'Đêm trăng quỷ dữ', message: 'Thông báo: Hoa tử đằng thực sự có thể xua đuổi quỷ. Dân làng đổ xô đi tìm mua!', correction: 'Thông báo đính chính: Không có quỷ dữ xuất hiện. Tin đồn về hoa tử đằng là thất thiệt.', effectMultiplier: 2.15 },
  { eventId: 'royal-gems', itemId: 'gemstone', title: 'Hoàng gia thu mua đá quý', message: 'Thông báo: Hoàng gia chính thức mở đợt thu mua đá quý cho đại lễ.', correction: 'Thông báo: Hoàng gia không có kế hoạch thu mua đá quý trong tuần này.', effectMultiplier: 1.82 },
  { eventId: 'iron-strike', itemId: 'iron', title: 'Đình công tại lò rèn', message: 'Thông báo: Các lò rèn đồng loạt ngừng hoạt động, nguồn cung sắt sụt giảm.', correction: 'Thông báo: Các lò rèn vẫn mở cửa, nguồn cung sắt không bị gián đoạn.', effectMultiplier: 1.78 },
  { eventId: 'wheat-locust', itemId: 'wheat', title: 'Châu chấu phá hoại mùa màng', message: 'Thông báo: Đàn châu chấu đã phá hủy nhiều cánh đồng lúa mì. Giá lương thực tăng.', correction: 'Thông báo: Mùa màng được bảo vệ; cảnh báo châu chấu đã bị rút lại.', effectMultiplier: 1.88 },
  { eventId: 'tomato-frost', itemId: 'tomato', title: 'Sương giá bất thường', message: 'Thông báo: Sương giá làm hỏng phần lớn vườn cà chua trong vùng.', correction: 'Thông báo: Thời tiết ấm lên, vườn cà chua không bị thiệt hại.', effectMultiplier: 1.92 },
  { eventId: 'salt-caravan', itemId: 'salt', title: 'Đoàn xe muối cập bến', message: 'Thông báo: Đoàn xe muối lớn đã tới chợ, nguồn cung tăng đột biến.', correction: 'Thông báo: Đoàn xe muối bị thất lạc trên đường và chưa thể tới chợ.', effectMultiplier: 0.56 },
  { eventId: 'herb-fever', itemId: 'herb', title: 'Dịch bệnh lan rộng', message: 'Thông báo: Thầy thuốc xác nhận dịch bệnh; dược thảo trở thành mặt hàng khan hiếm.', correction: 'Thông báo: Không phát hiện dịch bệnh; nhu cầu dược thảo trở lại bình thường.', effectMultiplier: 1.95 },
  { eventId: 'silk-route', itemId: 'silk', title: 'Con đường tơ lụa mở lại', message: 'Thông báo: Tuyến thương mại phía đông hoạt động trở lại, lụa tràn về thị trường.', correction: 'Thông báo: Tuyến thương mại phía đông tiếp tục đóng cửa.', effectMultiplier: 0.58 },
  { eventId: 'honey-banquet', itemId: 'honey', title: 'Yến tiệc hoàng gia', message: 'Thông báo: Hoàng gia đặt mua lượng mật ong lớn để chuẩn bị yến tiệc.', correction: 'Thông báo: Yến tiệc hoàng gia đã bị hủy, đơn hàng mật ong không tồn tại.', effectMultiplier: 1.76 },
  { eventId: 'leather-flood', itemId: 'leather', title: 'Xưởng thuộc da ngập lụt', message: 'Thông báo: Lũ đã làm hư hại xưởng thuộc da lớn nhất vùng.', correction: 'Thông báo: Xưởng thuộc da an toàn sau khi kiểm tra bờ kè.', effectMultiplier: 1.84 },
  { eventId: 'crystal-ritual', itemId: 'crystal', title: 'Nghi lễ của hội pháp sư', message: 'Thông báo: Hội pháp sư xác nhận cần tinh thể phép cho nghi lễ lớn.', correction: 'Thông báo: Hội pháp sư hủy nghi lễ và không thu mua tinh thể phép.', effectMultiplier: 2.05 },
  { eventId: 'fish-storm', itemId: 'fish', title: 'Bão lớn ngoài khơi', message: 'Thông báo: Cảng cá tạm ngừng hoạt động vì bão, lượng cá tươi giảm mạnh.', correction: 'Thông báo: Bão đã tan và các tàu cá có thể ra khơi bình thường.', effectMultiplier: 1.88 },
  { eventId: 'coffee-tax', itemId: 'coffee', title: 'Bãi bỏ thuế cà phê', message: 'Thông báo: Sắc lệnh giảm thuế có hiệu lực, cà phê nhập khẩu đổ về chợ.', correction: 'Thông báo: Sắc lệnh giảm thuế bị bác bỏ; mức thuế cũ được giữ nguyên.', effectMultiplier: 0.61 },
  { eventId: 'candle-festival', itemId: 'candle', title: 'Đêm hội ánh sáng', message: 'Thông báo: Lễ hội thắp đèn chính thức diễn ra tối nay, nhu cầu nến tăng vọt.', correction: 'Thông báo: Lễ hội thắp đèn đã bị hoãn, nhu cầu nến không tăng.', effectMultiplier: 1.82 },
  { eventId: 'cake-festival', itemId: 'cake', title: 'Cuộc thi làm bánh', message: 'Thông báo: Cuộc thi làm bánh được xác nhận, các quầy bánh đông nghịt khách.', correction: 'Thông báo: Cuộc thi làm bánh bị hủy do thiếu người tổ chức.', effectMultiplier: 1.78 }
];

export const getItemById = (itemId) => ITEMS.find((item) => item.id === itemId);
export const getRumorByEventId = (eventId) => RUMORS.find((rumor) => rumor.eventId === eventId);
