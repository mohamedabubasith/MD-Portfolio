import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/* Wraps a button/link so it pulls toward the cursor. Motion values only;
   no React state in the pointer path. Touch devices get a plain span. */
const Magnetic: React.FC<Props> = ({ children, strength = 0.35, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 120, damping: 14, mass: 0.4 });
  const y = useSpring(my, { stiffness: 120, damping: 14, mass: 0.4 });
  const coarse = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  if (coarse) return <span className={className}>{children}</span>;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
