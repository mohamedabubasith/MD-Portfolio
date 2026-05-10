
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Particles } from './components/Particles';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#76b900] selection:text-black">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 bg-grid pointer-events-none"></div>
      <Particles />
      <div className="fixed inset-0 z-0 bg-vignette pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header />
        <main className="w-full">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
