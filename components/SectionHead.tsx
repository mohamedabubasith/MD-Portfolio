import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  num: string;
  label: string;
  title: React.ReactNode;
  meta: string[];
}

const SectionHead: React.FC<Props> = ({ num, label, title, meta }) => {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h2 = h2Ref.current;
    if (!h2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      h2.style.transform = 'none';
      return;
    }
    const tween = gsap.to(h2, {
      y: 0, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: h2.parentElement, start: 'top 82%' },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <div className="section-head">
      <div>
        <div className="section-label"><span className="num">{num}</span> {label}</div>
        <div className="head-clip">
          <h2 ref={h2Ref} style={{ transform: 'translateY(110%)' }}>{title}</h2>
        </div>
      </div>
      <div className="section-meta">
        {meta.map((m, i) => <div key={i}>{m}</div>)}
      </div>
    </div>
  );
};

export default SectionHead;
