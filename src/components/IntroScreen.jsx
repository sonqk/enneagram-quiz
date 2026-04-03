import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export const IntroScreen = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto text-center px-6 py-12 flex flex-col items-center justify-center min-h-[80vh]"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          filter: [
            "drop-shadow(0 0 15px rgba(234,179,8,0.3))",
            "drop-shadow(0 0 35px rgba(234,179,8,0.7))",
            "drop-shadow(0 0 15px rgba(234,179,8,0.3))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 text-amber-400"
      >
        <Sparkles size={64} strokeWidth={1} />
      </motion.div>

      <div className="uppercase tracking-[0.3em] text-xs font-semibold text-amber-500/80 mb-3 bg-amber-500/10 px-4 py-1.5 rounded-full inline-block backdrop-blur-sm border border-amber-500/20">
        Khám Phá Sâu Sắc Bản Thân
      </div>
      
      <h1 className="text-5xl md:text-7xl font-light tracking-widest text-slate-100 mb-6 font-serif">
        Enneagram
      </h1>
      
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mb-8" />
      
      <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6 font-serif max-w-lg mx-auto">
        Khám phá kiểu tính cách cốt lõi của bạn qua 27 câu hỏi được thiết kế để soi rọi những động lực và nỗi sợ sâu thẳm nhất.
      </p>

      <p className="text-sm text-slate-500 mb-12 italic">
        "Không có câu trả lời đúng hay sai, chỉ có sự chân thực."
      </p>

      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 text-slate-950 font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-opacity border border-amber-400/50"
      >
        <span>Bắt Đầu Khám Phá</span>
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
      </motion.button>
    </motion.div>
  );
};
