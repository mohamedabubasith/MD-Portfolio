import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Particles } from './components/Particles';

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

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <div className="hud-corners">
        <span /><span /><span /><span />
      </div>
      <div className="hud-side">MAB // GEN-AI v1.0</div>

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <Particles />
        <Nav />
        <ScrollReveal />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Writing />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
