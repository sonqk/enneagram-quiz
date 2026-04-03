export const questions = [
  { id: 1, text: "Tôi thường cảm thấy có trách nhiệm phải làm mọi thứ đúng đắn và hoàn hảo.", type: 1 },
  { id: 2, text: "Tôi dễ dàng nhận ra nhu cầu của người khác và muốn giúp đỡ họ.", type: 2 },
  { id: 3, text: "Tôi luôn muốn thành công và được người khác ngưỡng mộ.", type: 3 },
  { id: 4, text: "Tôi cảm thấy mình khác biệt và độc đáo so với người xung quanh.", type: 4 },
  { id: 5, text: "Tôi thích quan sát và phân tích hơn là tham gia trực tiếp.", type: 5 },
  { id: 6, text: "Tôi thường lo lắng về những điều có thể xảy ra và cần sự an tâm từ người khác.", type: 6 },
  { id: 7, text: "Tôi luôn tìm kiếm những trải nghiệm mới và thú vị trong cuộc sống.", type: 7 },
  { id: 8, text: "Tôi không ngại đối đầu và sẵn sàng bảo vệ quan điểm của mình mạnh mẽ.", type: 8 },
  { id: 9, text: "Tôi thường tránh xung đột và muốn mọi người xung quanh được hòa thuận.", type: 9 },
  { id: 10, text: "Tôi có xu hướng tự phê bình bản thân khi mắc lỗi.", type: 1 },
  { id: 11, text: "Tôi cảm thấy ý nghĩa khi người khác cần đến mình.", type: 2 },
  { id: 12, text: "Tôi thường điều chỉnh hình ảnh của mình tùy theo đối tượng giao tiếp.", type: 3 },
  { id: 13, text: "Tôi có cảm xúc sâu sắc và đôi khi cảm thấy bị hiểu lầm.", type: 4 },
  { id: 14, text: "Tôi cần nhiều thời gian một mình để nạp lại năng lượng.", type: 5 },
  { id: 15, text: "Tôi tin tưởng vào các quy tắc và hệ thống đã được thiết lập.", type: 6 },
  { id: 16, text: "Tôi ghét cảm giác bị giới hạn hoặc bỏ lỡ điều gì đó.", type: 7 },
  { id: 17, text: "Tôi cảm thấy quan trọng khi có quyền kiểm soát tình huống.", type: 8 },
  { id: 18, text: "Tôi thường gặp khó khăn khi phải đưa ra quyết định dứt khoát.", type: 9 },
  { id: 19, text: "Tôi có tiêu chuẩn cao và khó chấp nhận sự cẩu thả.", type: 1 },
  { id: 20, text: "Tôi thường đặt nhu cầu của người khác lên trên nhu cầu của bản thân.", type: 2 },
  { id: 21, text: "Mục tiêu và thành tích là động lực chính của tôi.", type: 3 },
  { id: 22, text: "Tôi bị thu hút bởi vẻ đẹp, nghệ thuật và sự thể hiện bản thân.", type: 4 },
  { id: 23, text: "Tôi thích tích lũy kiến thức và hiểu sâu về mọi thứ.", type: 5 },
  { id: 24, text: "Tôi trung thành và đáng tin cậy, luôn sẵn sàng cho những người tôi tin tưởng.", type: 6 },
  { id: 25, text: "Tôi lạc quan và luôn thấy điều tốt đẹp trong mọi tình huống.", type: 7 },
  { id: 26, text: "Tôi ghét khi bị kiểm soát hoặc ai đó cố gắng chi phối tôi.", type: 8 },
  { id: 27, text: "Tôi dễ dàng thấu hiểu quan điểm của mọi người và ít khi phán xét.", type: 9 },
];

