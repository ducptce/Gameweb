/**
 * PROPOSED DATA EXPANSION — 25 additional rumors for Thương Hội Ánh Trăng.
 *
 * This file is intentionally NOT imported by the game and does not modify
 * gameData.js. To activate these entries, manually append the objects to the
 * RUMORS array in src/data/gameData.js. Do not append them to NOTIFICATIONS:
 * these are ordinary rumors without official-notice pairings.
 */
export const RUMOR_EXPANSION_25 = [
  {
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
