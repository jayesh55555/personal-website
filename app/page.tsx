'use client';

import SmoothScroll from './components/SmoothScroll';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import FloatingResume from './components/FloatingResume';
import ScrollProgressBar from './components/ScrollProgressBar';
import dynamic from 'next/dynamic';

// Custom cursor is SSR-unsafe (uses window) — dynamic import with no SSR
const CustomCursor = dynamic(() => import('./components/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      {/* Global UI overlays */}
      <CustomCursor />
      <ScrollProgressBar />
      <FloatingResume />

      <main className="relative">
        <Navigation />
        <div id="home">
          <Hero />
        </div>
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Experience />
        <CallToAction />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
