'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GameCanvas to avoid SSR issues
const GameCanvas = dynamic(() => import('./game/GameCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-[#0a0a1a] via-[#0d1b3e] to-[#1a2a5e] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">✈️</div>
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-white/50 text-sm">Preparing your sky adventure...</p>
      </div>
    </div>
  )
});

const projects = [
  {
    title: 'SkillSprint AI',
    description: 'AI-powered learning platform that personalizes skill development paths and accelerates professional growth.',
    image: '/images/projects/skillsprint.png',
    link: 'https://github.com/jayesh55555/SkillSprint-AI',
    tech: ['AI/ML', 'Python', 'NLP', 'Personalization'],
    color: '#8b5cf6',
  },
  {
    title: 'Food Label Scanner',
    description: 'AI-powered mobile app that scans food labels to provide instant nutritional information and health insights.',
    image: '/images/projects/foodscanner.png',
    link: 'https://github.com/jayesh55555/Food-Label-Scanner',
    tech: ['AI/ML', 'Computer Vision', 'Mobile', 'OCR'],
    color: '#10b981',
  },
  {
    title: 'Knowledge Graph',
    description: 'An AI-powered knowledge graph builder that transforms unstructured text into structured entity-relationships.',
    image: '/images/projects/knowledge.png',
    link: 'https://github.com/jayesh55555/Knowledge_graph',
    tech: ['Python', 'NLP', 'Graph DB', 'AI'],
    color: '#3b82f6',
  },
  {
    title: 'CINEXUS Movie Reservation',
    description: 'Full-stack intelligent movie reservation system using Python, Django, AWS to enhance user experiences.',
    image: '/images/projects/cinexus.png',
    link: 'https://github.com/jayesh55555/CINEXUS-Movie-Reservation',
    tech: ['Django', 'Python', 'AWS', 'PostgreSQL'],
    color: '#ef4444',
  },
  {
    title: 'Card Processing System',
    description: 'A comprehensive credit card processing system with secure transaction handling and validation.',
    image: '/images/projects/cardprocessing.png',
    link: 'https://github.com/jayesh55555/Credit-Card-Processing-System',
    tech: ['Java', 'Security', 'Payment Processing'],
    color: '#f59e0b',
  },
  {
    title: 'Product Barcode Generator',
    description: 'A Django and Python-powered website for registering, searching and generating barcode of any product.',
    image: '/images/projects/barcode.png',
    link: 'https://github.com/jayesh55555/Product-Barcode-Generator',
    tech: ['Django', 'Python', 'Barcode API'],
    color: '#6b7280',
  },
  {
    title: 'DoorWin Detector',
    description: 'A YOLOv5 model to detect doors and windows in floor plans with custom dataset training.',
    image: '/images/projects/doorwin.png',
    link: 'https://github.com/jayesh55555/window-door_detection',
    tech: ['YOLOv5', 'Computer Vision', 'PyTorch'],
    color: '#06b6d4',
  },
  {
    title: 'Amber Designer',
    description: 'Full-stack platform for accessible, on-demand apparel rental bookings.',
    image: '/images/projects/amber.png',
    link: 'https://amber-designer-pay.vercel.app/',
    tech: ['Full-Stack', 'E-commerce', 'Payment Gateway'],
    color: '#d97706',
  },
];


function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-500/50 transition-all duration-500"
      >
        {/* Image or fallback */}
        <div className="relative aspect-video overflow-hidden">
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            /* Gradient placeholder for projects without a screenshot */
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border-2"
                style={{ borderColor: `${project.color}40`, color: project.color, background: `${project.color}15` }}
              >
                {project.title.charAt(0)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <motion.h3
            className="text-xl font-bold mb-2 text-white"
            animate={{ y: isHovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          <p className="text-gray-400 mb-4 text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <motion.div
            className="flex flex-wrap gap-1.5"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Link Icon */}
          <motion.div
            className="absolute top-6 right-6 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center"
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -180
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 blur-xl" />
        </div>
      </a>
    </motion.div>
  );
}


export default function Projects() {
  const [phase, setPhase] = useState<'game' | 'grid'>('game');

  const handleAllCollected = () => {
    setPhase('grid');
  };

  const handleSkip = () => {
    setPhase('grid');
  };

  return (
    <section id="projects" className="relative">
      {/* ── GAME SECTION (full viewport height) ── */}
      <AnimatePresence>
        {phase === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="relative w-full"
            style={{ height: '100vh' }}
          >
            <GameCanvas onAllCollected={handleAllCollected} onSkip={handleSkip} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROJECTS GRID ── */}
      <AnimatePresence>
        {phase === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen py-28 relative"
          >
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-6">
                  ✈️ All Projects Landed
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
                  Featured Projects
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                  A collection of projects showcasing AI, full-stack development, and innovative solutions
                </p>

                {/* Re-play game button */}
                <button
                  onClick={() => setPhase('game')}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white/60 hover:text-white rounded-full text-sm transition-all"
                >
                  <span>✈️</span>
                  <span>Play again</span>
                </button>
              </motion.div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
                {projects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <a
                  href="https://github.com/jayesh55555?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 border-2 border-orange-500 text-orange-400 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(239,83,39,0.3)]"
                >
                  View All Projects on GitHub →
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
