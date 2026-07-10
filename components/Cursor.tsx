import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let cx = 0, cy = 0, rx = 0, ry = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
    };
    const follow = () => {
      rx += (cx - rx) * 0.13;
      ry += (cy - ry) * 0.13;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      raf = requestAnimationFrame(follow);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(follow);

    /* delegated hover states — survives async-rendered links */
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.p-item .media')) ring.classList.add('view');
      else if (t.closest('a, button')) ring.classList.add('hovering');
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.p-item .media')) ring.classList.remove('view');
      if (t.closest('a, button')) ring.classList.remove('hovering');
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;
