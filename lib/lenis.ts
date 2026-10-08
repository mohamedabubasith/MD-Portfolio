import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/* One Lenis instance for the whole app, driven by GSAP's ticker so
   ScrollTrigger and smooth scroll share a single frame clock. */
export function getLenis(): Lenis {
  if (lenis) return lenis;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: !reduced });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollToId(id: string) {
  const l = getLenis();
  if (id === 'home') l.scrollTo(0, { duration: 1.4 });
  else l.scrollTo('#' + id, { offset: -80, duration: 1.4 });
}
