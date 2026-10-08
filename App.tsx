import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './lib/lenis';
import { sceneState } from './lib/sceneState';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import MorphScene from './components/MorphScene';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Journey from './components/Journey';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Marquee from './components/Marquee';
import Experience from './components/Experience';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.1 });

    const observe = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.visible)').forEach(el => io.observe(el));
    };

    observe();

    // re-observe when async sections (GitHub, Medium) inject new .reveal elements
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // smooth scroll is parked until the preloader leaves
    getLenis().stop();
    // async sections (GitHub / Medium) change page height
    const onContentLoaded = () => ScrollTrigger.refresh();
    window.addEventListener('content-loaded', onContentLoaded);
    return () => window.removeEventListener('content-loaded', onContentLoaded);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    // hero entrance animations are CSS-driven off this class
    document.body.classList.add('ready');
    sceneState.ready = true;
    window.dispatchEvent(new Event('app-ready'));
    getLenis().start();
    // page height settles after the preloader leaves
    ScrollTrigger.refresh();
  }, [loaded]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <MorphScene />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <ProgressBar />
      <Nav />
      <ScrollReveal />
      <main>
        <Hero />
        <Journey />
        <About />
        <Projects />
        <Skills />
        <Marquee />
        <Experience />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
