import { useState, useEffect, useRef } from "react";

const questions = [
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

const types = {
  1: { name: "Người Cầu Toàn", en: "The Perfectionist", emoji: "⚖️", color: "#E8C547", desc: "Bạn có nguyên tắc mạnh mẽ, có trách nhiệm và luôn hướng đến sự hoàn hảo. Bạn tin vào việc làm đúng và cải thiện bản thân.", strengths: ["Có nguyên tắc", "Có trách nhiệm", "Cẩn thận, tỉ mỉ"], challenges: ["Hay tự phê bình", "Cứng nhắc", "Khó chấp nhận sai sót"], famous: "Nelson Mandela, Meryl Streep" },
  2: { name: "Người Giúp Đỡ", en: "The Helper", emoji: "🤝", color: "#E87D5A", desc: "Bạn ấm áp, chân thành và luôn muốn hỗ trợ người khác. Bạn cảm thấy có ý nghĩa khi được cần đến và yêu thương.", strengths: ["Tốt bụng", "Đồng cảm cao", "Giỏi kết nối"], challenges: ["Khó nói 'không'", "Quên bản thân", "Cần được công nhận"], famous: "Mother Teresa, Oprah Winfrey" },
  3: { name: "Người Thành Đạt", en: "The Achiever", emoji: "🏆", color: "#F0A500", desc: "Bạn tham vọng, tự tin và hướng đến mục tiêu. Bạn biết cách thích nghi và tạo ấn tượng trong bất kỳ hoàn cảnh nào.", strengths: ["Quyết đoán", "Hiệu quả cao", "Truyền cảm hứng"], challenges: ["Quá chú trọng hình ảnh", "Tránh né thất bại", "Khó thư giãn"], famous: "Taylor Swift, Elon Musk" },
  4: { name: "Người Cá Biệt", en: "The Individualist", emoji: "🎨", color: "#9B59B6", desc: "Bạn sáng tạo, nhạy cảm và có chiều sâu cảm xúc. Bạn tìm kiếm bản sắc riêng và khát khao được hiểu sâu sắc.", strengths: ["Sáng tạo", "Cảm xúc phong phú", "Chân thực"], challenges: ["Dễ tự ti", "Hay u sầu", "Cảm giác thiếu thốn"], famous: "Frida Kahlo, Bob Dylan" },
  5: { name: "Người Điều Tra", en: "The Investigator", emoji: "🔍", color: "#2ECC71", desc: "Bạn thông minh, quan sát tinh tế và yêu thích kiến thức. Bạn thích hiểu bản chất sự vật hơn là hành động bộc phát.", strengths: ["Tư duy sâu sắc", "Độc lập", "Chuyên gia lĩnh vực"], challenges: ["Xa cách cảm xúc", "Cô lập", "Tích trữ thông tin"], famous: "Albert Einstein, Bill Gates" },
  6: { name: "Người Trung Thành", en: "The Loyalist", emoji: "🛡️", color: "#3498DB", desc: "Bạn đáng tin cậy, có trách nhiệm và luôn đề phòng rủi ro. Bạn trân trọng sự an toàn và lòng tin trong các mối quan hệ.", strengths: ["Trung thành", "Cẩn trọng", "Đoàn kết"], challenges: ["Lo lắng thái quá", "Nghi ngờ", "Khó tin tưởng bản thân"], famous: "Tom Hanks, Jennifer Aniston" },
  7: { name: "Người Nhiệt Huyết", en: "The Enthusiast", emoji: "✨", color: "#1ABC9C", desc: "Bạn vui vẻ, tự phát và đầy năng lượng. Bạn luôn tìm kiếm niềm vui và tránh những cảm giác tiêu cực.", strengths: ["Lạc quan", "Sáng tạo", "Linh hoạt"], challenges: ["Thiếu tập trung", "Tránh né đau khổ", "Không kiên định"], famous: "Robin Williams, Katy Perry" },
  8: { name: "Người Thách Thức", en: "The Challenger", emoji: "🦁", color: "#E74C3C", desc: "Bạn tự tin, quyết đoán và bảo vệ những người bạn yêu thương. Bạn sống thật và không sợ đứng trước áp lực.", strengths: ["Lãnh đạo mạnh", "Bảo vệ người yếu", "Quyết đoán"], challenges: ["Cứng đầu", "Kiểm soát", "Khó cho thấy tổn thương"], famous: "Winston Churchill, Martin Luther King Jr." },
  9: { name: "Người Hòa Giải", en: "The Peacemaker", emoji: "☮️", color: "#27AE60", desc: "Bạn điềm tĩnh, chấp nhận và có khả năng kết nối mọi người. Bạn tạo ra sự hài hòa và tránh xung đột.", strengths: ["Nhẫn nại", "Bao dung", "Dễ gần"], challenges: ["Trì hoãn", "Tự xóa mờ bản thân", "Khó nói lên ý kiến"], famous: "Dalai Lama, Barack Obama" },
};

const options = [
  { label: "Hoàn toàn không đồng ý", value: 1 },
  { label: "Không đồng ý", value: 2 },
  { label: "Trung lập", value: 3 },
  { label: "Đồng ý", value: 4 },
  { label: "Hoàn toàn đồng ý", value: 5 },
];

// Stable star data generated once
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 0.5,
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: Math.random() * 0.6 + 0.15,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 4,
}));

