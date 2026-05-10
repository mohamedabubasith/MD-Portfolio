
import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 z-10 relative">
      <div className="container max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <p className="font-bold text-lg font-mono text-[#b8ff33]">MAB<span className="text-white">_SYSTEM_ONLINE</span></p>
          <p className="text-gray-500 font-mono text-xs mt-2">&copy; {new Date().getFullYear()} Mohamed Abu Basith. END OF TRANSMISSION.</p>
        </div>
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="#" aria-label="Github" className="text-gray-500 hover:text-[#b8ff33] transition-colors duration-300">
            <GithubIcon />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-[#b8ff33] transition-colors duration-300">
            <LinkedinIcon />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-[#b8ff33] transition-colors duration-300">
            <TwitterIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
