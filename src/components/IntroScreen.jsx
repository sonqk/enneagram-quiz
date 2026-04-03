import { motion } from "framer-motion";
import { POINTS, outerPath, triPath, hexPath } from "./Starfield";

const LABELS = { 1:"⚖️",2:"🤝",3:"🏆",4:"🎨",5:"🔍",6:"🛡️",7:"✨",8:"🦁",9:"☮️" };

const EnneagramDiagram = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
    <defs>
      <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4a853" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Glow center */}
    <circle cx="50" cy="50" r="50" fill="url(#glowGrad)" />

    {/* Outer polygon */}
    <path d={outerPath} fill="none" stroke="#d4a853" strokeWidth="0.4" strokeOpacity="0.5" />

    {/* Triangle */}
    <path d={triPath} fill="none" stroke="#a78bfa" strokeWidth="0.35" strokeOpacity="0.6" strokeDasharray="1.5 1" />

    {/* Hexad */}
    <path d={hexPath} fill="none" stroke="#60a5fa" strokeWidth="0.35" strokeOpacity="0.5" strokeDasharray="1.5 1" />

    {/* Node dots */}
    {[1,2,3,4,5,6,7,8,9].map(n => (
      <circle
        key={n}
        cx={POINTS[n].x}
        cy={POINTS[n].y}
        r="2.8"
        fill="#0d1117"
        stroke="#d4a853"
        strokeWidth="0.5"
        strokeOpacity="0.9"
        filter="url(#glow)"
      />
    ))}

    {/* Labels */}
    {[1,2,3,4,5,6,7,8,9].map(n => {
      const p = POINTS[n];
      const dx = p.x - 50, dy = p.y - 50;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const nx = p.x + (dx/dist)*6.5;
      const ny = p.y + (dy/dist)*6.5;
      return (
        <text key={n} x={nx} y={ny + 1.2} textAnchor="middle" fontSize="3.8" fill="#d4a853" fillOpacity="0.7" fontWeight="600">
          {n}
        </text>
      );
    })}
  </svg>
);

export const IntroScreen = ({ onStart }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.7 }}
    className="max-w-3xl mx-auto w-full px-6 py-12 flex flex-col items-center justify-center min-h-[90vh] text-center"
  >
    {/* Animated Enneagram diagram */}
    <motion.div
      className="w-52 h-52 md:w-64 md:h-64 mb-10 relative"
      initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <EnneagramDiagram />
      </motion.div>

      {/* Glow ring behind diagram */}
      <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl -z-10 scale-110" />
    </motion.div>

    {/* Eyebrow label */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-[0.25em] mb-5 backdrop-blur-sm"
    >
      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
      Trắc Nghiệm Tính Cách
    </motion.div>

    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="font-serif tracking-[0.18em] mb-3"
      style={{
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        fontWeight: 300,
        lineHeight: 1,
        background: "linear-gradient(135deg, #f5edd8 30%, #d4a853 65%, #f5edd8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Enneagram
    </motion.h1>

    {/* Decorative line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.85, duration: 0.8 }}
      className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mb-8"
    />

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95, duration: 0.6 }}
      className="font-serif text-lg md:text-xl leading-relaxed text-slate-300/90 mb-4 max-w-lg"
    >
      Khám phá kiểu tính cách cốt lõi của bạn qua{" "}
      <span className="text-amber-400 font-semibold">27 câu hỏi</span> được
      thiết kế để soi rọi những động lực và nỗi sợ sâu thẳm nhất.
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="text-sm text-slate-500 italic mb-12"
    >
      "Không có câu trả lời đúng hay sai — chỉ có sự chân thực."
    </motion.p>

    {/* CTA Button */}
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,168,83,0.45)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onStart}
      id="start-btn"
      className="group relative flex items-center gap-3 px-12 py-4 rounded-full font-semibold uppercase tracking-[0.2em] text-sm text-slate-950 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #d4a853, #a07830)" }}
    >
      {/* Shine sweep */}
      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
      <span className="relative z-10">Bắt Đầu Khám Phá</span>
      <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </motion.button>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="mt-5 text-xs text-slate-600 tracking-widest uppercase"
    >
      9 kiểu tính cách · ~5 phút
    </motion.p>
  </motion.div>
);
