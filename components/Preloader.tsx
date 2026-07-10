import React, { useEffect, useRef, useState } from 'react';

const STEPS = [
  'INITIALIZING',
  'LOADING MODULES',
  'CONNECTING SERVICES',
  'ESTABLISHING UPLINK',
  'READY',
];
const STEP_THRESHOLDS = [0, 20, 45, 72, 90];
const GLYPHS = '#%&@/<>_01ABCDEFGHKXYZ';
const DURATION = 1800;

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

const Preloader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState(() => scramble(STEPS[0], 0));
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);
  const stepChangedAtRef = useRef(0);
  const prevStepRef = useRef(0);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setProgress(100);
      setStepText(STEPS[STEPS.length - 1]);
      setTimeout(() => { setDone(true); onDone(); }, 100);
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
        setTimeout(() => { setDone(true); onDone(); }, 250);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div className={`preloader${done ? ' done' : ''}`}>
      <div className="count">{String(progress).padStart(2, '0')}</div>
      <div className="label">
        MOHAMED ABU BASITH<br />
        GENERATIVE AI ENGINEER<br />
        PORTFOLIO ©{new Date().getFullYear()}
        <span className="step">{stepText}</span>
      </div>
    </div>
  );
};

export default Preloader;
