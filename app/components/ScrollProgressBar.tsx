'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // Spring-smooth the raw scroll value for buttery movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #ef5327, #f97316, #fbbf24)',
        boxShadow: '0 0 10px rgba(239, 83, 39, 0.8)',
      }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] pointer-events-none"
    />
  );
}
