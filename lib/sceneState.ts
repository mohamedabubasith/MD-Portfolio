/* Scroll-driven values shared between the pinned DOM sections (GSAP) and
   the WebGL scene, which reads them each frame. Plain object, no React. */
export const sceneState = {
  /* 0..1 progress through the pinned Journey section */
  journey: 0,
  /* set once the preloader has left */
  ready: false,
};
