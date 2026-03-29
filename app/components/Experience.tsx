'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    period: 'June 2025 - September 2025',
    role: 'AI Engineer',
    company: 'Palcode.ai',
    description: 'Building AI-powered solutions and implementing machine learning models for production-grade products.',
    tags: ['RAG', 'LangChain', 'Azure AI'],
    current: false,
  },
  {
    period: 'Aug 2024 - May 2025',
    role: 'AI Developer',
    company: 'Superteams.ai',
    description: 'Developed AI applications and collaborated on innovative ML projects with a remote-first team.',
    tags: ['Python', 'ML', 'GCP'],
    current: false,
  },
  {
    period: 'June 2024 - July 2024',
    role: 'Software Developer Intern',
    company: 'Prodigy InfoTech',
    description: 'Created web applications and contributed to full-stack development on client projects.',
    tags: ['React', 'Django', 'REST API'],
    current: false,
  },
  {
    period: 'July 2024 - Aug 2024',
    role: 'Alteryx Training Intern',
    company: 'Alteryx',
    description: 'Gained expertise in data analytics and workflow automation using the Alteryx platform.',
    tags: ['Data Analytics', 'Automation'],
    current: false,
  },
];

const education = [
  {
    period: 'Aug 2021 - July 2025',
    degree: 'B.Tech — Information Technology',
    institution: 'Medi-caps University',
    location: 'Indore, India',
    icon: '🎓',
  },
  {
    period: 'June 2008 - Apr 2020',
    degree: 'High School Diploma',
    institution: 'Choithram School North Campus',
    location: 'Indore, India',
    icon: '📚',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Animated line grows as section scrolls into view
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.7], ['0%', '100%']);
  // Subtle parallax on the background blob
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} id="experience" className="py-32 relative overflow-hidden">
      {/* Parallax ambient */}
      <motion.div style={{ y: bgY }} aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </motion.div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent pointer-events-none" />

      <div className="container mx-auto px-8 lg:px-16 max-w-6xl relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium mb-5">
            My Path
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gradient">Experience &amp; Education</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20">
          {/* ── Work Experience ─────────────────────────────── */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-12 text-primary flex items-center gap-2"
            >
              <span>💼</span>
              <span>Work Experience</span>
            </motion.h3>

            {/* Animated timeline line */}
            <div className="absolute left-0 top-20 bottom-0 w-px bg-gray-800/70">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-primary via-purple-500 to-primary/20 origin-top"
              />
            </div>

            <div className="space-y-8 pl-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.08 + 0.1, type: 'spring', stiffness: 250 }}
                    viewport={{ once: true }}
                    className="absolute -left-10 top-4 w-3.5 h-3.5 rounded-full ring-4 ring-gray-950 transition-all duration-300 group-hover:scale-125"
                    style={{ background: exp.current ? '#ef5327' : '#4b5563' }}
                  />

                  <div
                    className="p-5 rounded-2xl border transition-all duration-300 group-hover:border-primary/40"
                    style={{
                      background: 'rgba(15,15,25,0.8)',
                      borderColor: exp.current ? 'rgba(239,83,39,0.3)' : 'rgba(55,65,81,0.8)',
                    }}
                  >
                    {exp.current && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-emerald-400 font-medium">Currently here</span>
                      </div>
                    )}
                    <div className="text-xs text-primary font-semibold mb-1 tracking-wide">{exp.period}</div>
                    <h4 className="text-lg font-bold text-white mb-0.5">{exp.role}</h4>
                    <div className="text-gray-400 text-sm mb-3 font-medium">{exp.company}</div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-800 border border-gray-700 text-gray-400 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Education ───────────────────────────────────── */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-12 text-primary flex items-center gap-2"
            >
              <span>🎓</span>
              <span>Education</span>
            </motion.h3>

            {/* Timeline line */}
            <div className="absolute left-0 top-20 bottom-0 w-px bg-gray-800/70">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-blue-500 via-emerald-500 to-blue-500/20 origin-top"
              />
            </div>

            <div className="space-y-8 pl-10">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative group"
                >
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.1 + 0.1, type: 'spring', stiffness: 250 }}
                    viewport={{ once: true }}
                    className="absolute -left-10 top-4 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-gray-950 group-hover:scale-125 transition-all duration-300"
                  />

                  <div className="p-5 rounded-2xl border border-gray-800/80 bg-gray-900/60 hover:border-blue-500/40 transition-all duration-300">
                    <div className="text-xs text-blue-400 font-semibold mb-1 tracking-wide">{edu.period}</div>
                    <h4 className="text-lg font-bold text-white mb-0.5">{edu.degree}</h4>
                    <div className="text-gray-400 text-sm font-medium">{edu.institution}</div>
                    <div className="text-gray-600 text-xs mt-1">{edu.location}</div>
                  </div>
                </motion.div>
              ))}

              {/* Achievements card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl border border-primary/20 bg-primary/5"
              >
                <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">Highlights</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    '🏆 Multiple AI projects shipped to production',
                    '📜 Alteryx Core Certified',
                    '🌟 Built 15+ projects across ML, web & mobile',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