export const types = {
  1: { name: "Người Cầu Toàn", en: "The Perfectionist", emoji: "⚖️", color: "#FBBF24", desc: "Bạn có nguyên tắc mạnh mẽ, có trách nhiệm và luôn hướng đến sự hoàn hảo. Bạn tin vào việc làm đúng và cải thiện bản thân.", strengths: ["Có nguyên tắc", "Có trách nhiệm", "Cẩn thận, tỉ mỉ"], challenges: ["Hay tự phê bình", "Cứng nhắc", "Khó chấp nhận sai sót"], famous: "Nelson Mandela, Meryl Streep" },
  2: { name: "Người Giúp Đỡ", en: "The Helper", emoji: "🤝", color: "#F87171", desc: "Bạn ấm áp, chân thành và muốn hỗ trợ người khác. Bạn cảm thấy có ý nghĩa khi được cần đến.", strengths: ["Tốt bụng", "Đồng cảm cao", "Giỏi kết nối"], challenges: ["Khó nói 'không'", "Quên bản thân", "Cần được công nhận"], famous: "Mother Teresa, Oprah Winfrey" },
  3: { name: "Người Thành Đạt", en: "The Achiever", emoji: "🏆", color: "#F59E0B", desc: "Bạn tham vọng, tự tin và hướng đến mục tiêu. Bạn biết cách thích nghi và tạo ấn tượng.", strengths: ["Quyết đoán", "Hiệu quả cao", "Truyền cảm hứng"], challenges: ["Quá chú trọng hình ảnh", "Tránh né thất bại", "Khó thư giãn"], famous: "Taylor Swift, Elon Musk" },
  4: { name: "Người Cá Biệt", en: "The Individualist", emoji: "🎨", color: "#A78BFA", desc: "Bạn sáng tạo, nhạy cảm và có chiều sâu cảm xúc. Bạn tìm kiếm bản sắc riêng và ý nghĩa.", strengths: ["Sáng tạo", "Cảm xúc phong phú", "Chân thực"], challenges: ["Dễ tự ti", "Hay u sầu", "Cảm giác thiếu thốn"], famous: "Frida Kahlo, Kurt Cobain" },
  5: { name: "Người Điều Tra", en: "The Investigator", emoji: "🔍", color: "#34D399", desc: "Bạn thông minh, quan sát tinh tế và yêu thích kiến thức. Bạn thích hiểu bản chất sự vật.", strengths: ["Tư duy sâu sắc", "Độc lập", "Chuyên gia lĩnh vực"], challenges: ["Xa cách cảm xúc", "Cô lập", "Tích trữ thông tin"], famous: "Albert Einstein, Bill Gates" },
  6: { name: "Người Trung Thành", en: "The Loyalist", emoji: "🛡️", color: "#60A5FA", desc: "Bạn đáng tin cậy, có trách nhiệm và luôn đề phòng. Bạn trân trọng sự an toàn và lòng tin.", strengths: ["Trung thành", "Cẩn trọng", "Đoàn kết"], challenges: ["Lo lắng", "Nghi ngờ", "Khó tin tưởng bản thân"], famous: "Tom Hanks, George Orwell" },
  7: { name: "Người Nhiệt Huyết", en: "The Enthusiast", emoji: "✨", color: "#2DD4BF", desc: "Bạn vui vẻ, tự phát và đầy năng lượng. Bạn luôn tìm kiếm niềm vui và trải nghiệm mới.", strengths: ["Lạc quan", "Sáng tạo", "Linh hoạt"], challenges: ["Thiếu tập trung", "Tránh né đau khổ", "Cả thèm chóng chán"], famous: "Robin Williams, Miley Cyrus" },
  8: { name: "Người Thách Thức", en: "The Challenger", emoji: "🦁", color: "#EF4444", desc: "Bạn tự tin, quyết đoán và bảo vệ người bạn yêu thương. Bạn không sợ áp lực hay đối đầu.", strengths: ["Lãnh đạo mạnh", "Bảo vệ người yếu", "Quyết đoán"], challenges: ["Cứng đầu", "Kiểm soát", "Khó cho thấy tổn thương"], famous: "Winston Churchill, Martin Luther King Jr." },
  9: { name: "Người Hòa Giải", en: "The Peacemaker", emoji: "☮️", color: "#4ADE80", desc: "Bạn điềm tĩnh, chấp nhận và có khả năng kết nối mọi người. Bạn tạo ra sự hài hòa.", strengths: ["Nhẫn nại", "Bao dung", "Dễ gần"], challenges: ["Trì hoãn", "Tự xóa mờ bản thân", "Khó nói lên ý kiến"], famous: "Dalai Lama, Barack Obama" },
};

export const motivations = {
  1: { fear: "Xấu xa, sai trái, không hoàn hảo", desire: "Chính trực, hoàn hảo", vice: "Tức giận", virtue: "Bình tĩnh" },
  2: { fear: "Không được yêu thương, vô dụng", desire: "Được yêu thương, trân trọng", vice: "Kiêu hãnh", virtue: "Khiêm tốn" },
  3: { fear: "Vô giá trị, thất bại", desire: "Thành công, ngưỡng mộ", vice: "Lừa dối", virtue: "Chân thực" },
  4: { fear: "Không có danh tính, tầm thường", desire: "Tìm thấy bản thân", vice: "Ghen tị", virtue: "Cân bằng" },
  5: { fear: "Vô dụng, choáng ngợp", desire: "Có năng lực, hiểu biết", vice: "Tích trữ", virtue: "Buông bỏ" },
  6: { fear: "Bị bỏ rơi, bất an", desire: "An toàn, hỗ trợ", vice: "Lo sợ", virtue: "Can đảm" },
  7: { fear: "Đau khổ, thiếu thốn, giới hạn", desire: "Hạnh phúc, thỏa mãn", vice: "Phóng túng", virtue: "Điềm tĩnh" },
  8: { fear: "Bị kiểm soát, tổn thương", desire: "Bảo vệ bản thân", vice: "Ham muốn quyền lực", virtue: "Vô tư" },
  9: { fear: "Mất kết nối, xung đột", desire: "Bình an nội tâm", vice: "Lười biếng tinh thần", virtue: "Hành động" },
};

