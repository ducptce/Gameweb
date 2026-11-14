# Gói đề xuất 25 tin đồn mới

File dữ liệu: `src/data/rumor-expansion-proposal.js`

Các tin đồn trong file này chưa được nạp vào game và không sửa `src/data/gameData.js`.
Để kích hoạt, hãy sao chép 25 object trong `RUMOR_EXPANSION_25` rồi dán vào bên trong
mảng `RUMORS` trong `src/data/gameData.js` (trước dấu `];` đóng mảng).

Không dán các object này vào `NOTIFICATIONS`: chúng là tin đồn độc lập, không có thông
báo chính thức ghép cặp. Bốn thông báo chính thức mỗi ván và 4 tin đồn ghép cặp hiện có
được giữ nguyên. Sau khi bổ sung, engine vẫn xếp lịch 15 tin đồn khác nhau mỗi ván:
4 tin đồn được chọn để ghép với thông báo và 11 tin còn lại được rút ngẫu nhiên từ pool.

Lưu ý: trường `falseText` được giữ theo schema hiện tại của dự án, nhưng `src/main.js`
hiện chưa hiển thị trường này. Giá chỉ nhận `rumorMultiplier` khi tin đồn được xác định
là đúng; tin sai không áp dụng biến động từ tin đồn.
