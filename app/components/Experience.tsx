'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    period: 'June 2025 - Present',
    role: 'AI Engineer',
    company: 'Palcode.ai',
    description: 'Building AI-powered solutions and implementing machine learning models'
  },
  {
    period: 'Aug 2024 - May 2025',
    role: 'AI Developer',
    company: 'Superteams.ai',
    description: 'Developed AI applications and collaborated on innovative ML projects'
  },
  {
    period: 'June 2024 - July 2024',
    role: 'Software Developer Intern',
    company: 'Prodigy InfoTech',
    description: 'Created web applications and contributed to full-stack development'
  },
  {
    period: 'July 2024 - Aug 2024',
    role: 'Alteryx Training Intern',
    company: 'Alteryx',
    description: 'Gained expertise in data analytics and workflow automation'
  },
];

const education = [
  {
    period: 'Aug 2021 - July 2025',
    degree: 'B.Tech in Information Technology',
    institution: 'Medi-caps University',
    location: 'Indore, India'
  },
  {
    period: 'June 2008 - Apr 2020',
    degree: 'High School Diploma',
    institution: 'Choithram School North Campus',
    location: 'Indore, India'
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="experience" className="min-h-screen py-32 relative">
      <div className="container mx-auto px-8 lg:px-16 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-20 text-gradient"
        >
          Experience & Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          <div className="relative">
            <h3 className="text-3xl font-bold mb-12 text-primary">Work Experience</h3>
            
            {/* Timeline line */}
            <div className="absolute left-0 top-24 bottom-0 w-0.5 bg-gray-800">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-primary"
              />
            </div>

            <div className="space-y-12 relative pl-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute -left-12 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-gray-900 group-hover:ring-primary/30 transition-all"
                  />

                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-sm text-primary font-semibold mb-2">{exp.period}</div>
                    <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
                    <div className="text-gray-400 mb-3">{exp.company}</div>
                    <p className="text-gray-500 text-sm">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="relative">
            <h3 className="text-3xl font-bold mb-12 text-primary">Education</h3>
            
            {/* Timeline line */}
            <div className="absolute left-0 top-24 bottom-0 w-0.5 bg-gray-800">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-primary"
              />
            </div>

            <div className="space-y-12 relative pl-12">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute -left-12 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-gray-900 group-hover:ring-primary/30 transition-all"
                  />

                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-sm text-primary font-semibold mb-2">{edu.period}</div>
                    <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
                    <div className="text-gray-400 mb-1">{edu.institution}</div>
                    <div className="text-gray-500 text-sm">{edu.location}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
