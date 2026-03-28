'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-32 relative overflow-hidden">
      {/* Parallax background gradient */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"
      />

      <div className="container mx-auto px-8 lg:px-16 max-w-7xl relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Profile Card */}
          <motion.div
            style={{ y }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-1">
              <div className="relative rounded-2xl overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/images/jayesh.jpg"
                    alt="Jayesh Gulani"
                    className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                  />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-gradient"
            >
              Who I Am
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              A Software Engineer with 1+ year of experience committed to developing transformative solutions. 
              Graduated with a Bachelor of Technology in Information Technology from Medi-caps University, Indore, India. 
              My goal is to leverage this unique blend of skills to drive innovation and create significant technological impacts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">1+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">15+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
            </motion.div>

            <motion.a
              href="/images/jayesh_gulani_CV.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, translateZ: 10 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
