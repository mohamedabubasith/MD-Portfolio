import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 760) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !trail) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let tx = -100, ty = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => ring.classList.add('hover');
    const onLeave = () => ring.classList.remove('hover');

    window.addEventListener('mousemove', onMove);

    document.querySelectorAll('a, button, .btn, .project, .article, .contact-link').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const animate = () => {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
};

export default Cursor;
