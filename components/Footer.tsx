import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const ts = time.toISOString().slice(0, 19).replace('T', ' ');

  return (
    <footer className="footer">
      <div>
        © {time.getFullYear()} <b>Mohamed Abu Basith</b> — END OF TRANSMISSION
      </div>
      <div style={{ color: 'var(--green)', fontFamily: 'var(--mono)', fontSize: '10px' }}>
        {ts} UTC
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
