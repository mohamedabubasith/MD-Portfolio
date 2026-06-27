import React, { useEffect, useState, useRef } from 'react';

const TITLE = 'MAB_SYSTEM';
const GLYPHS = '#%&@/<>_01ABCDEFGHKXYZ';
const DURATION = 2800;

const STEPS = [
  'KERNEL INIT',
  'LOADING AI RUNTIME',
  'CONNECTING SERVICES',
  'ESTABLISHING UPLINK',
  'SYSTEM READY',
];
const STEP_THRESHOLDS = [0, 20, 45, 72, 90];

const BOOT_LOG = [
  { tag: '[KERNEL]',  msg: 'boot sequence initialized' },
  { tag: '[RUNTIME]', msg: 'AI modules v4.2.1 loaded' },
  { tag: '[VECTOR]',  msg: 'embedding engine online' },
  { tag: '[NEURAL]',  msg: 'inference pipeline ready' },
  { tag: '[UPLINK]',  msg: 'external APIs connected' },
  { tag: '[AGENT]',   msg: 'orchestration layer active' },
  { tag: '[CACHE]',   msg: 'context store provisioned' },
  { tag: '[SYSTEM]',  msg: 'all services nominal' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scramble(target: string, revealed: number): string {
  let out = '';
  for (let i = 0; i < target.length; i++) {
    if (target[i] === ' ') { out += ' '; continue; }
    out += i < revealed ? target[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
  }
  return out;
}

const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [title, setTitle] = useState(() => scramble(TITLE, 0));
  const [stepText, setStepText] = useState(() => scramble(STEPS[0], 0));
  const [visibleLines, setVisibleLines] = useState(0);
  const [glitch, setGlitch] = useState(true);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);
  const stepChangedAtRef = useRef(0);
  const prevStepRef = useRef(0);
  const flickeredRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = prefersReducedMotion();

    if (reduced) {
      setTitle(TITLE);
      setStepText(STEPS[STEPS.length - 1]);
      setStepIdx(STEPS.length - 1);
      setProgress(100);
      setVisibleLines(BOOT_LOG.length);
      setGlitch(false);
      setTimeout(() => { setDone(true); onDone(); }, 220);
      return;
    }

    setTimeout(() => setGlitch(false), 130);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = easeInOutCubic(Math.min(1, elapsed / DURATION));
      const p = Math.round(eased * 100);
      setProgress(p);

      let idx = 0;
      for (let i = 0; i < STEP_THRESHOLDS.length; i++) {
        if (p >= STEP_THRESHOLDS[i]) idx = i;
      }
      if (idx !== prevStepRef.current) {
        prevStepRef.current = idx;
        stepChangedAtRef.current = now;
        setStepIdx(idx);
      }

      const titleRevealed = Math.min(TITLE.length, Math.floor((elapsed / 700) * TITLE.length));
      setTitle(titleRevealed >= TITLE.length ? TITLE : scramble(TITLE, titleRevealed));

      const sinceStep = now - stepChangedAtRef.current;
      const label = STEPS[idx];
      const stepRevealed = Math.min(label.length, Math.floor((sinceStep / 260) * label.length));
      setStepText(stepRevealed >= label.length ? label : scramble(label, stepRevealed));

      const lines = Math.floor((p / 100) * BOOT_LOG.length);
      setVisibleLines(lines);

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        if (!flickeredRef.current) {
          flickeredRef.current = true;
          setTitle(TITLE);
          setStepText(STEPS[STEPS.length - 1]);
          setVisibleLines(BOOT_LOG.length);
          setGlitch(true);
        }
        setTimeout(() => { setDone(true); onDone(); }, 300);
      }
    };
    requestAnimationFrame(tick);
    // no cleanup — boot runs once, guarded by startedRef
  }, [onDone]);

  return (
    <div className={`loader${done ? ' done' : ''}`}>
      <div className="loader-scan" />
      <div className="loader-grid" />

      <div className="loader-topbar">
        <span>MAB // <span className="hi">BOOT SEQUENCE</span></span>
        <span>GEN-AI v1.0 // NODE MAB-001</span>
      </div>

      <div className="loader-hud">
        <span className="hud-tl" />
        <span className="hud-tr" />
        <span className="hud-bl" />
        <span className="hud-br" />
      </div>

      <div className="loader-body">
        {/* HUD targeting reticle */}
        <svg className="loader-mark" viewBox="0 0 120 120" width="130" height="130" aria-hidden="true">
          {/* outer static ring */}
          <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(118,185,0,0.18)" strokeWidth="1"/>
          {/* cardinal tick marks */}
          <line x1="60" y1="4"   x2="60" y2="14"  stroke="rgba(118,185,0,0.7)" strokeWidth="1.5"/>
          <line x1="116" y1="60" x2="106" y2="60" stroke="rgba(118,185,0,0.7)" strokeWidth="1.5"/>
          <line x1="60" y1="116" x2="60" y2="106" stroke="rgba(118,185,0,0.7)" strokeWidth="1.5"/>
          <line x1="4"  y1="60"  x2="14" y2="60"  stroke="rgba(118,185,0,0.7)" strokeWidth="1.5"/>
          {/* mid ring track */}
          <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(118,185,0,0.1)" strokeWidth="1"/>
          {/* sweeping arc — primary */}
          <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(118,185,0,0.85)" strokeWidth="1.5"
            strokeDasharray="68 196" strokeLinecap="round" className="ring-sweep"/>
          {/* crosshair lines */}
          <line x1="4"  y1="60" x2="34" y2="60" stroke="rgba(118,185,0,0.2)" strokeWidth="0.5"/>
          <line x1="86" y1="60" x2="116" y2="60" stroke="rgba(118,185,0,0.2)" strokeWidth="0.5"/>
          <line x1="60" y1="4"  x2="60" y2="34" stroke="rgba(118,185,0,0.2)" strokeWidth="0.5"/>
          <line x1="60" y1="86" x2="60" y2="116" stroke="rgba(118,185,0,0.2)" strokeWidth="0.5"/>
          {/* inner ring track */}
          <circle cx="60" cy="60" r="26" fill="none" stroke="rgba(118,185,0,0.15)" strokeWidth="1"/>
          {/* counter-rotating inner arc */}
          <circle cx="60" cy="60" r="26" fill="none" stroke="rgba(118,185,0,0.55)" strokeWidth="1"
            strokeDasharray="22 141" strokeLinecap="round" className="ring-reverse"/>
          {/* center pulsing dot */}
          <circle cx="60" cy="60" r="3" fill="rgba(118,185,0,0.9)" className="center-pulse"/>
        </svg>

        <div className={`loader-title${glitch ? ' glitch' : ''}`}>
          {title}<span className="caret" />
        </div>
        <div className="loader-role">GENERATIVE AI ENGINEER</div>

        <div className="loader-bar-wrap">
          <div className="loader-bar">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-meta">
            <span className="loader-step">{stepText}</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="loader-console">
          {BOOT_LOG.slice(0, visibleLines).map((line, i) => (
            <div className="loader-log-line" key={i}>
              <span className="log-tag">{line.tag}</span>
              <span className="log-msg">{line.msg}</span>
              <span className="log-ok">OK</span>
            </div>
          ))}
        </div>
      </div>

      <div className="loader-bottombar">
        <span>UPTIME: 99.7%</span>
        <span>REGION: INDIA // IST UTC+5:30</span>
        <span className={progress >= 100 ? 'online' : ''}>
          STATUS: {progress >= 100 ? 'ONLINE' : 'BOOTING'}
        </span>
      </div>
    </div>
  );
};

export default Loader;
