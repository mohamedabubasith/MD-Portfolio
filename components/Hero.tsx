import React, { useState, useEffect } from 'react';

const WORDS = [
  'building Gen AI systems.',
  'shipping RAG pipelines.',
  'designing voice AI agents.',
  'engineering LLM infra.',
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

function TelemetryPanel() {
  const [vals, setVals] = useState({ uptime: 99.9, throughput: 12.4, latency: 48 });

  useEffect(() => {
    const id = setInterval(() => {
      setVals({
        uptime: +(99.1 + Math.random() * 0.9).toFixed(1),
        throughput: +(10 + Math.random() * 5).toFixed(1),
        latency: Math.round(40 + Math.random() * 20),
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="panel">
      <div className="panel-head">
        <span>SYS · TELEMETRY</span>
        <span className="live">LIVE</span>
      </div>
      <div className="tele-row">
        <span className="k">UPTIME</span>
        <span className="v good value-pulse" key={'u' + vals.uptime}>{vals.uptime}%</span>
      </div>
      <div className="meter"><div style={{ width: vals.uptime + '%' }} /></div>
      <div className="tele-row">
        <span className="k">THROUGHPUT</span>
        <span className="v value-pulse" key={'t' + vals.throughput}>{vals.throughput}K tok/s</span>
      </div>
      <div className="meter"><div style={{ width: Math.min(100, vals.throughput * 5) + '%' }} /></div>
      <div className="tele-row">
        <span className="k">P50 LATENCY</span>
        <span className="v value-pulse" key={'l' + vals.latency}>{vals.latency}ms</span>
      </div>
      <div className="meter"><div style={{ width: Math.min(100, vals.latency * 1.3) + '%' }} /></div>
    </div>
  );
}

const Hero: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="eyebrow"><span>GENERATIVE AI ENGINEER — CHENNAI, INDIA</span></div>
      <h1>
        <span className="line"><span>MOHAMED</span></span>
        <span className="line"><span className="arc">ABU BASITH.</span></span>
      </h1>
      <div className="typing">
        <span className="prefix">$&gt;</span>
        <TypingLoop />
      </div>
      <p className="sub">
        I build <b>production-grade Gen AI systems</b> — from real-time voice-to-voice
        conversational agents to enterprise RAG platforms. 4+ years shipping software,
        currently leading AI engineering at Grootan Technologies.
        The particles behind this text tell the story. Scroll.
      </p>
      <div className="hero-cta">
        <a href="#projects" className="btn btn-primary" onClick={scrollTo('projects')}>
          VIEW WORK <span className="arrow">→</span>
        </a>
        <a href="#contact" className="btn" onClick={scrollTo('contact')}>
          GET IN TOUCH <span className="arrow">↗</span>
        </a>
        {/* <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">
          RESUME <span className="arrow">↓</span>
        </a> */}
      </div>
      <div className="hero-rail">
        <TelemetryPanel />
        <div className="panel">
          <div className="panel-head">
            <span>NOW · {new Date().getFullYear()}</span>
            <span style={{ color: 'var(--cyan)' }}>◢ ◣</span>
          </div>
          <div className="panel-note">
            Leading <b>Gen AI infra</b> at Grootan Technologies.
            Open to AI consulting and interesting problems.
          </div>
        </div>
      </div>
      <div className="hint">SCROLL TO MORPH</div>
    </section>
  );
};

export default Hero;
