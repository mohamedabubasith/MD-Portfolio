
import React from 'react';
import Section from './Section';
import { EmailIcon, PhoneIcon, LocationIcon, HobbyIcon } from './Icons';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Connection request sent.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section id="contact" className="bg-transparent border-t border-neutral-900 border-dashed">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tighter uppercase mb-4">
          <span className="gradient-text">Comm Link</span>
        </h2>
        <div className="w-24 h-1 bg-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.6)]"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="glow-hover bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-white/5 p-8 relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#76b900] to-transparent opacity-60"></div>
          <h3 className="text-xl font-bold font-mono text-[#b8ff33] mb-6 flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-[#76b900] inline-block shadow-[0_0_8px_#76b900]"></span>
            Get In Touch
          </h3>
          <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
            I am always open to new opportunities, collaborations, and discussions about AI and software engineering. Feel free to reach out.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <span className="bg-[#76b900]/10 rounded-lg p-2 border border-[#76b900]/30 group-hover:bg-[#76b900]/30 transition-colors">
                <EmailIcon className="text-[#b8ff33]" />
              </span>
              <a href="mailto:abubasith86@gmail.com" className="text-gray-300 font-mono hover:text-[#b8ff33] transition-colors relative">
                abubasith86@gmail.com
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#76b900] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex items-center gap-4 group">
              <span className="bg-[#76b900]/10 rounded-lg p-2 border border-[#76b900]/30 group-hover:bg-[#76b900]/30 transition-colors">
                 <PhoneIcon className="text-[#b8ff33]" />
              </span>
              <a href="tel:+919585909514" className="text-gray-300 font-mono hover:text-[#b8ff33] transition-colors relative">
                +91 9585909514
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#76b900] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex items-center gap-4 opacity-80 cursor-default">
              <span className="bg-neutral-800/50 rounded-lg p-2 border border-neutral-700">
                <LocationIcon className="text-gray-400" />
              </span>
              <span className="text-gray-400 font-mono">Perungudi, Chennai</span>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="glow-hover bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-white/5 p-8 relative space-y-6">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-[#76b900] opacity-60"></div>
            <div className="space-y-4">
              <input type="text" placeholder="GUEST_IDENTITY" required className="w-full p-3 bg-black/40 rounded-xl border border-neutral-800 text-white font-mono text-sm focus:outline-none focus:border-[#76b900] focus:ring-1 focus:ring-[#76b900] transition-all caret-[#b8ff33]"/>
              <input type="email" placeholder="RETURN_ADDRESS" required className="w-full p-3 bg-black/40 rounded-xl border border-neutral-800 text-white font-mono text-sm focus:outline-none focus:border-[#76b900] focus:ring-1 focus:ring-[#76b900] transition-all caret-[#b8ff33]"/>
              <textarea placeholder="PAYLOAD" rows={5} required className="w-full p-3 bg-black/40 rounded-xl border border-neutral-800 text-white font-mono text-sm focus:outline-none focus:border-[#76b900] focus:ring-1 focus:ring-[#76b900] transition-all caret-[#b8ff33] resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#76b900]/10 text-[#b8ff33] rounded-xl border border-[#76b900] font-mono text-sm py-4 px-6 uppercase tracking-widest hover:bg-[#76b900]/30 hover:shadow-[0_0_15px_rgba(118,185,0,0.4)] transition-all">
              Initialize Transmission
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
