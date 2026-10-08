import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  'AWS BEDROCK', 'MCP', 'GEN AI', 'LANGGRAPH', 'VOICE AGENTS',
  'RAG', 'KUBEFLOW', 'FLUTTER', 'REACT NATIVE', 'ANDROID',
];

interface Props {
  items?: string[];
  speed?: number;
}

/* Endless band; scroll velocity speeds it up. Content is rendered twice
   for a seamless loop. */
const Marquee: React.FC<Props> = ({ items = WORDS, speed = 1.2 }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mqX = 0;
    const tick = () => {
      const v = (ScrollTrigger as any).getVelocity?.() ?? 0;
      mqX -= speed + Math.min(Math.abs(v) / 600, 6);
      const half = track.scrollWidth / 2;
      if (-mqX >= half) mqX += half;
      track.style.transform = `translateX(${mqX}px)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [speed]);

  const spans = [...items, ...items].map((w, i) => (
    <span key={i} className={i % 2 === 0 ? 'fill' : undefined}>{w}</span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" ref={trackRef}>{spans}</div>
    </div>
  );
};

export default Marquee;
