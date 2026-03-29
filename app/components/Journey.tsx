'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const journeySteps = [
  {
    year: '2021',
    icon: '🎓',
    title: 'Computer Science Student',
    subtitle: 'Medi-caps University, Indore',
    description:
      'Began my B.Tech in Information Technology. Fell in love with programming, data structures, and building things from scratch.',
    color: '#3b82f6',
    side: 'left',
  },
  {
    year: '2023',
    icon: '🤖',
    title: 'AI Learner',
    subtitle: 'Self-Taught & Projects',
    description:
      'Dived deep into Machine Learning, Computer Vision, and NLP. Built YOLOv5 models, NLP pipelines, and my first AI-powered products.',
    color: '#8b5cf6',
    side: 'right',
  },
  {
    year: '2024',
    icon: '💼',
    title: 'Software Developer Intern',
    subtitle: 'Prodigy InfoTech & Alteryx',
    description:
      'Applied skills in real-world settings — full-stack development, data analytics workflows, and collaborative engineering practices.',
    color: '#10b981',
    side: 'left',
  },
  {
    year: '2025',
    icon: '🧠',
    title: 'AI Developer',
    subtitle: 'Superteams.ai → Palcode.ai',
    description:
      'Now building production-grade AI solutions: RAG pipelines, intelligent agents, and ML-powered applications that ship to real users.',
    color: '#ef5327',
    side: 'right',
  },
];

function TimelineCard({
  step,
  index,
}: {
  step: (typeof journeySteps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`relative flex items-center gap-0 ${
        step.side === 'left' ? 'flex-row' : 'flex-row-reverse'
      } md:gap-8`}
    >
      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: step.side === 'left' ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="w-full md:w-5/12"
      >
        <div
          className="relative p-6 rounded-2xl border bg-gray-900/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 group"
          style={{ borderColor: `${step.color}40` }}
        >
          {/* Colored top line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-60"
            style={{ background: step.color }}
          />

          {/* Year badge */}
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ background: `${step.color}25`, color: step.color }}
          >
            {step.year}
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
          <p className="text-sm font-medium mb-3" style={{ color: step.color }}>
            {step.subtitle}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${step.color}0d, transparent 70%)`,
            }}
          />
        </div>
      </motion.div>

      {/* Center icon node */}
      <div className="hidden md:flex flex-col items-center w-2/12 relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.2, type: 'spring', stiffness: 200 }}
          viewport={{ once: true }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 shadow-lg"
          style={{
            background: `${step.color}20`,
            borderColor: step.color,
            boxShadow: `0 0 20px ${step.color}40`,
          }}
        >
          {step.icon}
        </motion.div>
      </div>

      {/* Spacer for alternating side */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Animated vertical line grows as you scroll
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section ref={sectionRef} id="journey" className="py-32 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-8 lg:px-16 max-w-6xl relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium mb-5">
            My Story
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-5">The Journey</h2>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            From curious student to shipping AI products — here&apos;s how the dots connected.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2 origin-top">
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="w-full h-full bg-gradient-to-b from-primary via-purple-500 to-emerald-500 origin-top"
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-14">
            {journeySteps.map((step, i) => (
              <TimelineCard key={step.year} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 text-lg">
            The journey continues —{' '}
            <span className="text-primary font-semibold">and the best is yet to come</span> 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
