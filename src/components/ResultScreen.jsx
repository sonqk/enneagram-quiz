import { motion } from "framer-motion";
import { CopyPlus, ArrowRight, RefreshCw, Star, Info, Target, Zap, Shield, Heart } from "lucide-react";
import { types, motivations, wings, getCenterForType, arrows } from "../data/enneagram";

const SectionHeader = ({ icon: Icon, title, en }) => (
  <div className="flex items-center gap-3 mb-6 bg-slate-800/30 w-fit px-4 py-2 rounded-full border border-white/5">
    <Icon className="text-amber-400" size={18} />
    <span className="font-semibold text-slate-100 tracking-wide uppercase text-sm">{title}</span>
    <span className="text-slate-500 text-xs italic border-l border-slate-700 pl-3">{en}</span>
  </div>
);

export const ResultScreen = ({ result, onRestart }) => {
  const t = types[result.type];
  const motiv = motivations[result.type];
  const wingData = wings[result.type];
  const center = getCenterForType(result.type);
  const arrowData = arrows[result.type];
  
  const sortedScores = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);
  const maxScore = 15;
  const dominantWing = result.scores[wingData.left] >= result.scores[wingData.right] ? wingData.left : wingData.right;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto w-full px-4 py-12"
    >
      {/* ── Header ── */}
      <motion.div variants={itemVariants} className="text-center mb-16">
        <div className="inline-block mb-8 relative">
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
          <div className="text-8xl relative z-10 filter drop-shadow-2xl">{t.emoji}</div>
        </div>
        
        <div className="uppercase tracking-[0.4em] text-xs font-bold text-amber-500 mb-4">Kiểu {result.type}</div>
        <h2 className="text-5xl md:text-6xl font-serif text-slate-50 mb-3" style={{ color: t.color }}>{t.name}</h2>
        <div className="text-slate-400 italic text-lg mb-8 font-serif">{t.en}</div>
        
        <div className="h-px max-w-sm mx-auto w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-8" />
        
        <p className="text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto font-light">
          {t.desc}
        </p>
      </motion.div>

      {/* ── Grid Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Strengths */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-6 text-emerald-400 uppercase tracking-widest text-xs font-bold">
            <Heart size={16} /> Điểm Mạnh
          </div>
          <ul className="space-y-4">
            {t.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-200">
                <span className="text-emerald-500 mt-1">✦</span>
                <span className="text-base">{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Challenges */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-rose-500/10 hover:border-rose-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-6 text-rose-400 uppercase tracking-widest text-xs font-bold">
             <Shield size={16} /> Thách Thức
          </div>
          <ul className="space-y-4">
            {t.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-200">
                <span className="text-rose-500 mt-1">✦</span>
                <span className="text-base">{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Motivations */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5">
          <SectionHeader icon={Target} title="Động Lực Cốt Lõi" en="Core Motivations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-500/5 border border-rose-500/20 p-5 rounded-xl">
              <div className="text-[10px] uppercase tracking-widest text-rose-400/80 mb-2 font-semibold">Nỗi Sợ Cơ Bản</div>
              <div className="text-slate-200 text-base">{motiv.fear}</div>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-xl">
              <div className="text-[10px] uppercase tracking-widest text-emerald-400/80 mb-2 font-semibold">Khao Khát Cơ Bản</div>
              <div className="text-slate-200 text-base">{motiv.desire}</div>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 p-5 rounded-xl">
              <div className="text-[10px] uppercase tracking-widest text-purple-400/80 mb-2 font-semibold">Điểm Yếu (Vice)</div>
              <div className="text-slate-200 text-base">{motiv.vice}</div>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-xl">
              <div className="text-[10px] uppercase tracking-widest text-blue-400/80 mb-2 font-semibold">Phẩm Hạnh (Virtue)</div>
              <div className="text-slate-200 text-base">{motiv.virtue}</div>
            </div>
          </div>
        </motion.div>

        {/* Wings */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5">
           <SectionHeader icon={CopyPlus} title="Cánh Tính Cách" en="Wings" />
           <p className="text-sm text-slate-400 italic mb-6">Mỗi kiểu Enneagram chịu ảnh hưởng từ một trong hai kiểu liền kề (cánh). Cánh nổi trội của bạn dựa trên điểm số:</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {[wingData.left, wingData.right].map((wType) => {
               const wt = types[wType];
               const isDom = wType === dominantWing;
               return (
                 <div key={wType} className={`p-6 rounded-xl border relative transition-colors ${isDom ? "bg-amber-500/10 border-amber-500/30" : "bg-slate-800/30 border-white/5"}`}>
                    {isDom && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-500 text-slate-950 text-[10px] uppercase tracking-widest font-bold rounded-full">
                        Cánh Nổi Trội
                      </div>
                    )}
                    <div className="text-3xl mb-3">{wt.emoji}</div>
                    <div className={`font-semibold text-lg mb-2 ${isDom ? "text-amber-400" : "text-slate-300"}`}>Kiểu {wType} — {wt.name}</div>
                    <div className="text-sm text-slate-400 italic leading-relaxed mb-4">{wingData.desc[wType]}</div>
                    <div className="flex justify-between items-center text-sm font-medium pt-4 border-t border-white/5">
                      <span className="text-slate-500">Điểm số</span>
                      <span className={isDom ? "text-amber-400" : "text-slate-400"}>{result.scores[wType]}/15</span>
                    </div>
                 </div>
               );
             })}
           </div>
        </motion.div>

        {/* Center of Intelligence & Arrows Row */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5">
          <SectionHeader icon={Info} title="Trung Tâm Trí Tuệ" en="Intelligence Center" />
          <div className="flex items-center gap-4 mb-6">
             <div className="text-4xl">{center.icon}</div>
             <div>
               <div className="font-semibold text-lg" style={{ color: center.color }}>{center.name}</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Chủ đề: {center.theme}</div>
             </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-800/50 p-4 rounded-xl border border-white/5">{center.desc}</p>
          <div className="flex flex-wrap gap-2">
            {center.types.map(ct => (
               <span key={ct} className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${ct === result.type ? 'text-slate-950 border-transparent' : 'text-slate-400 border-white/10 bg-slate-800/50'}`} style={ct === result.type ? { backgroundColor: t.color } : {}}>
                 Kiểu {ct}
               </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5">
          <SectionHeader icon={Zap} title="Phát Triển & Căng Thẳng" en="Arrows" />
          
          <div className="flex flex-col gap-4">
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xl">🌱</div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Khi Phát Triển</div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400 font-medium">Kiểu {result.type}</span>
                    <ArrowRight size={14} className="text-emerald-500" />
                    <span className="text-emerald-300 font-semibold">Kiểu {arrowData.growth.to}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-300 italic border-l-2 border-emerald-500/30 pl-3 py-1">
                {arrowData.growth.note}
              </div>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/20 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xl">⚡</div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mb-1">Khi Căng Thẳng</div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400 font-medium">Kiểu {result.type}</span>
                    <ArrowRight size={14} className="text-rose-500" />
                    <span className="text-rose-300 font-semibold">Kiểu {arrowData.stress.to}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-300 italic border-l-2 border-rose-500/30 pl-3 py-1">
                {arrowData.stress.note}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Score Bars */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5">
          <SectionHeader icon={Star} title="Phân Bố Điểm Số" en="Scores" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {sortedScores.map(([typeNum, score], idx) => {
              const isTop = parseInt(typeNum) === result.type;
              return (
                <div key={typeNum} className="relative">
                  <div className="flex justify-between items-end mb-2 text-sm z-10 relative">
                    <span className={`${isTop ? "font-bold" : "font-medium text-slate-400"}`} style={isTop ? { color: t.color } : {}}>
                      {isTop && "★ "}Kiểu {typeNum} — {types[typeNum].name}
                    </span>
                    <span className="text-slate-500 text-xs font-bold">{score} / 15</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(score / maxScore) * 100}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1, delay: 0.1 * idx, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: isTop ? t.color : "#475569" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Famous */}
        <motion.div variants={itemVariants} className="md:col-span-2 text-center py-8">
           <div className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: t.color }}>Người nổi tiếng cùng kiểu</div>
           <div className="text-slate-400 italic text-lg">{t.famous}</div>
        </motion.div>

      </div>

      <motion.div variants={itemVariants} className="flex justify-center mt-12 pb-12">
        <button 
          onClick={onRestart}
          className="group flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 text-slate-300 hover:text-amber-400 font-semibold tracking-wider uppercase text-sm transition-all"
        >
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          Làm lại bài kiểm tra
        </button>
      </motion.div>

    </motion.div>
  );
};
