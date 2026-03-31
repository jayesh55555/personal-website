'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from './types';
import { useState, useEffect } from 'react';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = project.image && !imgError;

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative max-w-2xl w-full bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          style={{ maxHeight: '92vh', overflowY: 'auto' }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* ── Project Image Banner ───────────────────────── */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full overflow-hidden"
              style={{ height: 200 }}
            >
              <img
                src={project.image!}
                alt={`${project.title} mockup`}
                className="w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
              {/* Gradient fade at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />

              {/* Close button on image */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-black/80 transition-all text-lg border border-white/10"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          )}

          {/* ── Header ────────────────────────────────────── */}
          <div className={`relative p-7 ${hasImage ? 'pt-4' : 'pt-7'} border-b border-gray-800/60`}>
            {!hasImage && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700 transition-all text-lg"
                aria-label="Close"
              >
                ×
              </button>
            )}

            <div className="flex items-center gap-4">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 280 }}
                className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <span className="text-xl font-bold text-primary">{project.title.charAt(0)}</span>
              </motion.div>

              <div>
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 }}
                  className="text-xl md:text-2xl font-bold text-white"
                >
                  {project.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="text-gray-400 text-sm mt-0.5 leading-snug"
                >
                  {project.description}
                </motion.p>
              </div>
            </div>
          </div>

          {/* ── Body ──────────────────────────────────────── */}
          <div className="p-7 space-y-5">

            {/* Problem */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.18 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-4 rounded-full bg-red-500" />
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest">The Problem</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed pl-3.5 border-l border-red-500/20">
                {project.problem}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.24 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-4 rounded-full bg-emerald-500" />
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">The Solution</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed pl-3.5 border-l border-emerald-500/20">
                {project.solution}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.33 + i * 0.04, type: 'spring' }}
                    className="px-3 py-1.5 bg-gray-800/80 border border-gray-700 text-gray-300 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.38 }}
              className="flex gap-3 pt-1"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] text-center text-sm"
              >
                View Project →
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition-all text-sm"
              >
                Continue Flying ✈️
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