export default function EnneagramQuiz() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [selected, setSelected] = useState(null);
  const [scoresAnimated, setScoresAnimated] = useState(false);

  const progress = (current / questions.length) * 100;

  // Trigger score bar animation after result screen mounts
  useEffect(() => {
    if (screen === "result") {
      const t = setTimeout(() => setScoresAnimated(true), 100);
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
    Object.values(ans).forEach(({ value, type }) => {
      scores[type] += value;
    });
    const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    setResult({ type: parseInt(topType), scores });
    setScreen("result");
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setResult(null);
    setSelected(null);
    setScreen("intro");
  };

  const q = questions[current];

  return (
    <div className="app-shell">
      {/* Starfield */}
      <div className="starfield" aria-hidden="true">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              width: s.size + "px",
              height: s.size + "px",
              left: s.left + "%",
              top: s.top + "%",
              opacity: s.opacity,
              animationDuration: s.duration + "s",
              animationDelay: s.delay + "s",
            }}
          />
        ))}
      </div>

      {/* INTRO */}
      {screen === "intro" && (
        <div className="screen intro-screen fade-up">
          <div className="intro-symbol" aria-hidden="true">✦</div>
          <div className="label-sm">Trắc Nghiệm Tính Cách</div>
          <h1 className="intro-title">Enneagram</h1>
          <div className="gold-line" />
          <p className="intro-desc">
            Khám phá kiểu tính cách sâu sắc nhất của bạn qua{" "}
            <strong className="gold">27 câu hỏi</strong> được thiết kế để soi
            rọi những động lực, nỗi sợ và điểm mạnh cốt lõi.
          </p>
          <p className="intro-sub">
            Hãy trả lời thật thành thật — không có câu trả lời đúng hay sai.
          </p>
          <button
            id="start-btn"
            className="btn-primary"
            onClick={() => setScreen("quiz")}
          >
            BẮT ĐẦU →
          </button>
          <p className="intro-note">9 kiểu tính cách · ~5 phút</p>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <div className="screen quiz-screen">
          {/* Progress bar */}
          <div className="progress-wrap">
            <div className="progress-labels">
              <span className="label-xxs">Tiến độ</span>
              <span className="progress-count gold">
                {current + 1} / {questions.length}
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: progress + "%" }}
              />
            </div>
          </div>

          {/* Question card */}
          <div
            className={`card question-card ${animating ? "fade-out" : "fade-up"}`}
          >
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

      {/* RESULT */}
      {screen === "result" && result && (() => {
        const t = types[result.type];
        const sortedScores = Object.entries(result.scores).sort(
          (a, b) => b[1] - a[1]
        );
        const maxScore = 15;

        return (
          <div className="screen result-screen fade-up">
            {/* Header */}
            <div className="result-header">
              <div className="label-xs gold" style={{ letterSpacing: 5 }}>
                Kết Quả Của Bạn
              </div>
              <div className="result-emoji">{t.emoji}</div>
              <div className="label-xxs" style={{ color: "#7a6a5a", letterSpacing: 2 }}>
                KIỂU {result.type}
              </div>
              <h2 className="result-type-name" style={{ color: t.color }}>
                {t.name}
              </h2>
              <div className="result-type-en">{t.en}</div>
              <div
                className="gold-line"
                style={{
                  background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                }}
              />
              <p className="result-desc">{t.desc}</p>
            </div>

            {/* Strengths + Challenges */}
            <div className="two-col">
              <div className="card">
                <div className="label-xxs gold" style={{ letterSpacing: 3, marginBottom: 14 }}>
                  Điểm Mạnh
                </div>
                {t.strengths.map((s, i) => (
                  <div key={i} className="trait-item strength">
                    <span className="trait-dot green">✦</span> {s}
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="label-xxs gold" style={{ letterSpacing: 3, marginBottom: 14 }}>
                  Thách Thức
                </div>
                {t.challenges.map((c, i) => (
                  <div key={i} className="trait-item challenge">
                    <span className="trait-dot red">✦</span> {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Score bars */}
            <div className="card score-card">
              <div className="label-xxs gold" style={{ letterSpacing: 3, marginBottom: 16 }}>
                Phân Bố Điểm Số
              </div>
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
                      <div
                        className="score-fill"
                        style={{
                          width: scoresAnimated ? (score / maxScore) * 100 + "%" : "0%",
                          background: isTop
                            ? `linear-gradient(90deg, ${t.color}, ${t.color}aa)`
                            : "linear-gradient(90deg, #3a3040, #4a4050)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Famous */}
            <div
              className="card famous-card"
              style={{ borderColor: t.color + "44" }}
            >
              <div
                className="label-xxs"
                style={{ color: t.color, letterSpacing: 3, marginBottom: 8 }}
              >
                Người Nổi Tiếng Cùng Kiểu
              </div>
              <div className="famous-names">{t.famous}</div>
            </div>

            {/* Restart */}
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button
                id="restart-btn"
                className="btn-outline"
                onClick={restart}
              >
                ↺ LÀM LẠI
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
