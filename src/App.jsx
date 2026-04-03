import { useState, useEffect } from "react";

const questions = [
  { id: 1,  text: "Tôi thường cảm thấy có trách nhiệm phải làm mọi thứ đúng đắn và hoàn hảo.", type: 1 },
  { id: 2,  text: "Tôi dễ dàng nhận ra nhu cầu của người khác và muốn giúp đỡ họ.", type: 2 },
  { id: 3,  text: "Tôi luôn muốn thành công và được người khác ngưỡng mộ.", type: 3 },
  { id: 4,  text: "Tôi cảm thấy mình khác biệt và độc đáo so với người xung quanh.", type: 4 },
  { id: 5,  text: "Tôi thích quan sát và phân tích hơn là tham gia trực tiếp.", type: 5 },
  { id: 6,  text: "Tôi thường lo lắng về những điều có thể xảy ra và cần sự an tâm từ người khác.", type: 6 },
  { id: 7,  text: "Tôi luôn tìm kiếm những trải nghiệm mới và thú vị trong cuộc sống.", type: 7 },
  { id: 8,  text: "Tôi không ngại đối đầu và sẵn sàng bảo vệ quan điểm của mình mạnh mẽ.", type: 8 },
  { id: 9,  text: "Tôi thường tránh xung đột và muốn mọi người xung quanh được hòa thuận.", type: 9 },
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

const types = {
  1: { name: "Người Cầu Toàn",   en: "The Perfectionist",  emoji: "⚖️", color: "#E8C547", desc: "Bạn có nguyên tắc mạnh mẽ, có trách nhiệm và luôn hướng đến sự hoàn hảo. Bạn tin vào việc làm đúng và cải thiện bản thân.", strengths: ["Có nguyên tắc", "Có trách nhiệm", "Cẩn thận, tỉ mỉ"], challenges: ["Hay tự phê bình", "Cứng nhắc", "Khó chấp nhận sai sót"], famous: "Nelson Mandela, Meryl Streep" },
  2: { name: "Người Giúp Đỡ",    en: "The Helper",         emoji: "🤝", color: "#E87D5A", desc: "Bạn ấm áp, chân thành và luôn muốn hỗ trợ người khác. Bạn cảm thấy có ý nghĩa khi được cần đến và yêu thương.", strengths: ["Tốt bụng", "Đồng cảm cao", "Giỏi kết nối"], challenges: ["Khó nói 'không'", "Quên bản thân", "Cần được công nhận"], famous: "Mother Teresa, Oprah Winfrey" },
  3: { name: "Người Thành Đạt",  en: "The Achiever",       emoji: "🏆", color: "#F0A500", desc: "Bạn tham vọng, tự tin và hướng đến mục tiêu. Bạn biết cách thích nghi và tạo ấn tượng trong bất kỳ hoàn cảnh nào.", strengths: ["Quyết đoán", "Hiệu quả cao", "Truyền cảm hứng"], challenges: ["Quá chú trọng hình ảnh", "Tránh né thất bại", "Khó thư giãn"], famous: "Taylor Swift, Elon Musk" },
  4: { name: "Người Cá Biệt",    en: "The Individualist",  emoji: "🎨", color: "#9B59B6", desc: "Bạn sáng tạo, nhạy cảm và có chiều sâu cảm xúc. Bạn tìm kiếm bản sắc riêng và khát khao được hiểu sâu sắc.", strengths: ["Sáng tạo", "Cảm xúc phong phú", "Chân thực"], challenges: ["Dễ tự ti", "Hay u sầu", "Cảm giác thiếu thốn"], famous: "Frida Kahlo, Bob Dylan" },
  5: { name: "Người Điều Tra",   en: "The Investigator",   emoji: "🔍", color: "#2ECC71", desc: "Bạn thông minh, quan sát tinh tế và yêu thích kiến thức. Bạn thích hiểu bản chất sự vật hơn là hành động bộc phát.", strengths: ["Tư duy sâu sắc", "Độc lập", "Chuyên gia lĩnh vực"], challenges: ["Xa cách cảm xúc", "Cô lập", "Tích trữ thông tin"], famous: "Albert Einstein, Bill Gates" },
  6: { name: "Người Trung Thành",en: "The Loyalist",       emoji: "🛡️", color: "#3498DB", desc: "Bạn đáng tin cậy, có trách nhiệm và luôn đề phòng rủi ro. Bạn trân trọng sự an toàn và lòng tin trong các mối quan hệ.", strengths: ["Trung thành", "Cẩn trọng", "Đoàn kết"], challenges: ["Lo lắng thái quá", "Nghi ngờ", "Khó tin tưởng bản thân"], famous: "Tom Hanks, Jennifer Aniston" },
  7: { name: "Người Nhiệt Huyết",en: "The Enthusiast",     emoji: "✨", color: "#1ABC9C", desc: "Bạn vui vẻ, tự phát và đầy năng lượng. Bạn luôn tìm kiếm niềm vui và tránh những cảm giác tiêu cực.", strengths: ["Lạc quan", "Sáng tạo", "Linh hoạt"], challenges: ["Thiếu tập trung", "Tránh né đau khổ", "Không kiên định"], famous: "Robin Williams, Katy Perry" },
  8: { name: "Người Thách Thức", en: "The Challenger",     emoji: "🦁", color: "#E74C3C", desc: "Bạn tự tin, quyết đoán và bảo vệ những người bạn yêu thương. Bạn sống thật và không sợ đứng trước áp lực.", strengths: ["Lãnh đạo mạnh", "Bảo vệ người yếu", "Quyết đoán"], challenges: ["Cứng đầu", "Kiểm soát", "Khó cho thấy tổn thương"], famous: "Winston Churchill, Martin Luther King Jr." },
  9: { name: "Người Hòa Giải",   en: "The Peacemaker",     emoji: "☮️", color: "#27AE60", desc: "Bạn điềm tĩnh, chấp nhận và có khả năng kết nối mọi người. Bạn tạo ra sự hài hòa và tránh xung đột.", strengths: ["Nhẫn nại", "Bao dung", "Dễ gần"], challenges: ["Trì hoãn", "Tự xóa mờ bản thân", "Khó nói lên ý kiến"], famous: "Dalai Lama, Barack Obama" },
};

// ─── Core Motivations ────────────────────────────────────────────────────────
const motivations = {
  1: { fear: "Bị xem là xấu xa, sai trái hoặc không hoàn hảo", desire: "Trở thành người tốt, chính trực và hoàn hảo", vice: "Tức giận (Giận dữ ẩn)", virtue: "Bình tĩnh nội tâm (Serenity)" },
  2: { fear: "Không được yêu thương, không cần thiết với ai", desire: "Được yêu thương và cảm thấy được trân trọng", vice: "Kiêu hãnh (Pride)", virtue: "Khiêm tốn (Humility)" },
  3: { fear: "Vô giá trị nếu không có thành tích, thất bại", desire: "Có giá trị và được ngưỡng mộ", vice: "Lừa dối (Deceit)", virtue: "Chân thực (Authenticity)" },
  4: { fear: "Không có danh tính, tầm thường, không có ý nghĩa", desire: "Tìm thấy bản thân và ý nghĩa cá nhân", vice: "Ghen tị (Envy)", virtue: "Cân bằng cảm xúc (Equanimity)" },
  5: { fear: "Vô dụng, choáng ngợp, không đủ năng lực", desire: "Có năng lực và hiểu biết", vice: "Tích trữ (Avarice)", virtue: "Buông bỏ (Detachment)" },
  6: { fear: "Mất đi sự hỗ trợ, bị bỏ rơi, bất an", desire: "Được an toàn và được hỗ trợ", vice: "Lo sợ (Fear/Cowardice)", virtue: "Can đảm (Courage)" },
  7: { fear: "Bị tước đoạt, bẫy trong đau khổ hoặc thiếu thốn", desire: "Được hạnh phúc và thỏa mãn", vice: "Phóng túng (Gluttony)", virtue: "Điềm tĩnh (Sobriety)" },
  8: { fear: "Bị kiểm soát, bị tổn thương, bị chi phối", desire: "Bảo vệ bản thân và quyết định số phận của mình", vice: "Ham muốn quyền lực (Lust)", virtue: "Vô tư (Innocence)" },
  9: { fear: "Mất kết nối, xung đột, bị phân ly", desire: "Bình an nội tâm và hòa hợp với thế giới", vice: "Lười biếng tinh thần (Sloth)", virtue: "Hành động (Right Action)" },
};

// ─── Wings ───────────────────────────────────────────────────────────────────
const wings = {
  1: {
    left: 9, right: 2,
    desc: {
      9: "Kiểu 1w9 — Lý tưởng hóa, điềm tĩnh hơn, hướng nội, nguyên tắc nhưng ít phán xét người khác.",
      2: "Kiểu 1w2 — Nhiệt tình, thực dụng, hướng ngoại hơn, muốn cải thiện thế giới qua việc giúp đỡ.",
    },
  },
  2: {
    left: 1, right: 3,
    desc: {
      1: "Kiểu 2w1 — Nguyên tắc, phụng sự từ lương tâm, ít chú trọng sự công nhận hơn.",
      3: "Kiểu 2w3 — Năng động, hướng đến thành tích, giỏi giao tiếp và tạo kết nối xã hội.",
    },
  },
  3: {
    left: 2, right: 4,
    desc: {
      2: "Kiểu 3w2 — Hướng ngoại, lôi cuốn, dùng thành tích để xây dựng kết nối và được yêu thích.",
      4: "Kiểu 3w4 — Sáng tạo, hướng nội hơn, tham vọng nhưng tìm kiếm sự độc đáo riêng.",
    },
  },
  4: {
    left: 3, right: 5,
    desc: {
      3: "Kiểu 4w3 — Hướng ngoại, biểu cảm, thể hiện bản thân qua thành tích và nghệ thuật.",
      5: "Kiểu 4w5 — Hướng nội, trí tuệ, sáng tạo từ chiều sâu nội tâm và sự cô đơn.",
    },
  },
  5: {
    left: 4, right: 6,
    desc: {
      4: "Kiểu 5w4 — Sáng tạo, nguyên bản, hay tưởng tượng nhưng vẫn phân tích.",
      6: "Kiểu 5w6 — Thực dụng, cẩn trọng, hướng đến hợp tác và hệ thống.",
    },
  },
  6: {
    left: 5, right: 7,
    desc: {
      5: "Kiểu 6w5 — Hướng nội, phân tích, độc lập, bảo vệ thông qua kiến thức.",
      7: "Kiểu 6w7 — Hướng ngoại, thân thiện, lo lắng nhưng xử lý qua sự vui vẻ và hoạt động.",
    },
  },
  7: {
    left: 6, right: 8,
    desc: {
      6: "Kiểu 7w6 — Hướng đến cộng đồng, trách nhiệm hơn, vẫn lạc quan nhưng biết lo xa.",
      8: "Kiểu 7w8 — Quyết đoán, thực dụng, đầy năng lượng và không ngại đối đầu.",
    },
  },
  8: {
    left: 7, right: 9,
    desc: {
      7: "Kiểu 8w7 — Hướng ngoại, ham muốn trải nghiệm, năng động và bốc đồng.",
      9: "Kiểu 8w9 — Điềm tĩnh hơn, kiên nhẫn, bảo vệ người khác từ sức mạnh nội tâm.",
    },
  },
  9: {
    left: 8, right: 1,
    desc: {
      8: "Kiểu 9w8 — Quyết đoán hơn, có ý kiến, điềm tĩnh nhưng sẵn sàng đứng lên.",
      1: "Kiểu 9w1 — Nguyên tắc, lý tưởng hóa, điềm tĩnh và có đạo đức sâu sắc.",
    },
  },
};

// ─── Centers of Intelligence ──────────────────────────────────────────────────
const centers = {
  body:  { types: [8, 9, 1], name: "Trung Tâm Bản Năng", en: "Body / Instinctive Center", icon: "🔥", theme: "Tự chủ & Giận dữ", color: "#E74C3C", desc: "Bạn xử lý thế giới qua bản năng và hành động. Cảm xúc cốt lõi là sự tức giận — có thể biểu hiện rõ ràng, bị kìm nén, hoặc chuyển hóa thành nguyên tắc.", traits: ["Hành động quyết đoán", "Hiện diện mạnh mẽ", "Nhạy bén với biên giới cá nhân"] },
  heart: { types: [2, 3, 4], name: "Trung Tâm Cảm Xúc", en: "Heart / Feeling Center",    icon: "💜", theme: "Danh Tính & Xấu Hổ",  color: "#9B59B6", desc: "Bạn xử lý thế giới qua cảm xúc và hình ảnh bản thân. Cảm xúc cốt lõi là sự xấu hổ — thể hiện qua nhu cầu được công nhận, yêu thương hoặc khác biệt.", traits: ["Đồng cảm sâu sắc", "Nhạy cảm với cảm xúc người khác", "Tìm kiếm kết nối chân thực"] },
  head:  { types: [5, 6, 7], name: "Trung Tâm Tư Duy",  en: "Head / Thinking Center",   icon: "💡", theme: "An Toàn & Lo Sợ",     color: "#3498DB", desc: "Bạn xử lý thế giới qua tư duy và phân tích. Cảm xúc cốt lõi là nỗi sợ — được đối phó bằng kiến thức, sự chuẩn bị hoặc tìm kiếm những trải nghiệm mới.", traits: ["Tư duy phân tích", "Lập kế hoạch kỹ lưỡng", "Tìm kiếm sự hiểu biết"] },
};

function getCenterForType(typeNum) {
  for (const [key, c] of Object.entries(centers)) {
    if (c.types.includes(typeNum)) return c;
  }
  return null;
}

// ─── Growth & Stress Arrows ───────────────────────────────────────────────────
const arrows = {
  1: { growth: { to: 7, note: "Trở nên tự phát, vui vẻ và cởi mở với những điều chưa hoàn hảo." }, stress: { to: 4, note: "Trở nên cô đơn, buồn bã và tự ti hơn khi bị áp lực." } },
  2: { growth: { to: 4, note: "Trở nên tự nhận thức hơn và có thể nhìn vào nhu cầu thật của bản thân." }, stress: { to: 8, note: "Trở nên kiểm soát, hung hăng và đòi hỏi khi kiệt sức." } },
  3: { growth: { to: 6, note: "Trở nên trung thành, hợp tác và chân thực với những người xung quanh." }, stress: { to: 9, note: "Trở nên lơ đãng, mơ hồ và mất kết nối với mục tiêu." } },
  4: { growth: { to: 1, note: "Trở nên nguyên tắc, kỷ luật và hành động có mục đích hơn." }, stress: { to: 2, note: "Trở nên bám víu, quá phụ thuộc vào người khác khi căng thẳng." } },
  5: { growth: { to: 8, note: "Trở nên quyết đoán, tự tin và sẵn sàng hành động hơn." }, stress: { to: 7, note: "Trở nên phân tâm, chạy trốn vào kế hoạch hoặc ý tưởng quá nhiều." } },
  6: { growth: { to: 9, note: "Trở nên thư giãn, tin tưởng và tìm thấy sự bình yên nội tâm." }, stress: { to: 3, note: "Trở nên bận rộn thái quá, chú trọng hình ảnh để che giấu nỗi lo." } },
  7: { growth: { to: 5, note: "Trở nên tập trung, sâu sắc và sẵn sàng ngồi lại với cảm xúc khó." }, stress: { to: 1, note: "Trở nên cứng nhắc, phán xét và cầu toàn khi bị áp lực." } },
  8: { growth: { to: 2, note: "Trở nên ấm áp, quan tâm và sẵn sàng dễ bị tổn thương hơn." }, stress: { to: 5, note: "Trở nên thu mình, bí ẩn và rút lui khỏi người khác." } },
  9: { growth: { to: 3, note: "Trở nên chủ động, tập trung vào mục tiêu và tự khẳng định bản thân." }, stress: { to: 6, note: "Trở nên lo lắng, nghi ngờ và tìm kiếm sự đảm bảo từ bên ngoài." } },
};

const options = [
  { label: "Hoàn toàn không đồng ý", value: 1 },
  { label: "Không đồng ý",           value: 2 },
  { label: "Trung lập",              value: 3 },
  { label: "Đồng ý",                 value: 4 },
  { label: "Hoàn toàn đồng ý",       value: 5 },
];

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  size:     Math.random() * 2.5 + 0.5,
  left:     Math.random() * 100,
  top:      Math.random() * 100,
  opacity:  Math.random() * 0.6 + 0.15,
  duration: Math.random() * 3 + 2,
  delay:    Math.random() * 4,
}));

