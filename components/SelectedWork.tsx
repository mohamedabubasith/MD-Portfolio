import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectVis from './ProjectVis';

gsap.registerPlugin(ScrollTrigger);

const WORK = [
  {
    num: 'P—01',
    tag: 'AGENTIC AI · AWS',
    title: 'Bedrock Agent Platform',
    desc: 'Pet Quest picture-validation agent on Bedrock Agent with Strands, embedded in WordPress. A human-in-the-loop document pipeline on Step Functions with Textract and Bedrock models, plus a supplier admin portal on Cognito, RDS PostgreSQL, Lambda and API Gateway.',
    stack: 'BEDROCK / STRANDS / STEP FUNCTIONS / TEXTRACT / COGNITO',
    stackColor: 'var(--amber)',
    vis: 'grid',
    color: '#FFB347',
  },
  {
    num: 'P—02',
    tag: 'GEN AI · ENTERPRISE',
    title: 'Knowledge Platform',
    desc: 'Enterprise Knowledge Base platform with multi-pipeline RAG — Standard, HyDE, Hybrid and Graph RAG via the Cognee plugin — multi-tenant, user-isolated semantic search, orchestrated on Kubeflow.',
    stack: 'KUBEFLOW / QDRANT / COGNEE / LANGCHAIN / FASTAPI',
    stackColor: 'var(--cyan)',
    vis: 'graph',
    color: '#4AD8C7',
  },
  {
    num: 'P—03',
    tag: 'VOICE + TEXT AGENT',
    title: 'Conversational AI',
    desc: 'Real-time voice-to-voice AI agent on LiveKit — speech-to-text, LLM reasoning and text-to-speech in a sub-300ms pipeline. OpenRouter for multi-provider model switching, MCP for tools and enterprise data, a web-scraping pipeline for live retrieval. Owned end to end.',
    stack: 'LIVEKIT / OPENROUTER / MCP / RAG / WEBRTC',
    stackColor: 'var(--violet)',
    vis: 'wave',
    color: '#8B7CFF',
  },
  {
    num: 'P—04',
    tag: 'MCP · OPEN SOURCE',
    title: 'MCP Server Suite',
    desc: 'MCP servers built across ERPNext, Flowise and ThingsBoard, then orchestrated on Flowise into a production agent. A Gen AI document-verification POC for an enterprise client that validates uploads against defined criteria and returns structured JSON.',
    stack: 'MCP / FLOWISE / ERPNEXT / THINGSBOARD / OPENAI API',
    stackColor: 'var(--coral)',
    vis: 'pulse',
    color: '#FF6B4A',
  },
  {
    num: 'P—05',
    tag: 'ANDROID · RN SDK',
    title: 'Native SDK Work',
    desc: 'WLA Android financial authentication app with a custom biometric SDK (Face ID, Touch ID). Native Android wrapped inside a React Native SDK, Flutter and Cordova apps, Firebase-backed builds delivered from spec to Play Store and App Store.',
    stack: 'KOTLIN / REACT NATIVE / FLUTTER / CORDOVA / FIREBASE',
    stackColor: 'var(--dim)',
    vis: 'bars',
    color: '#E4E6EF',
  },
];

const SelectedWork: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wrap = wrapRef.current, track = trackRef.current;
    if (!wrap || !track) return;
    const mm = gsap.matchMedia();

    /* desktop: the list pins and pans horizontally with the scrollbar */
    mm.add('(min-width: 900px)', () => {
      const dist = () => track.scrollWidth - window.innerWidth;
      const pan = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: wrap, start: 'top top', end: () => '+=' + dist(),
          pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top top', end: () => '+=' + dist(), scrub: 0.8 },
      });
      track.querySelectorAll<HTMLElement>('.media').forEach(media => {
        gsap.to(media, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut',
          scrollTrigger: { trigger: media, containerAnimation: pan, start: 'left 90%' },
        });
        const vis = media.querySelector('.vis');
        if (vis) gsap.fromTo(vis, { xPercent: -8 }, {
          xPercent: 8, ease: 'none',
          scrollTrigger: { trigger: media, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true },
        });
      });
      attachSkew('skewX');
    });

    /* mobile: vertical stack, clip reveal on scroll */
    mm.add('(max-width: 899px)', () => {
      track.querySelectorAll<HTMLElement>('.media').forEach(media => {
        gsap.to(media, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut',
          scrollTrigger: { trigger: media, start: 'top 85%' },
        });
        const vis = media.querySelector('.vis');
        if (vis) gsap.fromTo(vis, { yPercent: -12 }, {
          yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      attachSkew('skewY');
    });

    /* velocity skew on the items, axis matches the scroll direction */
    function attachSkew(prop: 'skewX' | 'skewY') {
      const proxy = { skew: 0 };
      const set = gsap.quickSetter('.p-item', prop, 'deg');
      ScrollTrigger.create({
        onUpdate(self) {
          const skew = gsap.utils.clamp(-6, 6, self.getVelocity() / -450);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, { skew: 0, duration: 0.8, ease: 'power3', overwrite: true, onUpdate: () => set(proxy.skew) });
          }
        },
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <div className="work-wrap" ref={wrapRef}>
      <div className="work-track" ref={trackRef}>
        {WORK.map(w => (
          <div className="p-item" key={w.num}>
            <div className="media">
              <span className="num">{w.num}</span>
              <div className="vis"><ProjectVis kind={w.vis} color={w.color} bright={w.color} /></div>
            </div>
            <div className="meta">
              <span className="tag-line">{w.tag}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="stack" style={{ color: w.stackColor }}>{w.stack}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="work-rail" aria-hidden="true">
        <span>SELECTED WORK — 05</span>
        <span className="line"><i ref={lineRef} /></span>
        <span>DRAG THE SCROLLBAR, OR JUST SCROLL</span>
      </div>
    </div>
  );
};

export default SelectedWork;
