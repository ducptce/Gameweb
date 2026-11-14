/**
 * CENTRAL GAME CONTENT FILE
 * Add/edit goods, rumors, notices and balance values here.
 * Each rumor's eventId must match its paired notice's eventId.
 */
export const GAME_CONFIG = {
  initialCash: 10_000,
  totalRounds: 15,
  noticesPerGame: 7,
  dailyAvailableItemCountRange: [4, 7],
  roundDurationSeconds: 40,
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
// Add 25 Rumor
  ,  {
    id: 'rumor-salt-inspection',
    eventId: 'extra-salt-inspection',
    itemId: 'salt',
    text: 'Triều đình được cho là sắp kiểm tra các kho muối tư nhân, khiến nhiều chủ kho tạm ngừng xuất hàng.',
    truthChance: 0.68,
    rumorMultiplier: 1.07,
    falseText: 'Cuộc kiểm tra kho muối chỉ là lời đồn; hoạt động mua bán vẫn diễn ra bình thường.'
  },
  {
    id: 'rumor-wheat-bumper-harvest',
    eventId: 'extra-wheat-bumper-harvest',
    itemId: 'wheat',
    text: 'Nông trại vùng thung lũng được đồn là vừa thu hoạch vụ lúa mì lớn nhất trong nhiều năm.',
    truthChance: 0.72,
    rumorMultiplier: 0.94,
    falseText: 'Tin về vụ mùa bội thu bị phóng đại; sản lượng lúa mì không tăng đáng kể.'
  },
  {
    id: 'rumor-iron-order-cancelled',
    eventId: 'extra-iron-order-cancelled',
    itemId: 'iron',
    text: 'Một hợp đồng đặt mua nông cụ bằng sắt quy mô lớn được cho là vừa bị hủy bỏ.',
    truthChance: 0.59,
    rumorMultiplier: 0.95,
    falseText: 'Thương hội xác nhận hợp đồng nông cụ vẫn còn hiệu lực.'
  },
  {
    id: 'rumor-gemstone-outcrop',
    eventId: 'extra-gemstone-outcrop',
    itemId: 'gemstone',
    text: 'Một người chăn dê được đồn đã phát hiện mạch đá quý lộ thiên ở sườn núi phía nam.',
    truthChance: 0.55,
    rumorMultiplier: 0.94,
    falseText: 'Những viên đá tìm thấy chỉ là khoáng vật thông thường, không phải đá quý.'
  },
  {
    id: 'rumor-wisteria-apothecaries',
    eventId: 'extra-wisteria-apothecaries',
    itemId: 'wisteria',
    text: 'Các thầy thuốc miền núi được cho là đang tìm mua hoa tử đằng để điều chế một loại hương liệu mới.',
    truthChance: 0.64,
    rumorMultiplier: 1.06,
    falseText: 'Các thầy thuốc phủ nhận việc thu mua hoa tử đằng với số lượng lớn.'
  },
  {
    id: 'rumor-cake-sugar-shortage',
    eventId: 'extra-cake-sugar-shortage',
    itemId: 'cake',
    text: 'Một chuyến hàng đường và bơ làm bánh được cho là đã thất lạc trên đường tới thị trấn.',
    truthChance: 0.62,
    rumorMultiplier: 1.05,
    falseText: 'Chuyến hàng nguyên liệu làm bánh đã đến nơi an toàn.'
  },
  {
    id: 'rumor-tomato-preservation',
    eventId: 'extra-tomato-preservation',
    itemId: 'tomato',
    text: 'Nông dân được đồn đã tìm ra cách bảo quản cà chua tươi lâu hơn, hạn chế hư hỏng sau thu hoạch.',
    truthChance: 0.61,
    rumorMultiplier: 0.95,
    falseText: 'Phương pháp bảo quản mới chưa hiệu quả như lời quảng bá.'
  },
  {
    id: 'rumor-herb-medical-school',
    eventId: 'extra-herb-medical-school',
    itemId: 'herb',
    text: 'Một học viện y thuật được cho là sắp mở lớp bào chế, cần thu mua nhiều dược thảo cho học viên.',
    truthChance: 0.70,
    rumorMultiplier: 1.07,
    falseText: 'Học viện hoãn khóa học và chưa đặt mua dược thảo.'
  },
  {
    id: 'rumor-silk-loom-breakdown',
    eventId: 'extra-silk-loom-breakdown',
    itemId: 'silk',
    text: 'Trục máy dệt tại xưởng lụa lớn nhất vùng được đồn đã gãy, khiến sản xuất phải tạm dừng.',
    truthChance: 0.66,
    rumorMultiplier: 1.08,
    falseText: 'Xưởng lụa đã sửa xong máy dệt và tiếp tục sản xuất.'
  },
  {
    id: 'rumor-honey-early-bloom',
    eventId: 'extra-honey-early-bloom',
    itemId: 'honey',
    text: 'Mùa hoa dại được cho là nở sớm, giúp các trại nuôi ong thu được lượng mật lớn hơn thường lệ.',
    truthChance: 0.73,
    rumorMultiplier: 0.94,
    falseText: 'Thời tiết đổi chiều khiến mùa hoa không đến sớm như dự báo.'
  },
  {
    id: 'rumor-leather-tanners-guild',
    eventId: 'extra-leather-tanners-guild',
    itemId: 'leather',
    text: 'Hội thợ thuộc da được cho là đang ngừng nhận đơn để phản đối mức phí sử dụng xưởng mới.',
    truthChance: 0.57,
    rumorMultiplier: 1.06,
    falseText: 'Hội thợ thuộc da đã đạt thỏa thuận và các xưởng vẫn hoạt động.'
  },
  {
    id: 'rumor-crystal-imitation',
    eventId: 'extra-crystal-imitation',
    itemId: 'crystal',
    text: 'Một pháp sư bị đồn đã bán tinh thể nhân tạo giống hàng thật, khiến người mua dè dặt hơn.',
    truthChance: 0.63,
    rumorMultiplier: 0.93,
    falseText: 'Các mẫu tinh thể bị nghi ngờ đều được giám định là hàng thật.'
  },
  {
    id: 'rumor-fish-seasonal-ban',
    eventId: 'extra-fish-seasonal-ban',
    itemId: 'fish',
    text: 'Quan cảng được cho là sắp ban hành lệnh tạm ngừng đánh bắt để bảo vệ mùa cá non.',
    truthChance: 0.69,
    rumorMultiplier: 1.07,
    falseText: 'Lệnh hạn chế đánh bắt chưa được thông qua.'
  },
  {
    id: 'rumor-coffee-inn-demand',
    eventId: 'extra-coffee-inn-demand',
    itemId: 'coffee',
    text: 'Các quán trọ lớn được đồn sẽ đồng loạt thêm cà phê vào thực đơn phục vụ khách đường xa.',
    truthChance: 0.67,
    rumorMultiplier: 1.06,
    falseText: 'Các quán trọ quyết định giữ thực đơn cũ, không tăng lượng cà phê nhập.'
  },
  {
    id: 'rumor-candle-wax-diversion',
    eventId: 'extra-candle-wax-diversion',
    itemId: 'candle',
    text: 'Nguồn sáp ong từ miền tây được cho là đang bị các thầy thuốc thu mua để chế thuốc mỡ.',
    truthChance: 0.60,
    rumorMultiplier: 1.07,
    falseText: 'Các thầy thuốc không đặt mua sáp ong; nguồn nguyên liệu làm nến vẫn ổn định.'
  },
  {
    id: 'rumor-salt-new-road',
    eventId: 'extra-salt-new-road',
    itemId: 'salt',
    text: 'Một tuyến xe mới nối vùng khai thác muối với thị trấn được đồn sắp đi vào hoạt động.',
    truthChance: 0.65,
    rumorMultiplier: 0.95,
    falseText: 'Tuyến đường mới chưa được cấp phép và chưa thể vận chuyển muối.'
  },
  {
    id: 'rumor-wheat-granary-audit',
    eventId: 'extra-wheat-granary-audit',
    itemId: 'wheat',
    text: 'Kho lương của quan phủ được cho là đang bị kiểm kê, tạm dừng xuất bán trong vài ngày.',
    truthChance: 0.58,
    rumorMultiplier: 1.06,
    falseText: 'Việc kiểm kê đã hoàn tất mà không làm gián đoạn hoạt động xuất bán.'
  },
  {
    id: 'rumor-iron-recycling',
    eventId: 'extra-iron-recycling',
    itemId: 'iron',
    text: 'Một lò đúc được đồn đã tìm ra cách tái chế phế liệu sắt với chi phí thấp hơn trước.',
    truthChance: 0.62,
    rumorMultiplier: 0.94,
    falseText: 'Thử nghiệm tái chế không đạt chất lượng cần thiết để sản xuất hàng loạt.'
  },
  {
    id: 'rumor-gemstone-fashion',
    eventId: 'extra-gemstone-fashion',
    itemId: 'gemstone',
    text: 'Giới quý tộc được đồn đang chuộng kiểu áo đính đá quý, khiến thợ kim hoàn tăng đơn đặt hàng.',
    truthChance: 0.71,
    rumorMultiplier: 1.06,
    falseText: 'Mốt trang phục đính đá quý nhanh chóng bị giới quý tộc bỏ qua.'
  },
  {
    id: 'rumor-cake-bakery-closure',
    eventId: 'extra-cake-bakery-closure',
    itemId: 'cake',
    text: 'Tiệm bánh lớn nhất thị trấn được đồn phải đóng cửa vì tranh chấp thuê mặt bằng.',
    truthChance: 0.56,
    rumorMultiplier: 1.07,
    falseText: 'Chủ tiệm và chủ nhà đã hòa giải, tiệm bánh vẫn mở cửa.'
  },
  {
    id: 'rumor-fish-river-festival',
    eventId: 'extra-fish-river-festival',
    itemId: 'fish',
    text: 'Lễ hội ven sông được đồn sẽ tổ chức cuộc thi nấu cá, thu hút đông khách từ vùng lân cận.',
    truthChance: 0.68,
    rumorMultiplier: 1.05,
    falseText: 'Ban tổ chức đổi chủ đề lễ hội; cuộc thi nấu cá không diễn ra.'
  },
  {
    id: 'rumor-coffee-new-drink',
    eventId: 'extra-coffee-new-drink',
    itemId: 'coffee',
    text: 'Một đoàn buôn được cho là sắp giới thiệu thức uống rang mới, có thể làm cà phê truyền thống giảm sức hút.',
    truthChance: 0.54,
    rumorMultiplier: 0.95,
    falseText: 'Thức uống mới không được khách hàng ưa chuộng như lời quảng cáo.'
  },
  {
    id: 'rumor-leather-dye-technique',
    eventId: 'extra-leather-dye-technique',
    itemId: 'leather',
    text: 'Thợ thuộc da được đồn đã tìm ra kỹ thuật nhuộm màu bền hơn, khiến nhiều cửa hàng đặt hàng trước.',
    truthChance: 0.65,
    rumorMultiplier: 1.06,
    falseText: 'Màu nhuộm mới nhanh phai và không được thương nhân chấp nhận.'
  },
  {
    id: 'rumor-candle-oil-lamps',
    eventId: 'extra-candle-oil-lamps',
    itemId: 'candle',
    text: 'Nhiều gia đình khá giả được đồn đang chuyển sang dùng đèn dầu, giảm nhu cầu mua nến.',
    truthChance: 0.61,
    rumorMultiplier: 0.95,
    falseText: 'Đèn dầu quá tốn kém; phần lớn gia đình vẫn tiếp tục dùng nến.'
  },
  {
    id: 'rumor-silk-noble-banquet',
    eventId: 'extra-silk-noble-banquet',
    itemId: 'silk',
    text: 'Một gia tộc quyền quý được đồn sẽ tổ chức yến tiệc và đặt may lễ phục bằng lụa cho khách mời.',
    truthChance: 0.70,
    rumorMultiplier: 1.06,
    falseText: 'Yến tiệc bị thu nhỏ và gia tộc không đặt thêm lễ phục bằng lụa.'
  }
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
  { eventId: 'cake-festival', itemId: 'cake', title: 'Cuộc thi làm bánh', message: 'Thông báo: Cuộc thi làm bánh được xác nhận, các quầy bánh đông nghịt khách.', correction: 'Thông báo: Cuộc thi làm bánh bị hủy do thiếu người tổ chức.', effectMultiplier: 1.78 },

  // Add 25 Notice
  // ===== 25 NEW OFFICIAL EVENTS =====
{ eventId: 'extra-salt-inspection', itemId: 'salt', title: 'Triều đình kiểm tra kho muối', message: 'Thông báo: Quan phủ tiến hành kiểm tra các kho muối tư nhân. Nhiều thương nhân bị yêu cầu tạm ngừng xuất hàng, khiến nguồn cung muối giảm mạnh.', correction: 'Thông báo đính chính: Cuộc kiểm tra chỉ mang tính hành chính và không ảnh hưởng đến hoạt động lưu thông muối.', effectMultiplier: 1.78 },
{ eventId: 'extra-wheat-bumper-harvest', itemId: 'wheat', title: 'Vụ mùa lúa mì bội thu', message: 'Thông báo: Các nông trại vùng thung lũng báo cáo sản lượng lúa mì cao kỷ lục. Lượng hàng mới đang được đưa về chợ.', correction: 'Thông báo đính chính: Báo cáo sản lượng đã bị phóng đại. Vụ mùa năm nay chỉ đạt mức bình thường.', effectMultiplier: 0.57 },
{ eventId: 'extra-iron-order-cancelled', itemId: 'iron', title: 'Hợp đồng sắt bị hủy bỏ', message: 'Thông báo: Một thương hội lớn chính thức hủy hợp đồng thu mua nông cụ bằng sắt, khiến nhu cầu sắt trên thị trường giảm mạnh.', correction: 'Thông báo đính chính: Hợp đồng thu mua vẫn còn hiệu lực và thương hội sẽ tiếp tục đặt hàng như kế hoạch.', effectMultiplier: 0.68 },
{ eventId: 'extra-gemstone-outcrop', itemId: 'gemstone', title: 'Mạch đá quý mới được phát hiện', message: 'Thông báo: Một mỏ đá quý lộ thiên đã được tìm thấy ở sườn núi phía nam. Nhiều thợ khai khoáng đang đổ về khu vực này.', correction: 'Thông báo đính chính: Các mẫu khoáng vật được tìm thấy không có giá trị đá quý như nhận định ban đầu.', effectMultiplier: 0.58 },
{ eventId: 'extra-wisteria-apothecaries', itemId: 'wisteria', title: 'Thầy thuốc thu mua hoa tử đằng', message: 'Thông báo: Các thầy thuốc miền núi chính thức đặt mua số lượng lớn hoa tử đằng để điều chế hương liệu quý.', correction: 'Thông báo đính chính: Các hiệu thuốc đã hủy kế hoạch thu mua hoa tử đằng do thay đổi công thức điều chế.', effectMultiplier: 1.72 },
{ eventId: 'extra-cake-sugar-shortage', itemId: 'cake', title: 'Khủng hoảng nguyên liệu làm bánh', message: 'Thông báo: Một chuyến hàng đường và bơ lớn đã thất lạc. Nhiều tiệm bánh buộc phải giảm sản lượng do thiếu nguyên liệu.', correction: 'Thông báo đính chính: Chuyến hàng nguyên liệu đã được tìm thấy và chuyển đến thị trấn an toàn.', effectMultiplier: 1.68 },
{ eventId: 'extra-tomato-preservation', itemId: 'tomato', title: 'Phương pháp bảo quản cà chua mới', message: 'Thông báo: Các nông dân đã áp dụng thành công phương pháp bảo quản cà chua mới, giúp giảm đáng kể lượng hàng hư hỏng sau thu hoạch.', correction: 'Thông báo đính chính: Phương pháp bảo quản mới không đạt hiệu quả như công bố và chưa thể áp dụng rộng rãi.', effectMultiplier: 0.64 },
{ eventId: 'extra-herb-medical-school', itemId: 'herb', title: 'Học viện y thuật mở khóa đào tạo', message: 'Thông báo: Học viện y thuật chính thức mở khóa đào tạo bào chế thuốc và đặt mua lượng lớn dược thảo phục vụ học viên.', correction: 'Thông báo đính chính: Học viện quyết định hoãn khóa đào tạo và hủy đơn đặt mua dược thảo.', effectMultiplier: 1.76 },
{ eventId: 'extra-silk-loom-breakdown', itemId: 'silk', title: 'Xưởng dệt lụa ngừng hoạt động', message: 'Thông báo: Máy dệt tại xưởng lụa lớn nhất vùng bị hư hỏng nghiêm trọng. Sản lượng lụa cung cấp cho thị trường sụt giảm.', correction: 'Thông báo đính chính: Máy dệt đã được sửa chữa và xưởng lụa hoạt động trở lại với công suất bình thường.', effectMultiplier: 1.86 },
{ eventId: 'extra-honey-early-bloom', itemId: 'honey', title: 'Mùa hoa nở sớm bất thường', message: 'Thông báo: Thời tiết thuận lợi khiến hoa dại nở sớm trên diện rộng. Các trại nuôi ong ghi nhận sản lượng mật ong tăng mạnh.', correction: 'Thông báo đính chính: Thời tiết thay đổi khiến mùa hoa không đến sớm như dự kiến. Sản lượng mật ong không tăng.', effectMultiplier: 0.59 },
{ eventId: 'extra-leather-tanners-guild', itemId: 'leather', title: 'Hội thợ thuộc da đình công', message: 'Thông báo: Hội thợ thuộc da chính thức ngừng nhận đơn hàng để phản đối mức phí sử dụng xưởng mới. Nguồn cung da thuộc bị gián đoạn.', correction: 'Thông báo đính chính: Hội thợ thuộc da đã đạt được thỏa thuận với chủ xưởng và tiếp tục sản xuất.', effectMultiplier: 1.76 },
{ eventId: 'extra-crystal-imitation', itemId: 'crystal', title: 'Tinh thể phép giả tràn vào thị trường', message: 'Thông báo: Quan chức giám định xác nhận một lượng lớn tinh thể phép giả đã được bán ra thị trường. Người mua bắt đầu mất niềm tin vào mặt hàng này.', correction: 'Thông báo đính chính: Các mẫu tinh thể bị nghi ngờ đã được kiểm định và xác nhận đều là hàng thật.', effectMultiplier: 0.57 },
{ eventId: 'extra-fish-seasonal-ban', itemId: 'fish', title: 'Lệnh hạn chế đánh bắt cá', message: 'Thông báo: Quan cảng chính thức ban hành lệnh tạm ngừng đánh bắt để bảo vệ mùa cá non. Nhiều thuyền cá phải neo đậu tại cảng.', correction: 'Thông báo đính chính: Lệnh hạn chế đánh bắt chưa được thông qua và hoạt động khai thác cá vẫn diễn ra bình thường.', effectMultiplier: 1.84 },
{ eventId: 'extra-coffee-inn-demand', itemId: 'coffee', title: 'Các quán trọ tăng đơn đặt cà phê', message: 'Thông báo: Những quán trọ lớn trong vùng đồng loạt bổ sung cà phê vào thực đơn. Các thương nhân phải tăng lượng hàng cung cấp.', correction: 'Thông báo đính chính: Các quán trọ quyết định giữ nguyên thực đơn và không tăng đơn đặt cà phê.', effectMultiplier: 1.68 },
{ eventId: 'extra-candle-wax-diversion', itemId: 'candle', title: 'Nguồn sáp ong bị chuyển hướng', message: 'Thông báo: Các thầy thuốc đã ký hợp đồng thu mua phần lớn nguồn sáp ong miền tây để sản xuất thuốc mỡ. Các xưởng nến đối mặt với tình trạng thiếu nguyên liệu.', correction: 'Thông báo đính chính: Các thầy thuốc đã hủy hợp đồng thu mua sáp ong, nguồn nguyên liệu cho xưởng nến được duy trì.', effectMultiplier: 1.74 },
{ eventId: 'extra-salt-new-road', itemId: 'salt', title: 'Tuyến vận chuyển muối mới khai thông', message: 'Thông báo: Tuyến đường mới nối vùng khai thác muối với thị trấn chính thức đi vào hoạt động, giúp lượng muối vận chuyển đến chợ tăng mạnh.', correction: 'Thông báo đính chính: Tuyến đường mới chưa được cấp phép và chưa thể đưa vào khai thác.', effectMultiplier: 0.61 },
{ eventId: 'extra-wheat-granary-audit', itemId: 'wheat', title: 'Kho lương quan phủ tạm ngừng xuất bán', message: 'Thông báo: Quan phủ tiến hành kiểm kê toàn bộ kho lương và tạm dừng xuất bán lúa mì trong thời gian kiểm tra.', correction: 'Thông báo đính chính: Việc kiểm kê đã hoàn tất mà không ảnh hưởng đến hoạt động xuất bán lúa mì.', effectMultiplier: 1.72 },
{ eventId: 'extra-iron-recycling', itemId: 'iron', title: 'Công nghệ tái chế sắt mới', message: 'Thông báo: Một lò đúc trong vùng đã triển khai thành công phương pháp tái chế phế liệu sắt với chi phí thấp, giúp nguồn cung sắt tăng đáng kể.', correction: 'Thông báo đính chính: Phương pháp tái chế mới không đạt tiêu chuẩn chất lượng và chưa thể sản xuất hàng loạt.', effectMultiplier: 0.62 },
{ eventId: 'extra-gemstone-fashion', itemId: 'gemstone', title: 'Mốt trang phục đính đá quý', message: 'Thông báo: Một xu hướng thời trang mới đang lan rộng trong giới quý tộc. Nhiều thợ kim hoàn nhận được đơn đặt hàng trang phục và phụ kiện đính đá quý.', correction: 'Thông báo đính chính: Xu hướng thời trang mới nhanh chóng mất sức hút và các đơn đặt hàng đá quý bị hủy.', effectMultiplier: 1.74 },
{ eventId: 'extra-cake-bakery-closure', itemId: 'cake', title: 'Tiệm bánh lớn nhất thị trấn đóng cửa', message: 'Thông báo: Tiệm bánh lớn nhất thị trấn chính thức ngừng hoạt động do tranh chấp mặt bằng. Nguồn cung bánh ngọt tại chợ giảm mạnh.', correction: 'Thông báo đính chính: Chủ tiệm đã đạt thỏa thuận thuê mặt bằng và cửa hàng tiếp tục hoạt động.', effectMultiplier: 1.73 },
{ eventId: 'extra-fish-river-festival', itemId: 'fish', title: 'Lễ hội ẩm thực ven sông', message: 'Thông báo: Lễ hội ven sông chính thức tổ chức cuộc thi chế biến cá, thu hút đông đảo khách tham dự và làm nhu cầu cá tươi tăng cao.', correction: 'Thông báo đính chính: Ban tổ chức đã thay đổi chủ đề lễ hội và hủy cuộc thi chế biến cá.', effectMultiplier: 1.67 },
{ eventId: 'extra-coffee-new-drink', itemId: 'coffee', title: 'Thức uống mới cạnh tranh với cà phê', message: 'Thông báo: Một loại thức uống rang mới được giới thiệu rộng rãi và nhanh chóng chiếm được cảm tình của khách hàng, khiến nhu cầu cà phê truyền thống suy giảm.', correction: 'Thông báo đính chính: Thức uống mới không được người tiêu dùng đón nhận và cà phê vẫn giữ vị trí phổ biến.', effectMultiplier: 0.65 },
{ eventId: 'extra-leather-dye-technique', itemId: 'leather', title: 'Kỹ thuật nhuộm da thuộc đột phá', message: 'Thông báo: Các thợ thuộc da đã phát triển thành công kỹ thuật nhuộm màu bền hơn. Nhiều cửa hàng thời trang đồng loạt đặt hàng da thuộc.', correction: 'Thông báo đính chính: Màu nhuộm mới nhanh phai và không đáp ứng yêu cầu của các cửa hàng.', effectMultiplier: 1.72 },
{ eventId: 'extra-candle-oil-lamps', itemId: 'candle', title: 'Đèn dầu thay thế nến thơm', message: 'Thông báo: Đèn dầu kiểu mới đang trở thành xu hướng trong các gia đình khá giả. Nhu cầu sử dụng nến thơm giảm đáng kể.', correction: 'Thông báo đính chính: Đèn dầu mới có chi phí sử dụng quá cao và không được thị trường đón nhận rộng rãi.', effectMultiplier: 0.63 },
{ eventId: 'extra-silk-noble-banquet', itemId: 'silk', title: 'Đại yến tiệc của gia tộc quyền quý', message: 'Thông báo: Một gia tộc quyền quý chính thức công bố tổ chức đại yến tiệc và đặt may lễ phục bằng lụa cho toàn bộ khách mời.', correction: 'Thông báo đính chính: Gia tộc đã thu nhỏ quy mô yến tiệc và hủy phần lớn đơn đặt may lễ phục bằng lụa.', effectMultiplier: 1.85 },
];

export const getItemById = (itemId) => ITEMS.find((item) => item.id === itemId);
export const getRumorByEventId = (eventId) => RUMORS.find((rumor) => rumor.eventId === eventId);
