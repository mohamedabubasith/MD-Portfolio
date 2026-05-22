import React, { useState, useEffect } from 'react';

const NAV_ITEMS: [string, string][] = [
  ['home', 'INDEX'],
  ['about', 'PROFILE'],
  ['projects', 'WORK'],
  ['skills', 'STACK'],
  ['experience', 'LOG'],
  ['writing', 'SIGNAL'],
  ['contact', 'CHANNEL'],
];

const Nav: React.FC = () => {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map(([id]) => id);
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = 'home';
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.offsetTop <= y) cur = s;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = id === 'home' ? 0 : el.offsetTop - 80;
      window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <>
      <div className={`nav-backdrop${open ? ' show' : ''}`} onClick={() => setOpen(false)} />
      <nav className="nav">
        <a className="nav-logo" onClick={() => scrollTo('home')} style={{ cursor: 'none' }}>MAB</a>
        {NAV_ITEMS.map(([id, label]) => (
          <a
            key={id}
            className={`nav-item${active === id ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </a>
        ))}
        <div className="nav-status">
          <span className="dot" />
          <span>ONLINE</span>
        </div>
        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-mobile-menu${open ? ' show' : ''}`}>
        {NAV_ITEMS.map(([id, label]) => (
          <a
            key={id}
            className={`nav-mobile-item${active === id ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Nav;
