import { motion } from "framer-motion";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: Math.random() * 0.7 + 0.1,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 4,
}));

export const Starfield = () => {

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: s.opacity,
          }}
          animate={{
            opacity: [s.opacity * 0.5, s.opacity * 1.5, s.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950"></div>
    </div>
  );
};
