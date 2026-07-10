import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  'ANDROID', 'FLUTTER', 'REACT NATIVE', 'GEN AI', 'MCP',
  'KUBEFLOW', 'VOICE AGENTS', 'RAG', 'FIREBASE', 'NODE.JS',
];

const Marquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mqX = 0;
    const tick = () => {
      const v = (ScrollTrigger as any).getVelocity?.() ?? 0;
      mqX -= 1.2 + Math.min(Math.abs(v) / 600, 6);
      const half = track.scrollWidth / 2;
      if (-mqX >= half) mqX += half;
      track.style.transform = `translateX(${mqX}px)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  /* content rendered twice for a seamless loop */
  const spans = [...WORDS, ...WORDS].map((w, i) => (
    <span key={i} className={i % 2 === 0 ? 'fill' : undefined}>{w}</span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" ref={trackRef}>{spans}</div>
    </div>
  );
};

export default Marquee;
