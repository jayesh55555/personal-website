'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="cta" className="relative py-40 overflow-hidden">
      {/* Parallax background blobs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/8 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1.5s' }}
        />
      </motion.div>

      {/* Border lines top/bottom */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-8 lg:px-16 max-w-4xl relative z-10 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Open to opportunities
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Let&apos;s build something{' '}
          <span className="text-gradient">amazing</span>
          <br />
          together 🚀
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you have a startup idea, an AI project, or just want to connect —
          I&apos;d love to hear from you.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative px-10 py-4 bg-primary text-white rounded-xl font-semibold text-lg overflow-hidden hover:scale-105 transition-transform hover:shadow-[0_0_40px_rgba(239,83,39,0.4)]"
          >
            <span className="relative z-10">Contact Me ✉️</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="/images/jayesh_gulani_CV.pdf"
            download
            className="px-10 py-4 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-all hover:scale-105"
          >
            View Resume 📄
          </a>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-16 text-gray-500 text-sm"
        >
          {[
            { label: '1+ Years', sub: 'Experience' },
            { label: '15+', sub: 'Projects Built' },
            { label: '8+', sub: 'Tech Stacks' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.label}</div>
              <div className="text-gray-500 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
