import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLenis, scrollToId } from '../lib/lenis';

const NAV_ITEMS: [string, string][] = [
  ['home', 'INDEX'],
  ['journey', 'JOURNEY'],
  ['about', 'PROFILE'],
  ['projects', 'WORK'],
  ['skills', 'STACK'],
  ['experience', 'LOG'],
  ['writing', 'SIGNAL'],
  ['contact', 'CHANNEL'],
];

const menu = {
  hidden: { x: '100%' },
  show: { x: 0, transition: { type: 'spring', stiffness: 140, damping: 22, staggerChildren: 0.05, delayChildren: 0.12 } },
  exit: { x: '100%', transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
} as const;
const item = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 160, damping: 20 } },
} as const;

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
    const l = getLenis();
    if (open) l.stop(); else l.start();
  }, [open]);

  const go = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className={`nav-backdrop${open ? ' show' : ''}`} onClick={() => setOpen(false)} />
      <nav className="nav">
        <a className="nav-logo" href="#home" onClick={e => go('home', e)}>MAB®</a>
        {NAV_ITEMS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-item${active === id ? ' active' : ''}`}
            onClick={e => go(id, e)}
          >
            {label}
            {active === id && (
              <motion.span
                className="nav-ink"
                layoutId="nav-ink"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
        <div className="nav-status">
          <span className="dot" />
          <span>ONLINE</span>
        </div>
        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="nav-mobile-menu" variants={menu} initial="hidden" animate="show" exit="exit">
            {NAV_ITEMS.map(([id, label]) => (
              <motion.a
                key={id}
                variants={item}
                href={`#${id}`}
                className={`nav-mobile-item${active === id ? ' active' : ''}`}
                onClick={e => go(id, e)}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
