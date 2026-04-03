import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { types, motivations, wings, getCenterForType, arrows } from "../data/enneagram";

const TABS = [
  { id: "scores",      label: "Điểm Số",    icon: "📊" },
  { id: "motivations", label: "Động Lực",   icon: "🎯" },
  { id: "wings",       label: "Cánh",       icon: "🪽" },
  { id: "center",      label: "Trung Tâm",  icon: "🔮" },
  { id: "arrows",      label: "Mũi Tên",    icon: "🔄" },
];

const cardClass = "bg-white/[0.034] backdrop-blur-md rounded-2xl border border-white/8 overflow-hidden";
const sectionTitle = "text-[10px] font-bold uppercase tracking-[0.25em] mb-4";

// ── Scores panel ────────────────────────────────────────────────────────────
function ScoresPanel({ sortedScores, maxScore, resultType, typeColor }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 p-6 md:p-8">
      {sortedScores.map(([typeNum, score], idx) => {
        const isTop = parseInt(typeNum) === resultType;
        const pct = (score / maxScore) * 100;
        return (
          <div key={typeNum}>
            <div className="flex justify-between items-center mb-1.5">
              <span className={`text-sm font-medium ${isTop ? "font-semibold" : "text-slate-400"}`}
                style={isTop ? { color: typeColor } : {}}>
                {isTop ? "★ " : ""}Kiểu {typeNum} — {types[typeNum].name}
              </span>
              <span className="text-xs text-slate-600 font-bold">{score}/15</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.9, delay: idx * 0.06, ease: "easeOut" }}
                style={{ background: isTop ? `linear-gradient(90deg, ${typeColor}99, ${typeColor})` : "#334155" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Motivations panel ────────────────────────────────────────────────────────
function MotivationsPanel({ motiv }) {
  const items = [
    { key: "fear",    label: "Nỗi Sợ Cơ Bản",    color: "#ef4444", bg: "bg-red-500/5",    border: "border-red-500/20"    },
    { key: "desire",  label: "Khao Khát Cơ Bản",  color: "#34d399", bg: "bg-emerald-500/5",border: "border-emerald-500/20" },
    { key: "vice",    label: "Điểm Yếu (Vice)",   color: "#a78bfa", bg: "bg-violet-500/5", border: "border-violet-500/20"  },
    { key: "virtue",  label: "Phẩm Hạnh (Virtue)",color: "#60a5fa", bg: "bg-blue-500/5",   border: "border-blue-500/20"   },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 md:p-8">
      {items.map(({ key, label, color, bg, border }) => (
        <div key={key} className={`${bg} ${border} border rounded-xl p-5`}>
          <div className="text-[10px] uppercase tracking-[0.25em] font-bold mb-2" style={{ color }}>{label}</div>
          <div className="text-slate-200 text-base leading-relaxed">{motiv[key]}</div>
        </div>
      ))}
    </div>
  );
}

// ── Wings panel ──────────────────────────────────────────────────────────────
function WingsPanel({ wingData, dominantWing, scores, typeColor }) {
  return (
    <div className="p-6 md:p-8">
      <p className="text-sm text-slate-500 italic mb-6 leading-relaxed">
        Mỗi kiểu Enneagram chịu ảnh hưởng từ một trong hai kiểu liền kề (cánh).
        Cánh nổi trội được xác định dựa trên điểm số bài kiểm tra.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[wingData.left, wingData.right].map((wType) => {
          const wt = types[wType];
          const isDom = wType === dominantWing;
          return (
            <div key={wType} className={`relative p-6 rounded-2xl border transition-all ${isDom ? "border-amber-500/40 bg-amber-500/8 shadow-[0_0_30px_rgba(212,168,83,0.08)]" : "border-white/8 bg-white/[0.02]"}`}>
              {isDom && (
                <div className="absolute -top-3.5 left-5 px-3 py-1 text-slate-950 text-[9px] font-black uppercase tracking-[0.2em] rounded-full"
                  style={{ background: typeColor }}>
                  Cánh Nổi Trội
                </div>
              )}
              <div className="text-3xl mb-3">{wt.emoji}</div>
              <div className={`font-semibold text-base mb-2 ${isDom ? "text-amber-300" : "text-slate-300"}`}>
                Kiểu {wType} — {wt.name}
              </div>
              <div className="text-sm text-slate-400 italic leading-relaxed mb-4">{wingData.desc[wType]}</div>
              <div className="flex justify-between items-center text-xs pt-3 border-t border-white/6">
                <span className="text-slate-600 uppercase tracking-wider">Điểm số</span>
                <span className={`font-bold ${isDom ? "text-amber-400" : "text-slate-500"}`}>{scores[wType]}/15</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Center panel ─────────────────────────────────────────────────────────────
function CenterPanel({ center, resultType, typeColor }) {
  const descMap = {
    body:  "Bạn xử lý thế giới qua bản năng và phản xạ cơ thể. Cảm xúc cốt lõi là giận dữ — đôi khi biểu hiện rõ ràng, đôi khi bị kìm nén hay chuyển hóa thành nguyên tắc.",
    heart: "Bạn xử lý thế giới qua cảm xúc và hình ảnh bản thân. Cảm xúc cốt lõi là xấu hổ — thể hiện qua nhu cầu công nhận, yêu thương và danh tính.",
    head:  "Bạn xử lý thế giới qua tư duy và phân tích. Cảm xúc cốt lõi là lo sợ — được đối phó bằng kiến thức, kế hoạch hoặc tìm kiếm kích thích mới.",
  };
  const cenKey = Object.entries({ body: center, head: center, heart: center }).find(([k]) =>
    ({ body: [8,9,1], heart: [2,3,4], head: [5,6,7] }[k]?.includes(resultType))
  )?.[0] ?? "body";
  const desc = descMap[cenKey] ?? center.desc ?? "";

  return (
    <div className="p-6 md:p-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-3 p-4 rounded-2xl border mb-6"
        style={{ borderColor: center.color + "44", background: center.color + "12" }}>
        <span className="text-4xl">{center.icon}</span>
        <div>
          <div className="text-lg font-semibold" style={{ color: center.color }}>{center.name}</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">Chủ đề: {center.theme}</div>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed mb-6 text-[15px]">{desc}</p>

      <div className="flex flex-wrap gap-2">
        {center.types.map(ct => (
          <span key={ct}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${ct === resultType ? "text-slate-950 border-transparent shadow-lg" : "text-slate-500 border-white/10 bg-white/4"}`}
            style={ct === resultType ? { background: typeColor, boxShadow: `0 0 16px ${typeColor}44` } : {}}
          >
            Kiểu {ct}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Arrows panel ─────────────────────────────────────────────────────────────
function ArrowsPanel({ arrowData, resultType, typeColor }) {
  const growthType = types[arrowData.growth.to];
  const stressType = types[arrowData.stress.to];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-5">
      <p className="text-sm text-slate-500 italic leading-relaxed -mt-2">
        Khi phát triển hoặc căng thẳng, bạn hấp thụ năng lượng của kiểu khác. Hiểu điều này giúp nhận ra trạng thái hiện tại của bản thân.
      </p>

      {/* Growth */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="text-2xl">🌱</div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 mb-2">Khi Phát Triển</div>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <span className="px-3 py-1 rounded-full font-semibold"
                style={{ background: typeColor + "33", color: typeColor }}>
                Kiểu {resultType}
              </span>
              <span className="text-emerald-500">→</span>
              <span className="px-3 py-1 rounded-full font-semibold"
                style={{ background: growthType.color + "33", color: growthType.color }}>
                Kiểu {arrowData.growth.to} · {growthType.name}
              </span>
            </div>
            <p className="text-sm text-slate-300 italic border-l-2 border-emerald-500/30 pl-3 py-1">
              {arrowData.growth.note}
            </p>
          </div>
        </div>
      </div>

      {/* Stress */}
      <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="text-2xl">⚡</div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-rose-400 mb-2">Khi Căng Thẳng</div>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <span className="px-3 py-1 rounded-full font-semibold"
                style={{ background: typeColor + "33", color: typeColor }}>
                Kiểu {resultType}
              </span>
              <span className="text-rose-500">→</span>
              <span className="px-3 py-1 rounded-full font-semibold"
                style={{ background: stressType.color + "33", color: stressType.color }}>
                Kiểu {arrowData.stress.to} · {stressType.name}
              </span>
            </div>
            <p className="text-sm text-slate-300 italic border-l-2 border-rose-500/30 pl-3 py-1">
              {arrowData.stress.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ResultScreen ─────────────────────────────────────────────────────────
export const ResultScreen = ({ result, onRestart }) => {
  const [activeTab, setActiveTab] = useState("scores");

  const t         = types[result.type];
  const motiv     = motivations[result.type];
  const wingData  = wings[result.type];
  const center    = getCenterForType(result.type);
  const arrowData = arrows[result.type];

  const sortedScores  = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);
  const dominantWing  = result.scores[wingData.left] >= result.scores[wingData.right]
    ? wingData.left : wingData.right;
  const maxScore = 15;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto w-full px-4 pt-8 pb-20"
    >
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden mb-8"
      >
        {/* Type-color background glow */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 50% 0%, ${t.color}22 0%, transparent 65%)`,
        }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{
          background: `linear-gradient(90deg, transparent, ${t.color}70, transparent)`,
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-md border border-white/8 rounded-3xl" />

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          {/* Emoji with glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full blur-3xl scale-150" style={{ background: t.color + "33" }} />
            <div className="relative text-8xl md:text-9xl drop-shadow-2xl">{t.emoji}</div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] mb-3 px-3 py-1 rounded-full"
              style={{ background: t.color + "22", color: t.color, border: `1px solid ${t.color}44` }}>
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: t.color }} />
              Kiểu {result.type}
            </div>

            <h2 className="font-serif mb-1 drop-shadow-lg" style={{
              fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
              fontWeight: 300,
              color: t.color,
              letterSpacing: "0.04em",
            }}>
              {t.name}
            </h2>

            <div className="text-slate-400 italic text-base mb-5 font-serif">{t.en}</div>

            <div className="h-px max-w-xs mx-auto md:mx-0 mb-5"
              style={{ background: `linear-gradient(90deg, transparent, ${t.color}55, transparent)` }} />

            <p className="text-slate-300 leading-relaxed text-base md:text-lg font-light max-w-xl">{t.desc}</p>
          </div>
        </div>

        {/* Strengths + Challenges inline */}
        <div className="relative z-10 grid grid-cols-2 border-t border-white/6">
          <div className="p-6 border-r border-white/6">
            <div className={`${sectionTitle} text-emerald-400`}>💪 Điểm Mạnh</div>
            <ul className="space-y-2">
              {t.strengths.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-emerald-500 text-xs">✦</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6">
            <div className={`${sectionTitle} text-rose-400`}>⚡ Thách Thức</div>
            <ul className="space-y-2">
              {t.challenges.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-rose-500 text-xs">✦</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Famous */}
        <div className="relative z-10 text-center px-6 py-4 border-t border-white/6">
          <span className="text-[10px] uppercase tracking-widest font-bold mr-3" style={{ color: t.color }}>
            Người nổi tiếng cùng kiểu:
          </span>
          <span className="text-slate-400 italic text-sm">{t.famous}</span>
        </div>
      </motion.div>

      {/* ══ TABS ══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tab bar */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md mb-4 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0
                ${activeTab === tab.id ? "text-slate-950" : "text-slate-500 hover:text-slate-300"}`}
              style={activeTab === tab.id ? { background: t.color } : {}}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: t.color }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div className={`${cardClass} min-h-[260px]`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {activeTab === "scores"      && <ScoresPanel      sortedScores={sortedScores} maxScore={maxScore} resultType={result.type} typeColor={t.color} />}
              {activeTab === "motivations" && <MotivationsPanel motiv={motiv} />}
              {activeTab === "wings"       && <WingsPanel       wingData={wingData} dominantWing={dominantWing} scores={result.scores} typeColor={t.color} />}
              {activeTab === "center"      && <CenterPanel      center={center} resultType={result.type} typeColor={t.color} />}
              {activeTab === "arrows"      && <ArrowsPanel      arrowData={arrowData} resultType={result.type} typeColor={t.color} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ══ RESTART ══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-10"
      >
        <button
          id="restart-btn"
          onClick={onRestart}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/8 text-slate-400 hover:text-amber-400 font-semibold tracking-widest uppercase text-xs transition-all duration-300"
        >
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Làm lại bài kiểm tra
        </button>
      </motion.div>
    </motion.div>
  );
};
