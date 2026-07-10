import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const ts = time.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).replace(',', '');

  return (
    <footer className="site-footer">
      <div className="foot-line">
        © {time.getFullYear()} <b>Mohamed Abu Basith</b> — END OF TRANSMISSION
      </div>
      <div className="clock">{ts} IST</div>
      <div className="footer-links">
        <a href="https://github.com/mohamedabubasith" target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a href="https://www.linkedin.com/in/mohamedabubasith" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        <a href="https://medium.com/@mohamedabu.basith_91257" target="_blank" rel="noopener noreferrer">MEDIUM</a>
      </div>
      <div className="fine">MAB // GEN-AI v2.0 — THREE.JS · GSAP · SHADERS</div>
    </footer>
  );
};

export default Footer;
