import { motion } from "framer-motion";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 0.5,
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: Math.random() * 0.55 + 0.1,
  duration: Math.random() * 4 + 2.5,
  delay: Math.random() * 5,
}));

// Enneagram geometry (9 points on circle, clockwise from top)
const r = 44;
const cx = 50;
const cy = 50;
function pt(typeNum) {
  // 9→top, then clockwise: 1,2,3,4,5,6,7,8
  const order = [9, 1, 2, 3, 4, 5, 6, 7, 8];
  const idx = order.indexOf(typeNum);
  const angleDeg = 90 - idx * 40;
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

const POINTS = Object.fromEntries([1,2,3,4,5,6,7,8,9].map(n => [n, pt(n)]));

// Outer circle (polygon)
const outerPoints = [9,1,2,3,4,5,6,7,8].map(n => POINTS[n]);
const outerPath = outerPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";

// Inner triangle (3-6-9)
const triPath = [3,6,9].map((n, i) => `${i === 0 ? "M" : "L"}${POINTS[n].x.toFixed(2)},${POINTS[n].y.toFixed(2)}`).join(" ") + " Z";

// Inner hexad (1→4→2→8→5→7→back to 1)
const hexPath = [1,4,2,8,5,7,1].map((n, i) => `${i === 0 ? "M" : "L"}${POINTS[n].x.toFixed(2)},${POINTS[n].y.toFixed(2)}`).join(" ");

export const Starfield = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Deep space gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,#1a0f3c_0%,#06080f_60%,#000308_100%)]" />

    {/* Aurora blobs */}
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] bg-blue-950/30 rounded-full blur-[120px]" style={{ animationDelay: "2s" }} />
    <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-amber-900/10 rounded-full blur-[80px]" />

    {/* Stars */}
    {STARS.map((s) => (
      <motion.div
        key={s.id}
        className="absolute bg-white rounded-full"
        style={{
          width: s.size,
          height: s.size,
          left: `${s.left}%`,
          top: `${s.top}%`,
        }}
        animate={{
          opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3],
          scale: [0.9, 1.3, 0.9],
        }}
        transition={{
          duration: s.duration,
          repeat: Infinity,
          delay: s.delay,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Enneagram SVG watermark (bottom center) */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-[0.04] w-64 h-64">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d={outerPath} fill="none" stroke="white" strokeWidth="0.6" />
        <path d={triPath}   fill="none" stroke="white" strokeWidth="0.5" />
        <path d={hexPath}   fill="none" stroke="white" strokeWidth="0.5" />
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <circle key={n} cx={POINTS[n].x} cy={POINTS[n].y} r="2.2" fill="white" />
        ))}
      </svg>
    </div>
  </div>
);

export { POINTS, outerPath, triPath, hexPath };
