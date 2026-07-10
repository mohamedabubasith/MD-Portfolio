import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Each panel drives one phase of the particle morph behind it. */
const PHASES = [
  {
    year: '2021 — PHASE 01',
    color: 'var(--coral)',
    title: 'The Device',
    text: 'Started at Grootan Technologies as a software engineering intern, then went native. Android, Kotlin, Java, Firebase — real users, real crashes, the craft of the small screen.',
    idx: '01 / 04 — ANDROID',
  },
  {
    year: '2022 – 2024 — PHASE 02',
    color: 'var(--amber)',
    title: 'The Lattice',
    text: 'Cross-platform era. Android, Flutter and React Native apps shipped across multiple client projects — from spec to Play Store and App Store, with native modules wrapped inside React Native SDKs.',
    idx: '02 / 04 — CROSS-PLATFORM',
  },
  {
    year: '2025 — PHASE 03',
    color: 'var(--violet)',
    title: 'The Voice',
    text: 'Generative AI. A real-time voice-to-voice conversational agent on LiveKit — speech-to-text, LLM reasoning and text-to-speech in a sub-300ms pipeline, grounded on a knowledge base.',
    idx: '03 / 04 — VOICE AI',
  },
  {
    year: 'NOW — PHASE 04',
    color: 'var(--cyan)',
    title: 'The Network',
    text: 'Enterprise scale. A multi-pipeline RAG Knowledge Base platform orchestrated on Kubeflow — 7 retrieval strategies — plus Gen AI document verification built on Claude for a Saudi enterprise client.',
    idx: '04 / 04 — ENTERPRISE AI',
  },
];

const Journey: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>('.journey .card').forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return;
    }
    const tweens: gsap.core.Tween[] = [];
    document.querySelectorAll<HTMLElement>('.journey .card').forEach(card => {
      tweens.push(gsap.fromTo(card, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: card.parentElement,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      }));
    });
    return () => tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
  }, []);

  return (
    <section className="journey" id="journey">
      {PHASES.map(p => (
        <div className="panel-slide" key={p.idx}>
          <div className="card">
            <div className="year" style={{ color: p.color }}>{p.year}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
          <div className="idx">{p.idx}</div>
        </div>
      ))}
    </section>
  );
};

export default Journey;
