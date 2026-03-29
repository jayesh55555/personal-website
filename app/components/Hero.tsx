'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Scene3D from './Scene3D';
import MagneticButton from './MagneticButton';

// Pure-React typewriter hook — no library needed
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex));
        setCharIndex(c => c + 1);
      }, speed);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIndex(w => w + 1);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

// Floating particle component (pure CSS-driven, no canvas)
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: 1.5 + Math.random() * 3,
    left: Math.random() * 100,
    animDuration: 12 + Math.random() * 20,
    animDelay: Math.random() * 15,
    opacity: 0.2 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-orange-500"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-20px',
            opacity: p.opacity,
            animation: `floatUp ${p.animDuration}s ${p.animDelay}s linear infinite`,
          }}
        />
      ))}
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
}

const ROLES = [
  'AI Engineer',
  'Software Developer',
  'ML Practitioner',
  'Full-Stack Builder',
];

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const typed = useTypewriter(ROLES, 75, 2000);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const opacity = 1 - window.scrollY / 300;
        scrollIndicatorRef.current.style.opacity = Math.max(0, opacity).toString();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Floating particles */}
      <Particles />

      {/* Content — staggered children */}
      <div className="container mx-auto px-8 lg:px-16 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
          className="max-w-3xl"
        >
          {/* Greeting */}
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="text-primary text-xl md:text-2xl font-semibold mb-4"
          >
            Hello! 👋
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5 text-gradient"
            style={{ transformStyle: 'preserve-3d' }}
          >
            I&apos;m Jayesh Gulani
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light mb-10 h-12 flex items-center"
          >
            <span>{typed}</span>
            <span className="ml-0.5 w-0.5 h-8 bg-primary inline-block animate-blink" />
          </motion.div>

          {/* Brief tagline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed"
          >
            Building AI-powered products that make a real difference — one line of code at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              as="a"
              href="#projects"
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:shadow-lg hover:shadow-primary/50 block"
            >
              View Projects ✈️
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all block"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

          {/* Social mini links */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
            }}
            className="flex gap-5 mt-10"
          >
            {[
              { label: 'GitHub', url: 'https://github.com/jayesh55555', icon: '💻' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jayesh-gulani-ba8899250/', icon: '💼' },
            ].map(s => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
