import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COUNT = 8000;

function rand(a: number, b: number) { return a + Math.random() * (b - a); }

/* PHASE 0 — PHONE : thin rounded slab shell (the Android years) */
function genPhone(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  const W = 1.5, H = 3.1, D = 0.18;
  for (let i = 0; i < COUNT; i++) {
    const face = Math.random();
    let x: number, y: number, z: number;
    if (face < 0.42) { x = rand(-W / 2, W / 2); y = rand(-H / 2, H / 2); z = D / 2; }
    else if (face < 0.84) { x = rand(-W / 2, W / 2); y = rand(-H / 2, H / 2); z = -D / 2; }
    else if (face < 0.90) { x = W / 2; y = rand(-H / 2, H / 2); z = rand(-D / 2, D / 2); }
    else if (face < 0.96) { x = -W / 2; y = rand(-H / 2, H / 2); z = rand(-D / 2, D / 2); }
    else { x = rand(-W / 2, W / 2); y = Math.random() < 0.5 ? H / 2 : -H / 2; z = rand(-D / 2, D / 2); }
    if (i % 97 === 0) { x = rand(-0.3, 0.3); y = H / 2 - 0.15; z = D / 2 + 0.01; }
    a.set([x, y, z], i * 3);
  }
  return a;
}

/* PHASE 1 — LATTICE : 3D grid cube (cross-platform structure) */
function genLattice(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  const side = Math.round(Math.cbrt(COUNT));
  const S = 3.4, step = S / (side - 1);
  let i = 0;
  for (let x = 0; x < side && i < COUNT; x++)
    for (let y = 0; y < side && i < COUNT; y++)
      for (let z = 0; z < side && i < COUNT; z++) {
        a.set([-S / 2 + x * step, -S / 2 + y * step, -S / 2 + z * step], i * 3); i++;
      }
  for (; i < COUNT; i++) a.set([rand(-S / 2, S / 2), rand(-S / 2, S / 2), rand(-S / 2, S / 2)], i * 3);
  return a;
}

/* PHASE 2 — VOICE : layered sound-wave ribbons */
function genWave(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  const RIB = 5;
  for (let i = 0; i < COUNT; i++) {
    const r = i % RIB;
    const t = (i / COUNT) * Math.PI * 4;
    const x = -3.4 + (i / COUNT) * 6.8;
    const env = Math.sin(Math.PI * (i / COUNT));
    const y = env * 1.6 * Math.sin(t * 2.4 + r * 1.3) + (r - 2) * 0.22;
    const z = (r - 2) * 0.5 + env * 0.4 * Math.cos(t * 3.1);
    a.set([x, y, z], i * 3);
  }
  return a;
}

/* PHASE 3 — NEURAL CORE : noisy sphere with orbital rings */
function genNeural(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    if (i % 6 === 0) {
      const ang = Math.random() * Math.PI * 2;
      const ring = Math.floor(Math.random() * 3);
      const R = 2.6 + ring * 0.35;
      const tilt = ring * 0.7;
      a.set([R * Math.cos(ang), R * Math.sin(ang) * Math.sin(tilt), R * Math.sin(ang) * Math.cos(tilt)], i * 3);
    } else {
      const u = Math.random(), v = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
      const R = 1.7 + Math.pow(Math.random(), 3) * 0.5;
      a.set([R * Math.sin(ph) * Math.cos(th), R * Math.sin(ph) * Math.sin(th), R * Math.cos(ph)], i * 3);
    }
  }
  return a;
}

