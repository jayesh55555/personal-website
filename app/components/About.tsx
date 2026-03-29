'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax layers — different speeds for depth
  const bgY      = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const imgY     = useTransform(scrollYProgress, [0, 1], ['6%',   '-6%']);
  const textY    = useTransform(scrollYProgress, [0, 1], ['4%',   '-4%']);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen py-32 relative overflow-hidden"
    >
      {/* Parallax background blob */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[130px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
      </motion.div>

      {/* Subtle grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-8 lg:px-16 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Profile image — parallax scroll */}
          <motion.div style={{ y: imgY }} className="relative group">
            {/* Glow ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-1"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/jayesh.jpg"
                  alt="Jayesh Gulani"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -right-4 bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">Open to Work</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content — parallax at slightly different speed */}
          <motion.div style={{ y: textY }} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium mb-5">
                About Me
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">Who I Am</h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              A Software Engineer with 1+ year of experience committed to developing transformative solutions.
              Graduated with a Bachelor of Technology in Information Technology from Medi-caps University, Indore, India.
              My goal is to leverage this unique blend of skills to drive innovation and create significant technological impacts.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: '1+', label: 'Years Experience' },
                { value: '15+', label: 'Projects Completed' },
                { value: '8+', label: 'Tech Stacks' },
                { value: '2', label: 'Companies Worked' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="/images/jayesh_gulani_CV.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all"
            >
              <span>Download Resume</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
