
import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Offset to account for the sticky header height (approx. 80px)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-black/80 backdrop-blur-md border-[#76b900]/30 shadow-[0_4px_30px_rgba(118,185,0,0.1)]' : 'bg-transparent border-transparent'}`}>
      <nav className="container w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={scrollToTop} className="text-2xl font-bold font-mono tracking-widest text-white flex items-center gap-2 group hover:opacity-80 transition-opacity">
          MAB<span className="w-2.5 h-2.5 bg-[#76b900] shadow-[0_0_8px_#76b900] group-hover:bg-[#b8ff33] transition-colors"></span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-300 font-mono text-sm uppercase hover:text-[#b8ff33] transition-colors duration-300 relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b8ff33] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="glow-hover bg-[#76b900]/10 text-[#b8ff33] border border-[#76b900] font-mono text-sm py-2 px-4 uppercase tracking-wider backdrop-blur-sm">
            Resume
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-[#b8ff33] focus:outline-none transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-[#76b900]/30 shadow-[0_4px_30px_rgba(118,185,0,0.1)] backdrop-blur-lg">
          <div className="px-6 pt-2 pb-4 space-y-2 flex flex-col items-center">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block text-gray-300 font-mono uppercase hover:text-[#b8ff33] transition-colors duration-300 py-3 w-full text-center border-b border-neutral-800">
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 bg-[#76b900]/20 text-[#b8ff33] border border-[#76b900] font-mono py-3 px-6 w-full text-center uppercase tracking-wider">
              View Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
