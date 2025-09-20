
import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-text-dark text-white">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <p className="font-bold text-lg">Mohamed Abu Basith</p>
          <p className="text-gray-400">&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="#" aria-label="Github" className="text-gray-400 hover:text-white transition-colors duration-300">
            <GithubIcon />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-300">
            <LinkedinIcon />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300">
            <TwitterIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