export default function EnneagramQuiz() {
  const [screen,         setScreen]         = useState("intro");
  const [current,        setCurrent]        = useState(0);
  const [answers,        setAnswers]        = useState({});
  const [result,         setResult]         = useState(null);
  const [animating,      setAnimating]      = useState(false);
  const [selected,       setSelected]       = useState(null);
  const [scoresAnimated, setScoresAnimated] = useState(false);

  const progress = (current / questions.length) * 100;

  useEffect(() => {
    if (screen === "result") {
      const t = setTimeout(() => setScoresAnimated(true), 120);
      return () => clearTimeout(t);
    } else {
      setScoresAnimated(false);
    }
  }, [screen]);

  const handleAnswer = (val) => {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = {
        ...answers,
        [questions[current].id]: { value: val, type: questions[current].type },
      };
      setAnswers(newAnswers);
      if (current + 1 < questions.length) {
        setAnimating(true);
        setTimeout(() => {
          setCurrent(current + 1);
          setSelected(null);
          setAnimating(false);
        }, 300);
      } else {
        calcResult(newAnswers);
      }
    }, 400);
  };

  const calcResult = (ans) => {
    const scores = {};
    for (let i = 1; i <= 9; i++) scores[i] = 0;
    Object.values(ans).forEach(({ value, type }) => { scores[type] += value; });
    const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    setResult({ type: parseInt(topType), scores });
    setScreen("result");
  };

  const restart = () => {
    setCurrent(0); setAnswers({}); setResult(null); setSelected(null);
    setScreen("intro");
  };

  const q = questions[current];

  return (
    <div className="app-shell">
      {/* Starfield */}
      <div className="starfield" aria-hidden="true">
        {STARS.map((s) => (
          <div key={s.id} className="star" style={{
            width:              s.size     + "px",
            height:             s.size     + "px",
            left:               s.left     + "%",
            top:                s.top      + "%",
            opacity:            s.opacity,
            animationDuration:  s.duration + "s",
            animationDelay:     s.delay    + "s",
          }} />
        ))}
      </div>

      {/* ── INTRO ── */}
      {screen === "intro" && (
        <div className="screen intro-screen fade-up">
          <div className="intro-symbol" aria-hidden="true">✦</div>
          <div className="label-sm">Trắc Nghiệm Tính Cách</div>
          <h1 className="intro-title">Enneagram</h1>
          <div className="gold-line" />
          <p className="intro-desc">
            Khám phá kiểu tính cách sâu sắc nhất của bạn qua{" "}
            <strong className="gold">27 câu hỏi</strong> được thiết kế để soi rọi
            những động lực, nỗi sợ và điểm mạnh cốt lõi.
          </p>
          <p className="intro-sub">Hãy trả lời thật thành thật — không có câu trả lời đúng hay sai.</p>
          <button id="start-btn" className="btn-primary" onClick={() => setScreen("quiz")}>
            BẮT ĐẦU →
          </button>
          <p className="intro-note">9 kiểu tính cách · ~5 phút</p>
        </div>
      )}

      {/* ── QUIZ ── */}
      {screen === "quiz" && (
        <div className="screen quiz-screen">
          <div className="progress-wrap">
            <div className="progress-labels">
              <span className="label-xxs">Tiến độ</span>
              <span className="progress-count gold">{current + 1} / {questions.length}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: progress + "%" }} />
            </div>
          </div>

          <div className={`card question-card ${animating ? "fade-out" : "fade-up"}`}>
            <div className="label-xs gold">Câu {current + 1}</div>
            <p className="question-text">"{q.text}"</p>
            <div className="options-list">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  id={`option-${opt.value}`}
                  className={`opt-btn ${selected === opt.value ? "selected" : ""}`}
                  onClick={() => handleAnswer(opt.value)}
                >
                  <span className="opt-dot">{opt.value}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === "result" && result && (() => {
        const t              = types[result.type];
        const motiv          = motivations[result.type];
        const wingData       = wings[result.type];
        const center         = getCenterForType(result.type);
        const arrowData      = arrows[result.type];
        const sortedScores   = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);
        const maxScore       = 15;
        // Dominant wing: whichever adjacent type scored higher
        const dominantWing   = result.scores[wingData.left] >= result.scores[wingData.right]
          ? wingData.left : wingData.right;

        return (
          <div className="screen result-screen fade-up">

            {/* ── Header ── */}
            <div className="result-header">
              <div className="label-xs gold" style={{ letterSpacing: 5 }}>Kết Quả Của Bạn</div>
              <div className="result-emoji">{t.emoji}</div>
              <div className="label-xxs" style={{ color: "#7a6a5a", letterSpacing: 2 }}>KIỂU {result.type}</div>
              <h2 className="result-type-name" style={{ color: t.color }}>{t.name}</h2>
              <div className="result-type-en">{t.en}</div>
              <div className="gold-line" style={{ background: `linear-gradient(90deg,transparent,${t.color},transparent)` }} />
              <p className="result-desc">{t.desc}</p>
            </div>

            {/* ── Strengths + Challenges ── */}
            <div className="two-col">
              <div className="card">
                <div className="label-xxs gold" style={{ letterSpacing: 3, marginBottom: 14 }}>Điểm Mạnh</div>
                {t.strengths.map((s, i) => (
                  <div key={i} className="trait-item strength"><span className="trait-dot green">✦</span> {s}</div>
                ))}
              </div>
              <div className="card">
                <div className="label-xxs gold" style={{ letterSpacing: 3, marginBottom: 14 }}>Thách Thức</div>
                {t.challenges.map((c, i) => (
                  <div key={i} className="trait-item challenge"><span className="trait-dot red">✦</span> {c}</div>
                ))}
              </div>
            </div>

            {/* ── Score Bars ── */}
            <div className="card score-card">
              <div className="label-xxs gold" style={{ letterSpacing: 3, marginBottom: 16 }}>Phân Bố Điểm Số</div>
              {sortedScores.map(([typeNum, score]) => {
                const isTop = parseInt(typeNum) === result.type;
                return (
                  <div key={typeNum} className="score-row">
                    <div className="score-labels">
                      <span className={isTop ? "score-label-active" : "score-label"} style={isTop ? { color: t.color } : {}}>
                        {isTop ? "★ " : ""}Kiểu {typeNum} — {types[typeNum].name}
                      </span>
                      <span className="score-value">{score}/15</span>
                    </div>
                    <div className="score-track">
                      <div className="score-fill" style={{
                        width: scoresAnimated ? (score / maxScore) * 100 + "%" : "0%",
                        background: isTop
                          ? `linear-gradient(90deg, ${t.color}, ${t.color}aa)`
                          : "linear-gradient(90deg, #3a3040, #4a4050)",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─────────── DEEP-DIVE SECTIONS ─────────── */}

            {/* ── 1. Core Motivations ── */}
            <div className="section-divider">
              <span className="section-divider-label">Phân Tích Chuyên Sâu</span>
            </div>

            <div className="card deep-card">
              <div className="deep-card-title">
                <span className="deep-icon">🎯</span>
                <span>Động Lực Cốt Lõi</span>
                <span className="deep-en">Core Motivations</span>
              </div>
              <div className="motivation-grid">
                <div className="motiv-item fear">
                  <div className="motiv-label">Nỗi Sợ Cơ Bản</div>
                  <div className="motiv-value">{motiv.fear}</div>
                </div>
                <div className="motiv-item desire">
                  <div className="motiv-label">Khao Khát Cơ Bản</div>
                  <div className="motiv-value">{motiv.desire}</div>
                </div>
                <div className="motiv-item vice">
                  <div className="motiv-label">Điểm Yếu (Vice)</div>
                  <div className="motiv-value">{motiv.vice}</div>
                </div>
                <div className="motiv-item virtue">
                  <div className="motiv-label">Phẩm Hạnh (Virtue)</div>
                  <div className="motiv-value">{motiv.virtue}</div>
                </div>
              </div>
            </div>

            {/* ── 2. Wings ── */}
            <div className="card deep-card">
              <div className="deep-card-title">
                <span className="deep-icon">🪽</span>
                <span>Cánh Tính Cách</span>
                <span className="deep-en">Wings</span>
              </div>
              <p className="deep-intro-text">
                Mỗi kiểu Enneagram chịu ảnh hưởng từ một trong hai kiểu liền kề — được gọi là <em>cánh</em>.
                Cánh nổi trội của bạn dựa trên điểm số bài kiểm tra:
              </p>
              <div className="wings-row">
                {[wingData.left, wingData.right].map((wType) => {
                  const wt  = types[wType];
                  const isDom = wType === dominantWing;
                  return (
                    <div key={wType} className={`wing-card ${isDom ? "wing-dominant" : ""}`}
                      style={isDom ? { borderColor: t.color + "88", background: `${t.color}11` } : {}}>
                      {isDom && <div className="wing-badge" style={{ background: t.color, color: "#111" }}>Cánh Nổi Trội</div>}
                      <div className="wing-emoji">{wt.emoji}</div>
                      <div className="wing-type-label" style={isDom ? { color: t.color } : {}}>
                        Kiểu {wType} — {wt.name}
                      </div>
                      <div className="wing-desc">{wingData.desc[wType]}</div>
                      <div className="wing-score-row">
                        <span className="wing-score-label">Điểm số</span>
                        <span className="wing-score-val" style={isDom ? { color: t.color } : {}}>{result.scores[wType]}/15</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 3. Center of Intelligence ── */}
            <div className="card deep-card">
              <div className="deep-card-title">
                <span className="deep-icon">{center.icon}</span>
                <span>Trung Tâm Trí Tuệ</span>
                <span className="deep-en">Center of Intelligence</span>
              </div>
              <div className="center-badge-row">
                <div className="center-badge" style={{ borderColor: center.color + "66", background: center.color + "18" }}>
                  <span className="center-icon">{center.icon}</span>
                  <div>
                    <div className="center-name" style={{ color: center.color }}>{center.name}</div>
                    <div className="center-en">{center.en}</div>
                  </div>
                </div>
                <div className="center-theme-pill" style={{ background: center.color + "22", color: center.color }}>
                  Chủ đề: {center.theme}
                </div>
              </div>
              <p className="center-desc">{center.desc}</p>
              <div className="center-traits">
                {center.traits.map((tr, i) => (
                  <div key={i} className="center-trait" style={{ borderColor: center.color + "44" }}>
                    <span style={{ color: center.color }}>◆</span> {tr}
                  </div>
                ))}
              </div>
              <div className="center-types-row">
                {center.types.map((ct) => (
                  <span key={ct} className={`center-type-pill ${ct === result.type ? "center-type-active" : ""}`}
                    style={ct === result.type ? { background: t.color, color: "#111" } : {}}>
                    Kiểu {ct}
                  </span>
                ))}
              </div>
            </div>

            {/* ── 4. Growth & Stress Arrows ── */}
            <div className="card deep-card">
              <div className="deep-card-title">
                <span className="deep-icon">🔄</span>
                <span>Hướng Phát Triển & Căng Thẳng</span>
                <span className="deep-en">Growth & Stress Arrows</span>
              </div>
              <p className="deep-intro-text">
                Khi phát triển hoặc căng thẳng, bạn hấp thụ năng lượng của một kiểu khác.
                Hiểu điều này giúp bạn nhận ra bản thân đang ở trạng thái nào.
              </p>
              <div className="arrow-cards">
                {/* Growth */}
                <div className="arrow-card growth-card">
                  <div className="arrow-header">
                    <span className="arrow-emoji">🌱</span>
                    <div>
                      <div className="arrow-label growth-label">Khi Phát Triển</div>
                      <div className="arrow-type-row">
                        <span className="arrow-from-badge" style={{ background: t.color + "33", color: t.color }}>Kiểu {result.type}</span>
                        <span className="arrow-dir">→</span>
                        <span className="arrow-to-badge"
                          style={{ background: types[arrowData.growth.to].color + "33", color: types[arrowData.growth.to].color }}>
                          Kiểu {arrowData.growth.to} · {types[arrowData.growth.to].name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="arrow-note">{arrowData.growth.note}</p>
                </div>
                {/* Stress */}
                <div className="arrow-card stress-card">
                  <div className="arrow-header">
                    <span className="arrow-emoji">⚡</span>
                    <div>
                      <div className="arrow-label stress-label">Khi Căng Thẳng</div>
                      <div className="arrow-type-row">
                        <span className="arrow-from-badge" style={{ background: t.color + "33", color: t.color }}>Kiểu {result.type}</span>
                        <span className="arrow-dir">→</span>
                        <span className="arrow-to-badge"
                          style={{ background: types[arrowData.stress.to].color + "33", color: types[arrowData.stress.to].color }}>
                          Kiểu {arrowData.stress.to} · {types[arrowData.stress.to].name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="arrow-note">{arrowData.stress.note}</p>
                </div>
              </div>
            </div>

            {/* ── Famous ── */}
            <div className="card famous-card" style={{ borderColor: t.color + "44" }}>
              <div className="label-xxs" style={{ color: t.color, letterSpacing: 3, marginBottom: 8 }}>
                Người Nổi Tiếng Cùng Kiểu
              </div>
              <div className="famous-names">{t.famous}</div>
            </div>

            {/* ── Restart ── */}
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button id="restart-btn" className="btn-outline" onClick={restart}>↺ LÀM LẠI</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
