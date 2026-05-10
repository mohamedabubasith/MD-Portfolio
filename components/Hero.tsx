
import React from 'react';
import Section from './Section';
import { EmailIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <Section id="home" className="min-h-screen flex items-center bg-transparent py-20 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-3/5 text-center md:text-left z-10 font-mono">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tighter">
            <span className="gradient-text uppercase block pb-2">Mohamed</span>
            <span className="gradient-text uppercase block">Abu Basith</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-[#b8ff33] mb-6 flex items-center justify-center md:justify-start gap-4">
            <span className="w-12 h-[2px] bg-[#76b900] hidden md:inline-block shadow-[0_0_10px_#76b900]"></span>
            Generative AI & Software Engineer
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
            Building production-grade real-time voice-to-voice AI agents and enterprise Knowledge Base platforms with multi-pipeline RAG architectures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="mailto:abubasith456@gmail.com" className="flex items-center justify-center gap-3 bg-[#76b900] text-black font-bold text-sm py-3 px-6 rounded-xl border border-[#76b900] uppercase tracking-widest transition-all duration-300 hover:bg-[#b8ff33] hover:border-[#b8ff33] hover:-translate-y-1 shadow-[0_0_15px_rgba(118,185,0,0.4)] hover:shadow-[0_0_25px_rgba(184,255,51,0.6)]">
              <EmailIcon />
              Contact Me
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="glow-hover flex items-center justify-center gap-3 bg-neutral-900/80 text-white font-bold text-sm py-3 px-6 rounded-xl border border-white/20 uppercase tracking-widest backdrop-blur-sm hover:border-[#76b900] hover:text-[#b8ff33] transition-all">
              View Resume
            </a>
          </div>
        </div>
        
        <div className="md:w-2/5 flex justify-center z-10 relative mt-16 md:mt-0">
          <div className="relative group perspective-1000">
            {/* The neon green structural frame */}
            <div className="absolute inset-0 border-2 border-[#76b900] translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 opacity-80 shadow-[0_0_15px_rgba(118,185,0,0.3)]"></div>
            
            {/* The image container */}
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] overflow-hidden border border-neutral-700 bg-neutral-900 z-10 filter grayscale brightness-90 contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100">
              <img 
                src="/profile.jpeg" 
                alt="Mohamed Abu Basith Professional Headshot" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500"
              />
              <div className="absolute inset-0 bg-[#76b900]/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
