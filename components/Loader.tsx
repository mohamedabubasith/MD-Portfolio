import React, { useEffect, useState, useRef } from 'react';

const STEPS = [
  'INITIALIZING',
  'LOADING MODULES',
  'CONNECTING SERVICES',
  'ESTABLISHING UPLINK',
  'READY',
];
const STEP_THRESHOLDS = [0, 20, 45, 72, 90];
const GLYPHS = '#%&@/<>_01ABCDEFGHKXYZ';
const DURATION = 2600;

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
  const [stepText, setStepText] = useState(() => scramble(STEPS[0], 0));
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);
  const stepChangedAtRef = useRef(0);
  const prevStepRef = useRef(0);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = prefersReducedMotion();
    if (reduced) {
      setProgress(100);
      setStepText(STEPS[STEPS.length - 1]);
      setTimeout(() => { setDone(true); onDone(); }, 200);
      return;
    }

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
      }
      const sinceStep = now - stepChangedAtRef.current;
      const label = STEPS[idx];
      const revealed = Math.min(label.length, Math.floor((sinceStep / 220) * label.length));
      setStepText(revealed >= label.length ? label : scramble(label, revealed));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setStepText(STEPS[STEPS.length - 1]);
        setTimeout(() => { setDone(true); onDone(); }, 320);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div className={`loader${done ? ' done' : ''}`}>
      <div className="loader-grid" />
      <div className="loader-scan" />

      <div className="loader-topbar">
        <span>MAB <span className="hi">//</span> GEN-AI PORTFOLIO</span>
        <span>NODE MAB-001 // 2025</span>
      </div>

      <div className="loader-hud">
        <span className="hud-tl" /><span className="hud-tr" />
        <span className="hud-bl" /><span className="hud-br" />
      </div>

      <div className="loader-body">
        <div className="loader-count-label">LOADING</div>

        <div className="loader-count">
          <span className="loader-count-num">{String(progress).padStart(3, ' ')}</span>
          <span className="loader-count-pct">%</span>
        </div>

        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-step-line">{stepText}</div>

        <div className="loader-id" style={{ opacity: Math.min(1, progress / 55) }}>
          <div className="loader-person-name">Mohamed Abu Basith</div>
          <div className="loader-person-role">Generative AI Engineer · India</div>
        </div>
      </div>

      <div className="loader-bottombar">
        <span>IST UTC+5:30</span>
        <span>UPTIME 99.7%</span>
        <span className={progress >= 100 ? 'online' : ''}>
          {progress >= 100 ? '● ONLINE' : '○ BOOTING'}
        </span>
      </div>
    </div>
  );
};

export default Loader;
