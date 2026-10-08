import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneState } from '../lib/sceneState';

gsap.registerPlugin(ScrollTrigger);

/* The section pins for PHASES.length screens. Each card slides in, holds,
   slides out; the particle scene reads sceneState.journey to morph. */
const PHASES = [
  {
    year: '2021 — PHASE 01',
    color: 'var(--coral)',
    title: 'The Device',
    text: 'Started at Grootan Technologies as a software engineering intern, then went native. Android, Kotlin, Java, Firebase — real users, real crashes, the craft of the small screen.',
    idx: 'ANDROID',
  },
  {
    year: '2022 – 2024 — PHASE 02',
    color: 'var(--amber)',
    title: 'The Lattice',
    text: 'Cross-platform era. Android, Flutter, React Native and Cordova apps shipped across client projects — biometric banking auth, native modules wrapped inside React Native SDKs, Play Store and App Store releases.',
    idx: 'CROSS-PLATFORM',
  },
  {
    year: '2025 — PHASE 03',
    color: 'var(--violet)',
    title: 'The Voice',
    text: 'Generative AI. A real-time voice-to-voice conversational agent on LiveKit — speech-to-text, LLM reasoning and text-to-speech in a sub-300ms pipeline, grounded on a multi-tenant knowledge base, wired to tools over MCP.',
    idx: 'VOICE AI',
  },
  {
    year: 'NOW — PHASE 04',
    color: 'var(--cyan)',
    title: 'The Network',
    text: 'Agentic scale. Bedrock agents with Strands, human-in-the-loop document pipelines on Step Functions and Textract, MCP servers across ERPNext, Flowise and ThingsBoard, and a multi-pipeline RAG platform — Standard, HyDE, Hybrid, Graph.',
    idx: 'AGENTIC AI',
  },
];

const Journey: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const cards = el.querySelectorAll<HTMLElement>('.card');
    const n = cards.length;
    const total = (n - 1) * 2 + 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=' + n * 100 + '%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate(self) {
          sceneState.journey = self.progress;
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          if (counterRef.current) counterRef.current.textContent = `0${i + 1} / 0${n} — ${PHASES[i].idx}`;
        },
      },
    });
    cards.forEach((card, i) => {
      tl.fromTo(card, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, i * 2);
      if (i < n - 1) tl.to(card, { autoAlpha: 0, y: -70, duration: 0.6, ease: 'power3.in' }, i * 2 + 1.4);
    });
    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: total, ease: 'none' }, 0);

    return () => { tl.scrollTrigger?.kill(); tl.kill(); sceneState.journey = 0; };
  }, [reduced]);

  return (
    <section className={`journey${reduced ? ' static' : ''}`} id="journey" ref={ref}>
      {PHASES.map(p => (
        <div className="slot" key={p.idx}>
          <div className="card">
            <div className="year" style={{ color: p.color }}>{p.year}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        </div>
      ))}
      <div className="rail" aria-hidden="true">
        <span ref={counterRef}>01 / 04 — {PHASES[0].idx}</span>
        <span className="line"><i ref={lineRef} /></span>
        <span>SCROLL</span>
      </div>
    </section>
  );
};

export default Journey;
