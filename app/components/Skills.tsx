'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { category: 'Front-End', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind'], color: '#3b82f6' },
  { category: 'Back-End', items: ['Python', 'Django', 'Flask', 'Java', 'C++', 'R'], color: '#10b981' },
  { category: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'YOLOv5', 'NLP', 'Computer Vision'], color: '#ef5327' },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'Azure AI Search', 'MongoDB'], color: '#f59e0b' },
  { category: 'Tools', items: ['Git', 'Docker', 'GCP', 'Postman', 'VS Code', 'Jupyter'], color: '#8b5cf6' },
  { category: 'Cloud', items: ['Google Cloud', 'AWS', 'Azure', 'Vercel'], color: '#ec4899' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-32 relative">
      <div className="container mx-auto px-8 lg:px-16 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-20 text-gradient"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const { scrollYProgress: cardProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"]
            });
            
            const y = useTransform(cardProgress, [0, 1], [100 + index * 20, -100 - index * 20]);
            const rotateX = useTransform(cardProgress, [0, 0.5, 1], [-10, 0, 10]);
            const scale = useTransform(cardProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

            return (
              <motion.div
                key={skill.category}
                ref={cardRef}
                style={{ y, rotateX, scale }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-primary/50 transition-all duration-500 card-3d">
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle at center, ${skill.color}40, transparent)` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center font-bold text-xl"
                      style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                    >
                      {skill.category.charAt(0)}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4" style={{ color: skill.color }}>
                      {skill.category}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                          viewport={{ once: true }}
                          className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
