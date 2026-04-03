import { motion, AnimatePresence } from "framer-motion";

export const QuizScreen = ({
  question,
  options,
  current,
  total,
  progress,
  selected,
  onAnswer,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto w-full px-4 py-8"
    >
      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3 text-sm font-medium">
          <span className="uppercase tracking-widest text-xs text-slate-400">Tiến trình</span>
          <div className="flex items-baseline gap-1">
            <span className="text-amber-400 text-xl font-bold">{current + 1}</span>
            <span className="text-slate-500">/ {total}</span>
          </div>
        </div>
        <div className="h-1.5 bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-10 shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-slate-100 mb-10 leading-relaxed italic font-light drop-shadow-sm">
            "{question.text}"
          </h2>

          <div className="flex flex-col gap-3">
            {options.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  whileHover={!isSelected ? { scale: 1.01, backgroundColor: "rgba(255,255,255,0.06)" } : {}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer(opt.value)}
                  className={`
                    relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 border
                    ${isSelected 
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-50" 
                      : "bg-slate-800/30 border-white/5 text-slate-300 hover:text-slate-100 hover:border-white/10"
                    }
                  `}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="outline"
                      className="absolute inset-0 rounded-xl border-2 border-amber-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`
                    w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-semibold z-10 transition-colors
                    ${isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 border border-white/10"}
                  `}>
                    {opt.value}
                  </div>
                  <span className="font-medium text-lg z-10">{opt.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
