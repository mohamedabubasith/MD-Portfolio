import React, { useEffect, useState, useRef } from 'react';

const STEPS = [
  'INITIALIZING SYSTEM',
  'LOADING MODULES',
  'CONNECTING SERVICES',
  'READY',
];

const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.round(p));
      setStepIdx(Math.min(STEPS.length - 1, Math.floor((p / 100) * STEPS.length)));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 800);
        }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div className={`loader${done ? ' done' : ''}`}>
      <div className="loader-grid" />
      <div className="loader-mark" />
      <div className="loader-title">
        MAB_SYSTEM<span className="caret" />
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-meta">
          <span>{STEPS[stepIdx]}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
