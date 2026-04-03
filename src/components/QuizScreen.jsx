import { motion, AnimatePresence } from "framer-motion";

const OPTION_META = [
  { emoji: "✗", color: "#ef4444" },
  { emoji: "◂", color: "#f97316" },
  { emoji: "◆", color: "#94a3b8" },
  { emoji: "▸", color: "#34d399" },
  { emoji: "✓", color: "#10b981" },
];

export const QuizScreen = ({
  question, options, current, total, progress, selected, onAnswer,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="max-w-2xl mx-auto w-full px-4 py-8 flex flex-col"
  >
    {/* ── Progress bar ── */}
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-semibold">
          Câu hỏi
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold font-serif" style={{
            background: "linear-gradient(135deg, #d4a853, #f5c56a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {current + 1}
          </span>
          <span className="text-slate-600 text-sm">/ {total}</span>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-1 rounded-full bg-white/5 overflow-hidden border border-white/5">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg, #92400e, #d4a853, #fcd34d)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* Glow dot at head */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_3px_rgba(251,191,36,0.6)]"
          animate={{ left: `calc(${progress}% - 4px)` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Step dots (mini) */}
      <div className="flex gap-0.5 mt-2 overflow-hidden">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`flex-1 h-px rounded-full transition-colors duration-300 ${i < current ? "bg-amber-500/60" : i === current ? "bg-amber-400" : "bg-white/8"}`} />
        ))}
      </div>
    </div>

    {/* ── Question card ── */}
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Card glass layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md rounded-2xl border border-white/8" />

        {/* Top accent bar */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="relative p-7 md:p-10">
          {/* Question number chip */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            Câu {current + 1}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-slate-100 mb-8 leading-relaxed font-light italic">
            &ldquo;{question.text}&rdquo;
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            {options.map((opt) => {
              const isSelected = selected === opt.value;
              const meta = OPTION_META[opt.value - 1];
              return (
                <motion.button
                  key={opt.value}
                  id={`option-${opt.value}`}
                  whileHover={!isSelected ? { x: 4 } : {}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer(opt.value)}
                  className={`
                    relative group flex items-center gap-4 px-5 py-3.5 rounded-xl text-left transition-all duration-200
                    border overflow-hidden cursor-pointer
                    ${isSelected
                      ? "border-amber-500/60 text-amber-50"
                      : "border-white/6 bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:border-white/15 hover:bg-white/[0.04]"
                    }
                  `}
                >
                  {/* Selected background */}
                  {isSelected && (
                    <motion.div
                      layoutId="selected-bg"
                      className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-400/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Left accent */}
                  {isSelected && (
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-amber-300 to-amber-600 rounded-r" />
                  )}

                  {/* Value badge */}
                  <div
                    className={`
                      relative z-10 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200
                      ${isSelected
                        ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(212,168,83,0.5)]"
                        : "bg-white/5 text-slate-500 border border-white/8 group-hover:border-white/20"
                      }
                    `}
                  >
                    {opt.value}
                  </div>

                  <span className="relative z-10 font-medium text-base flex-1">{opt.label}</span>

                  {/* Color indicator dot */}
                  <span className="relative z-10 w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60" style={{ background: meta.color }} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

    {/* Hint text */}
    <p className="text-center text-slate-700 text-xs mt-6 tracking-wider">
      Nhấn để chọn · Tự động chuyển câu
    </p>
  </motion.div>
);
