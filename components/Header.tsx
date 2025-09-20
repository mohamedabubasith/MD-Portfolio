
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={scrollToTop} className="text-2xl font-bold font-heading text-text-dark">M.A.B.</a>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-text-dark font-medium hover:text-primary-300 transition-colors duration-300">{link.label}</a>
          ))}
          <a href="/resume.pdf" download="Mohamed_Abu_Basith_Resume.pdf" className="bg-primary-200 text-text-dark font-bold py-2 px-4 rounded-lg hover:bg-primary-300 transition-all duration-300 transform hover:scale-105">
            Download Resume
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-dark focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-6 pt-2 pb-4 space-y-2 flex flex-col items-center">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block text-text-dark font-medium hover:text-primary-300 transition-colors duration-300 py-2">{link.label}</a>
            ))}
            <a href="/resume.pdf" download="Mohamed_Abu_Basith_Resume.pdf" className="bg-primary-200 text-text-dark font-bold py-2 px-6 rounded-lg hover:bg-primary-300 transition-all duration-300 w-full text-center mt-2">
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
