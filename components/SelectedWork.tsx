import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectVis from './ProjectVis';

gsap.registerPlugin(ScrollTrigger);

const WORK = [
  {
    num: 'P—01',
    tag: 'GEN AI · ENTERPRISE',
    title: 'Knowledge Platform',
    desc: 'Enterprise-level Knowledge Base platform with multi-pipeline RAG — 7 retrieval strategies including Standard, HyDE, Hybrid, Graph and Contextual Compression — orchestrated on Kubeflow.',
    stack: 'KUBEFLOW / QDRANT / LANGCHAIN / FASTAPI',
    stackColor: 'var(--cyan)',
    vis: 'graph',
    color: '#4AD8C7',
  },
  {
    num: 'P—02',
    tag: 'VOICE + TEXT AGENT',
    title: 'Conversational AI',
    desc: 'Real-time voice-to-voice AI agent on LiveKit — speech-to-text, LLM reasoning and text-to-speech in a sub-300ms pipeline, with knowledge base grounding, MCP connections and live database access. Owned end to end.',
    stack: 'LIVEKIT / OPENAI / MCP / RAG / WEBRTC',
    stackColor: 'var(--violet)',
    vis: 'wave',
    color: '#8B7CFF',
  },
  {
    num: 'P—03',
    tag: 'GEN AI · POC',
    title: 'Document Verification',
    desc: 'Gen AI powered document verification proof-of-concept delivered for a Saudi enterprise client — Claude multimodal extraction, validation and cross-referencing of structured and unstructured data.',
    stack: 'CLAUDE API / MULTIMODAL / DOCUMENT AI',
    stackColor: 'var(--amber)',
    vis: 'pulse',
    color: '#FFB347',
  },
  {
    num: 'P—04',
    tag: 'ANDROID · RN SDK',
    title: 'Native SDK Work',
    desc: 'Android functionality integrated inside a React Native wrapper SDK, plus Flutter and hybrid app contributions — Firebase-backed apps delivered from spec to Play Store and App Store.',
    stack: 'KOTLIN / REACT NATIVE / FLUTTER / FIREBASE',
    stackColor: 'var(--coral)',
    vis: 'bars',
    color: '#FF6B4A',
  },
];

const SelectedWork: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tweens: gsap.core.Tween[] = [];
    const sts: ScrollTrigger[] = [];

    /* clip reveal + internal parallax */
    document.querySelectorAll<HTMLElement>('.p-item .media').forEach(media => {
      tweens.push(gsap.to(media, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut',
        scrollTrigger: { trigger: media, start: 'top 85%' },
      }));
      const vis = media.querySelector('.vis');
      if (vis) {
        tweens.push(gsap.fromTo(vis, { yPercent: -12 }, {
          yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
        }));
      }
    });

    /* velocity skew on the whole work list */
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter('.p-item', 'skewY', 'deg');
    sts.push(ScrollTrigger.create({
      onUpdate(self) {
        const skew = gsap.utils.clamp(-6, 6, self.getVelocity() / -450);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, duration: 0.8, ease: 'power3', overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    }));

    return () => {
      tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
      sts.forEach(s => s.kill());
    };
  }, []);

  return (
    <div className="work-list">
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
  );
};

export default SelectedWork;
