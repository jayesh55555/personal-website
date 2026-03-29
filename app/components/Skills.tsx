'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const skills = [
  {
    category: 'Front-End',
    color: '#3b82f6',
    icon: '🎨',
    items: [
      { name: 'React', desc: 'Built component-driven UIs for AI dashboards and portfolio sites' },
      { name: 'Next.js', desc: 'Used for SSR and static export in production web apps' },
      { name: 'JavaScript', desc: 'Core language for all interactive frontend features' },
      { name: 'HTML/CSS', desc: 'Semantic structure and animation-rich styling' },
      { name: 'Tailwind', desc: 'Utility-first styling used across all recent projects' },
    ],
  },
  {
    category: 'Back-End',
    color: '#10b981',
    icon: '⚙️',
    items: [
      { name: 'Python', desc: 'Primary language for ML models, APIs, and backend systems' },
      { name: 'Django', desc: 'Built CINEXUS movie reservation + barcode generator with Django' },
      { name: 'Flask', desc: 'Lightweight APIs for serving ML models in production' },
      { name: 'Java', desc: 'Used for credit card processing system with OOP principles' },
      { name: 'C++', desc: 'Algorithms coursework and system-level programming' },
      { name: 'FastAPI', desc: 'High-performance async REST APIs at Palcode.ai' },
    ],
  },
  {
    category: 'AI / ML',
    color: '#ef5327',
    icon: '🤖',
    items: [
      { name: 'TensorFlow', desc: 'Trained and deployed deep learning models' },
      { name: 'PyTorch', desc: 'Custom neural network training and transfer learning' },
      { name: 'YOLOv5', desc: 'Custom door/window detection on floor plan images' },
      { name: 'NLP', desc: 'Knowledge graph extraction, SkillSprint personalization' },
      { name: 'RAG', desc: 'Retrieval-augmented generation pipelines at Palcode.ai' },
      { name: 'LangChain', desc: 'Agent orchestration and LLM chaining workflows' },
    ],
  },
  {
    category: 'Database',
    color: '#f59e0b',
    icon: '🗄️',
    items: [
      { name: 'PostgreSQL', desc: 'Primary relational DB for CINEXUS and web apps' },
      { name: 'MySQL', desc: 'Database design and query optimization coursework' },
      { name: 'MongoDB', desc: 'Flexible document store for rapid prototyping' },
      { name: 'Azure AI Search', desc: 'Vector search for semantic retrieval at Palcode.ai' },
    ],
  },
  {
    category: 'Tools & DevOps',
    color: '#8b5cf6',
    icon: '🛠️',
    items: [
      { name: 'Git', desc: 'Version control for every project — feature branching, PRs' },
      { name: 'Docker', desc: 'Containerizing AI services for consistent deployments' },
      { name: 'Postman', desc: 'API testing and documentation across all backend projects' },
      { name: 'Jupyter', desc: 'Exploratory data analysis and ML prototyping' },
      { name: 'VS Code', desc: 'Primary IDE with custom extensions and keybindings' },
    ],
  },
  {
    category: 'Cloud',
    color: '#ec4899',
    icon: '☁️',
    items: [
      { name: 'Google Cloud', desc: 'GCP services used at Superteams for AI inference' },
      { name: 'AWS', desc: 'EC2, S3, RDS for CINEXUS and other web deployments' },
      { name: 'Azure', desc: 'Cognitive Services and AI Search for RAG pipelines' },
      { name: 'Vercel', desc: 'Deployed Amber Designer and portfolio sites' },
    ],
  },
];

// ─── Tooltip pill ──────────────────────────────────────────
function SkillTag({
  item,
  color,
  delay,
}: {
  item: { name: string; desc: string };
  color: string;
  delay: number;
}) {
  const [show, setShow] = useState(false);

  // Toggle on tap (mobile) — prevent scroll jank
  const handleTap = (e: React.TouchEvent) => {
    e.preventDefault();
    setShow(prev => !prev);
  };

  // Close when tapping outside
  const handleBlur = () => setTimeout(() => setShow(false), 150);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true, margin: '-20px' }}
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchEnd={handleTap}
      onBlur={handleBlur}
    >
      <span
        className="inline-block px-3 py-1.5 rounded-full text-sm font-medium cursor-default select-none border transition-all duration-200 whitespace-nowrap"
        style={{
          background: show ? `${color}22` : 'rgba(31,41,55,1)',
          borderColor: show ? color : 'rgba(55,65,81,1)',
          color: show ? color : '#d1d5db',
        }}
      >
        {item.name}
      </span>

      {/* Tooltip — renders above the tag */}
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-40 w-52 pointer-events-none"
        >
          <div
            className="px-3 py-2 rounded-xl text-xs leading-relaxed text-white/90 shadow-2xl border"
            style={{
              background: 'rgba(10,10,20,0.97)',
              borderColor: `${color}40`,
              boxShadow: `0 0 24px ${color}18`,
            }}
          >
            {item.desc}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid ${color}40`,
              }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Individual card — NO scroll-based y transform (that caused overlap) ──
function SkillCard({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  return (
    <motion.div
      // Pure whileInView — no conflicting style-y from useScroll
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      <div
        className="relative h-full p-6 rounded-2xl border bg-gray-900/80 backdrop-blur-sm transition-all duration-300 overflow-visible"
        style={{ borderColor: `${skill.color}30` }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${skill.color}0e, transparent 65%)`,
            boxShadow: `inset 0 0 40px ${skill.color}08`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full opacity-50"
          style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${skill.color}18` }}
            >
              {skill.icon}
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight" style={{ color: skill.color }}>
                {skill.category}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{skill.items.length} skills</p>
            </div>
          </div>

          {/* Tags — overflow visible so tooltips don't clip */}
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, i) => (
              <SkillTag
                key={item.name}
                item={item}
                color={skill.color}
                delay={index * 0.06 + i * 0.035}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Parallax ambient blob ─────────────────────────────────
function ParallaxBlob({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <motion.div
      style={{ y }}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
    </motion.div>
  );
}

// ─── Scene divider (SVG wave between sections) ────────────
function SceneDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`relative w-full h-16 overflow-hidden pointer-events-none ${flip ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 32C240 0 480 64 720 32C960 0 1200 64 1440 32V64H0V32Z"
          fill="rgba(239,83,39,0.04)"
        />
        <path
          d="M0 48C360 16 720 64 1080 32C1260 20 1380 48 1440 48V64H0V48Z"
          fill="rgba(255,255,255,0.015)"
        />
      </svg>
    </div>
  );
}

// ─── Section heading with scroll-reveal ───────────────────
function SectionHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className="text-center mb-16"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium mb-5"
      >
        Technical Arsenal
      </motion.span>
      <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">Skills &amp; Expertise</h2>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        Hover over any skill to see how I&apos;ve applied it in real projects
      </p>
    </motion.div>
  );
}

// ─── Main export ───────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <SceneDivider />

      <section
        ref={sectionRef}
        id="skills"
        className="py-28 relative"
        // NO overflow-hidden here — tooltips need to escape card bounds
      >
        <ParallaxBlob sectionRef={sectionRef} />

        {/* Horizontal separator lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent pointer-events-none" />

        <div className="container mx-auto px-8 lg:px-16 max-w-7xl relative z-10">
          <SectionHeading />

          {/* Grid — gap-8 gives breathing room, no scroll-y transform on cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {skills.map((skill, index) => (
              <SkillCard key={skill.category} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      <SceneDivider flip />
    </>
  );
}
