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
    <footer className="footer">
      <div>
        © {time.getFullYear()} <b>Mohamed Abu Basith</b> — END OF TRANSMISSION
      </div>
      <div style={{ color: 'var(--green)', fontFamily: 'var(--mono)', fontSize: '10px' }}>
        {ts} IST
      </div>
      <div className="footer-links">
        <a href="https://github.com/mohamedabubasith" target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a>
        <a href="https://www.linkedin.com/in/mohamedabubasith" target="_blank" rel="noopener noreferrer" className="footer-link">LINKEDIN</a>
        <a href="https://medium.com/@mohamedabu.basith_91257" target="_blank" rel="noopener noreferrer" className="footer-link">MEDIUM</a>
      </div>
    </footer>
  );
};

export default Footer;
