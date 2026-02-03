'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'Food Label Scanner',
    description: 'AI-powered mobile app that scans food labels to provide instant nutritional information and health insights.',
    image: '/images/food item scanner.png',
    link: 'https://github.com/jayesh55555/Food-Label-Scanner',
    tech: ['AI/ML', 'Computer Vision', 'Mobile', 'OCR']
  },
  {
    title: 'Knowledge Graph',
    description: 'An AI-powered knowledge graph builder that transforms unstructured text into structured entity-relationships',
    image: '/images/knowledge_graph_img.jpg',
    link: 'https://github.com/jayesh55555/Knowledge_graph',
    tech: ['Python', 'NLP', 'Graph DB', 'AI']
  },
  {
    title: 'CINEXUS Movie Reservation',
    description: 'Full-stack intelligent movie reservation system using Python, Django, AWS to enhance user experiences.',
    image: '/images/movies.png',
    link: 'https://github.com/jayesh55555/CINEXUS-Movie-Reservation',
    tech: ['Django', 'Python', 'AWS', 'PostgreSQL']
  },
  {
    title: 'Card Processing System',
    description: 'A comprehensive credit card processing system with secure transaction handling and validation.',
    image: '/images/Credit-Card-Processing-System.jpg',
    link: 'https://github.com/jayesh55555/Credit-Card-Processing-System',
    tech: ['Java', 'Security', 'Payment Processing']
  },
  {
    title: 'Product Barcode Generator',
    description: 'A Django and Python-powered website for registering, searching and generating barcode of any product.',
    image: '/images/barcode 1.png',
    link: 'https://github.com/jayesh55555/Product-Barcode-Generator',
    tech: ['Django', 'Python', 'Barcode API']
  },
  {
    title: 'DoorWin Detector',
    description: 'A YOLOv5 model to detect doors and windows in floor plans with custom dataset training.',
    image: '/images/door window.png',
    link: 'https://github.com/jayesh55555/window-door_detection',
    tech: ['YOLOv5', 'Computer Vision', 'PyTorch']
  },
  {
    title: 'Food Item Recognizer',
    description: 'Uses deep learning to identify food items from images and estimate their calorie content, aiding users in dietary tracking.',
    image: '/images/food items.png',
    link: 'https://github.com/jayesh55555/Food-Item-Recognizer',
    tech: ['TensorFlow', 'CNN', 'Image Recognition']
  },
  {
    title: 'Amber Designer',
    description: 'Full-stack platform for accessible, on-demand apparel rental bookings.',
    image: '/images/amberdesigner.png',
    link: 'https://amber-designer-pay.vercel.app/',
    tech: ['Full-Stack', 'E-commerce', 'Payment Gateway']
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.5, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [-15, 0]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -100 : 100, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, rotateY, x }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-primary/50 transition-all duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 relative">
          <motion.h3
            className="text-2xl font-bold mb-3 text-white"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-400 mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Link Icon */}
          <motion.div
            className="absolute top-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
            animate={{ 
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -180
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-xl" />
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-32 relative">
      <div className="container mx-auto px-8 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            A collection of projects showcasing AI, full-stack development, and innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
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
            className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all hover:scale-105"
          >
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
