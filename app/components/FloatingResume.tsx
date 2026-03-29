'use client';

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingResume() {
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // Show after user scrolls past hero
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-gray-900 border border-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl">
                  Download Resume
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '5px solid rgb(31,41,55)',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href="/images/jayesh_gulani_CV.pdf"
            download
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            className="flex items-center justify-center w-13 h-13 rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 border border-primary/40 hover:shadow-primary/60 hover:shadow-xl transition-shadow"
            style={{ width: 52, height: 52 }}
            aria-label="Download Resume"
          >
            {/* Document icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </motion.a>

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-2xl animate-ping bg-primary/20 pointer-events-none" style={{ animationDuration: '2.5s' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
