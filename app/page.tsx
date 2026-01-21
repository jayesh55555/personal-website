'use client';

import SmoothScroll from './components/SmoothScroll';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <Navigation />
        <div id="home">
          <Hero />
        </div>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