export const wings = {
  1: { left: 9, right: 2, desc: { 9: "Kiểu 1w9: Điềm tĩnh, hướng nội, nguyên tắc ít phán xét.", 2: "Kiểu 1w2: Nhiệt tình, thực dụng, muốn cải thiện thế giới." } },
  2: { left: 1, right: 3, desc: { 1: "Kiểu 2w1: Nguyên tắc, phụng sự từ lương tâm.", 3: "Kiểu 2w3: Năng động, hướng thành tích, giỏi kết nối." } },
  3: { left: 2, right: 4, desc: { 2: "Kiểu 3w2: Lôi cuốn, dùng thành tích để được yêu thích.", 4: "Kiểu 3w4: Sáng tạo, hướng nội, tìm kiếm sự độc đáo." } },
  4: { left: 3, right: 5, desc: { 3: "Kiểu 4w3: Biểu cảm, thể hiện bản thân qua nghệ thuật.", 5: "Kiểu 4w5: Trí tuệ, sáng tạo từ chiều sâu nội tâm cô đơn." } },
  5: { left: 4, right: 6, desc: { 4: "Kiểu 5w4: Nguyên bản, tưởng tượng sâu sắc.", 6: "Kiểu 5w6: Thực dụng, cẩn trọng, hướng đến hệ thống." } },
  6: { left: 5, right: 7, desc: { 5: "Kiểu 6w5: Hướng nội, độc lập, bảo vệ qua kiến thức.", 7: "Kiểu 6w7: Thân thiện, xử lý lo lắng qua sự hoạt động." } },
  7: { left: 6, right: 8, desc: { 6: "Kiểu 7w6: Có trách nhiệm hơn, lạc quan nhưng biết lo xa.", 8: "Kiểu 7w8: Quyết đoán, thực dụng, táo bạo đối đầu." } },
  8: { left: 7, right: 9, desc: { 7: "Kiểu 8w7: Ham muốn trải nghiệm, năng động bốc đồng.", 9: "Kiểu 8w9: Kiên nhẫn, điềm tĩnh bảo vệ người khác." } },
  9: { left: 8, right: 1, desc: { 8: "Kiểu 9w8: Ý kiến rõ ràng, vững vàng sẵn sàng đứng lên.", 1: "Kiểu 9w1: Lý tưởng hóa, đạo đức sâu sắc." } },
};

export const centers = {
  body:  { types: [8, 9, 1], name: "Trung Tâm Bản Năng", icon: "🌋", theme: "Giận dữ", color: "#F87171" },
  heart: { types: [2, 3, 4], name: "Trung Tâm Cảm Xúc", icon: "💖", theme: "Xấu Hổ", color: "#F472B6" },
  head:  { types: [5, 6, 7], name: "Trung Tâm Tư Duy",  icon: "🧠", theme: "Lo Sợ", color: "#60A5FA" },
};

export function getCenterForType(typeNum) {
  for (const [, c] of Object.entries(centers)) {
    if (c.types.includes(typeNum)) return c;
  }
  return null;
}

export const arrows = {
  1: { growth: { to: 7, note: "Thư giãn, tự phát, cởi mở hơn." }, stress: { to: 4, note: "Cô đơn, u sầu tự phê bình." } },
  2: { growth: { to: 4, note: "Nhận thức rõ nhu cầu thật của mình." }, stress: { to: 8, note: "Kiểm soát, đòi hỏi gay gắt." } },
  3: { growth: { to: 6, note: "Trung thành, hợp tác chân thực." }, stress: { to: 9, note: "Mất phương hướng, vô cảm." } },
  4: { growth: { to: 1, note: "Kỷ luật, hành động có mục đích." }, stress: { to: 2, note: "Bám víu, quá phụ thuộc." } },
  5: { growth: { to: 8, note: "Quyết đoán, tự tin hành động." }, stress: { to: 7, note: "Phân tâm, chạy trốn thực tại." } },
  6: { growth: { to: 9, note: "Bình tĩnh, tin tưởng vững chãi." }, stress: { to: 3, note: "Bận rộn giả tạo, khoe khoang." } },
  7: { growth: { to: 5, note: "Tập trung sâu sắc, nhạy bén." }, stress: { to: 1, note: "Cứng nhắc, cầu toàn gắt gỏng." } },
  8: { growth: { to: 2, note: "Ấm áp, sẵn sàng yếu đuối." }, stress: { to: 5, note: "Thu mình, xa cách lạnh nhạt." } },
  9: { growth: { to: 3, note: "Chủ động khẳng định giá trị." }, stress: { to: 6, note: "Lo âu, ngờ vực xung quanh." } },
};

export const options = [
  { label: "Hoàn toàn không", value: 1 },
  { label: "Ít khi", value: 2 },
  { label: "Phân vân", value: 3 },
  { label: "Khá đúng", value: 4 },
  { label: "Rất đúng", value: 5 },
];
