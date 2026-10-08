import React, { useState, useEffect } from 'react';
import Magnetic from './Magnetic';
import Marquee from './Marquee';
import { scrollToId } from '../lib/lenis';

const WORDS = [
  'building Gen AI systems.',
  'shipping Bedrock agents.',
  'designing voice AI agents.',
  'wiring MCP servers.',
  'engineering RAG pipelines.',
];

function TypingLoop() {
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [text, setText] = useState(reduced ? WORDS[0] : '');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIdx(i => (i + 1) % WORDS.length);
    } else {
      timeout = setTimeout(() => {
        setText(prev =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? 35 : 75);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, reduced]);

  return (
    <span>
      {text}{!reduced && <span className="caret" />}
    </span>
  );
}

const MARQUEE = ['MOHAMED ABU BASITH', 'GEN AI ENGINEER', 'MOHAMED ABU BASITH', 'AGENTIC AI · AWS'];

const Hero: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="eyebrow"><span>GEN AI / SOFTWARE ENGINEER<i className="loc"> — CHENNAI, INDIA</i></span></div>

        {/* giant kinetic headline: slides behind the 3D core */}
        <div className="hero-marquee">
          <Marquee items={MARQUEE} />
        </div>

        <div className="hero-foot">
          <div className="hero-copy">
            <div className="typing">
              <span className="prefix">$&gt;</span>
              <TypingLoop />
            </div>
            <p className="sub">
              I build <b>production-grade Gen AI systems</b> — voice-to-voice agents,
              Bedrock agents with human-in-the-loop pipelines, MCP servers and multi-pipeline
              RAG platforms. 4+ years shipping software at Grootan Technologies.
            </p>
            <div className="hero-cta">
              <Magnetic>
                <a href="#projects" className="btn btn-primary" onClick={scrollTo('projects')}>
                  VIEW WORK <span className="arrow">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn" onClick={scrollTo('contact')}>
                  GET IN TOUCH <span className="arrow">↗</span>
                </a>
              </Magnetic>
            </div>
          </div>
          <h1 className="hero-name">
            <span className="line"><span>MOHAMED</span></span>
            <span className="line"><span className="arc">ABU BASITH.</span></span>
          </h1>
        </div>
        <div className="hint">SCROLL TO MORPH</div>
      </section>

    </>
  );
};

export default Hero;