const VERT = `
  attribute vec3 aPos1; attribute vec3 aPos2; attribute vec3 aPos3;
  attribute float aSeed;
  uniform float uMorph, uTime, uVel, uSize;
  varying float vSeed;

  vec3 pick(float m){
    vec3 p01 = mix(position, aPos1, smoothstep(0.,1.,clamp(m,0.,1.)));
    vec3 p12 = mix(aPos1, aPos2, smoothstep(0.,1.,clamp(m-1.,0.,1.)));
    vec3 p23 = mix(aPos2, aPos3, smoothstep(0.,1.,clamp(m-2.,0.,1.)));
    vec3 p = p01;
    p = mix(p, p12, step(1., m));
    p = mix(p, p23, step(2., m));
    return p;
  }
  void main(){
    vSeed = aSeed;
    vec3 p = pick(uMorph);
    float n = sin(uTime*1.2 + aSeed*40.) * .03;
    p += normalize(p + .001) * (n + uVel * aSeed * .9);
    p.x += sin(uTime*.6 + aSeed*20.)*.02;
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_PointSize = uSize * (aSeed*.8+.6) * (300. / -mv.z) / 100. * 3.2;
    gl_Position = projectionMatrix * mv;
  }`;

const FRAG = `
  uniform vec3 uC0,uC1,uC2,uC3; uniform float uMorph;
  varying float vSeed;
  void main(){
    float d = length(gl_PointCoord - .5);
    if(d > .5) discard;
    float glow = smoothstep(.5,.05,d);
    vec3 col = mix(uC0,uC1, clamp(uMorph,0.,1.));
    col = mix(col,uC2, clamp(uMorph-1.,0.,1.));
    col = mix(col,uC3, clamp(uMorph-2.,0.,1.));
    col += vSeed*.15;
    gl_FragColor = vec4(col, glow*.85);
  }`;

const MorphScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(genPhone(), 3));
    geo.setAttribute('aPos1', new THREE.BufferAttribute(genLattice(), 3));
    geo.setAttribute('aPos2', new THREE.BufferAttribute(genWave(), 3));
    geo.setAttribute('aPos3', new THREE.BufferAttribute(genNeural(), 3));
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) seeds[i] = Math.random();
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uVel: { value: 0 },
      uSize: { value: window.innerWidth < 800 ? 2.2 : 2.8 },
      uC0: { value: new THREE.Color('#FF6B4A') },
      uC1: { value: new THREE.Color('#FFB347') },
      uC2: { value: new THREE.Color('#8B7CFF') },
      uC3: { value: new THREE.Color('#4AD8C7') },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: VERT,
      fragmentShader: FRAG,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* mouse parallax + render loop */
    let mX = 0, mY = 0, tX = 0, tY = 0, velSm = 0;
    const onMouse = (e: MouseEvent) => {
      mX = e.clientX / window.innerWidth - 0.5;
      mY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMouse);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      const v = Math.min(Math.abs((ScrollTrigger as any).getVelocity?.() ?? 0) / 9000, 0.5) || 0;
      velSm += (v - velSm) * 0.08;
      uniforms.uVel.value = velSm;
      tX += (mX - tX) * 0.05; tY += (mY - tY) * 0.05;
      points.rotation.y = t * 0.12 + tX * 0.6 + window.scrollY * 0.0006;
      points.rotation.x = tY * 0.4 + Math.sin(t * 0.2) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* scroll → morph + camera dolly + canvas dimming behind dense sections */
    const triggers: ScrollTrigger[] = [];
    if (!reduced) {
      triggers.push(
        gsap.to(uniforms.uMorph, {
          value: 3, ease: 'none',
          scrollTrigger: { trigger: '.journey', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        }).scrollTrigger!,
        gsap.fromTo(camera.position, { z: 8.5 }, {
          z: 5.8, ease: 'none',
          scrollTrigger: { trigger: '.journey', start: 'top bottom', end: 'bottom top', scrub: 1 },
        }).scrollTrigger!,
        gsap.to(canvas, {
          opacity: 0.28,
          scrollTrigger: { trigger: '#about', start: 'top 70%', end: 'top 20%', scrub: true },
        }).scrollTrigger!,
        gsap.to(canvas, {
          opacity: 0.55,
          scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 30%', scrub: true },
        }).scrollTrigger!,
      );
    } else {
      uniforms.uMorph.value = 3;
    }

    /* async sections (GitHub / Medium) change page height */
    const onContentLoaded = () => ScrollTrigger.refresh();
    window.addEventListener('content-loaded', onContentLoaded);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('content-loaded', onContentLoaded);
      triggers.forEach(t => t.kill());
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="gl" ref={canvasRef} />;
};

export default MorphScene;
