
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-white text-text-light font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
