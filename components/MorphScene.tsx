import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneState } from '../lib/sceneState';

gsap.registerPlugin(ScrollTrigger);
// Mobile address bars show/hide as the user scrolls, firing resize events
// that would otherwise make ScrollTrigger re-measure mid-scroll and jump.
ScrollTrigger.config({ ignoreMobileResize: true });

const COUNT = 22000;
const FOV = 50;
const CAM_Z = 7;

function rand(a: number, b: number) { return a + Math.random() * (b - a); }

/* ---- small 3D value noise (CPU, one-time) ---- */
function hash(x: number, y: number, z: number) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const s = (t: number) => t * t * (3 - 2 * t);
  const u = s(xf), v = s(yf), w = s(zf);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  return l(
    l(l(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), l(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
    l(l(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), l(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
    w,
  );
}
/* soft fbm: a few large lumps, like a drop of black liquid */
function fbm(x: number, y: number, z: number) {
  let a = 0, f = 0.9, amp = 0.6;
  for (let o = 0; o < 3; o++) {
    a += (noise3(x * f + 31.7, y * f + 7.3, z * f + 19.1) - 0.5) * amp;
    f *= 2.1; amp *= 0.45;
  }
  return a;
}
const CORE_R = 1.45;
function coreRadius(nx: number, ny: number, nz: number) {
  return CORE_R * (1 + 0.16 * fbm(nx, ny, nz));
}

/* PHASE 0 — THE CORE : particles sit on the glossy object's surface so the
   mesh can hand off to them without a visible jump */
function genCore(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const u = Math.random(), v = Math.random();
    const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
    const nx = Math.sin(ph) * Math.cos(th), ny = Math.sin(ph) * Math.sin(th), nz = Math.cos(ph);
    const R = coreRadius(nx, ny, nz) + 0.02;
    a.set([nx * R, ny * R, nz * R], i * 3);
  }
  return a;
}

/* PHASE 1 — PHONE : thin rounded slab shell (the Android years) */
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

/* PHASE 2 — LATTICE : 3D grid cube (cross-platform structure) */
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

/* PHASE 3 — VOICE : layered sound-wave ribbons */
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

/* PHASE 4 — NETWORK : noisy sphere with orbital rings */
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
  attribute vec3 aPos1, aPos2, aPos3, aPos4;
  attribute float aSeed;
  uniform float uMorph, uTime, uVel, uSize, uBack;
  varying float vSeed;

  vec3 pick(float m){
    vec3 p = mix(position, aPos1, smoothstep(0.,1.,m));
    p = mix(p, aPos2, smoothstep(1.,2.,m));
    p = mix(p, aPos3, smoothstep(2.,3.,m));
    p = mix(p, aPos4, smoothstep(3.,4.,m));
    return p;
  }
  void main(){
    vSeed = aSeed;
    vec3 p = mix(pick(uMorph), position, uBack);
    float n = sin(uTime*1.2 + aSeed*40.) * .03;
    p += normalize(p + .001) * (n + uVel * aSeed * .9);
    p.x += sin(uTime*.6 + aSeed*20.)*.02;
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_PointSize = uSize * (aSeed*.8+.6) * (300. / -mv.z) / 100. * 3.2;
    gl_Position = projectionMatrix * mv;
  }`;

const FRAG = `
  uniform vec3 uC0,uC1,uC2,uC3,uC4; uniform float uMorph, uBack, uAlpha;
  varying float vSeed;
  void main(){
    float d = length(gl_PointCoord - .5);
    if(d > .5) discard;
    float glow = smoothstep(.5,.05,d);
    vec3 col = mix(uC0,uC1, smoothstep(0.,1.,uMorph));
    col = mix(col,uC2, smoothstep(1.,2.,uMorph));
    col = mix(col,uC3, smoothstep(2.,3.,uMorph));
    col = mix(col,uC4, smoothstep(3.,4.,uMorph));
    col = mix(col, uC0, uBack);
    col += vSeed*.15;
    gl_FragColor = vec4(col, glow*.85*uAlpha);
  }`;

/* glossy dark core: ridged icosphere, near-black physical material; only the
   lights put glints on it, like lacquer in a dark room */
function buildCore() {
  const geo = new THREE.IcosahedronGeometry(1, 72);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const R = coreRadius(v.x, v.y, v.z);
    pos.setXYZ(i, v.x * R, v.y * R, v.z * R);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x04050a,
    roughness: 0.26,
    metalness: 0.0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 0.045,
    transparent: true,
    opacity: 0,
  });
  return new THREE.Mesh(geo, mat);
}

const MorphScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 820;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    /* a faint room reflection keeps the lacquer continuous between the lights */
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = CAM_Z;

    /* the core sits centre-right of the hero on desktop, centred on mobile */
    const visH = 2 * CAM_Z * Math.tan((FOV / 2) * Math.PI / 180);
    const visW = visH * (window.innerWidth / window.innerHeight);
    const homeX = mobile ? 0 : visW * 0.17;
    const homeY = mobile ? 1.6 : 0.1;
    const baseScale = mobile ? 0.36 : 0.92;

    const group = new THREE.Group();
    scene.add(group);
    const core = buildCore();
    group.add(core);

    /* lights: two strong rims from behind draw thin bright contours, a weak
       coral fill from below, and an orbiting white key for a travelling glint */
    const key = new THREE.PointLight(0xffffff, 14, 30, 2);
    const rim = new THREE.DirectionalLight(0x8b7cff, 3.2);
    rim.position.set(-5, 2.5, -2.5);
    const cool = new THREE.DirectionalLight(0x4ad8c7, 2.6);
    cool.position.set(5, 3.5, -2);
    const fill = new THREE.DirectionalLight(0xff6b4a, 0.45);
    fill.position.set(1.5, -4, 2);
    scene.add(key, rim, fill, cool);

    /* particles share the group so the hand-off lines up with the core */
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(genCore(), 3));
    geo.setAttribute('aPos1', new THREE.BufferAttribute(genPhone(), 3));
    geo.setAttribute('aPos2', new THREE.BufferAttribute(genLattice(), 3));
    geo.setAttribute('aPos3', new THREE.BufferAttribute(genWave(), 3));
    geo.setAttribute('aPos4', new THREE.BufferAttribute(genNeural(), 3));
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) seeds[i] = Math.random();
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uVel: { value: 0 },
      uAlpha: { value: 0 },
      uBack: { value: 0 },
      uSize: { value: (mobile ? 2.2 : 2.8) * renderer.getPixelRatio() },
      uC0: { value: new THREE.Color('#E4E6EF') },
      uC1: { value: new THREE.Color('#FF6B4A') },
      uC2: { value: new THREE.Color('#FFB347') },
      uC3: { value: new THREE.Color('#8B7CFF') },
      uC4: { value: new THREE.Color('#4AD8C7') },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexShader: VERT, fragmentShader: FRAG,
    });
    const points = new THREE.Points(geo, mat);
    group.add(points);

    /* entrance once the preloader leaves */
    const enter = { value: reduced ? 1 : 0 };
    const onAppReady = () => {
      if (reduced) return;
      gsap.to(enter, { value: 1, duration: 2.2, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo(group.scale, { x: 0.6, y: 0.6, z: 0.6 }, { x: baseScale, y: baseScale, z: baseScale, duration: 2.4, ease: 'power3.out' });
    };
    group.scale.setScalar(baseScale);
    if (sceneState.ready) onAppReady();
    window.addEventListener('app-ready', onAppReady);

    /* pointer parallax + render loop */
    let mX = 0, mY = 0, tX = 0, tY = 0, velSm = 0;
    const onMove = (e: PointerEvent) => {
      mX = e.clientX / window.innerWidth - 0.5;
      mY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      /* journey progress: core hands off to particles, then each phase forms
         during the first half of its card's slot and holds while it is read */
      const p = sceneState.journey;
      const hand = Math.min(1, p / 0.06);
      const m = Math.max(0, (p - 0.06) / 0.94) * 4;
      const target = Math.min(4, Math.floor(m) + Math.min(1, (m - Math.floor(m)) * 2));
      uniforms.uMorph.value += (target - uniforms.uMorph.value) * 0.1;
      const morph = uniforms.uMorph.value;
      const back = uniforms.uBack.value;
      const home = Math.max(1 - Math.min(1, morph), back);
      uniforms.uAlpha.value = hand * (1 - back) * enter.value;
      (core.material as THREE.MeshPhysicalMaterial).opacity = Math.max(1 - hand, back) * enter.value;
      core.visible = (core.material as THREE.MeshPhysicalMaterial).opacity > 0.01;

      const v = Math.min(Math.abs((ScrollTrigger as any).getVelocity?.() ?? 0) / 9000, 0.5) || 0;
      velSm += (v - velSm) * 0.08;
      uniforms.uVel.value = velSm;

      tX += (mX - tX) * 0.05; tY += (mY - tY) * 0.05;

      /* idle: slow turn, sway, bob; the cursor tilts it further */
      group.rotation.y = t * 0.1 + Math.sin(t * 0.37) * 0.18 + tX * 0.55 + p * 3.0 * (1 - home);
      group.rotation.x = Math.sin(t * 0.29) * 0.1 + tY * 0.35;
      group.rotation.z = Math.sin(t * 0.21) * 0.04 * home;
      group.position.x = homeX * home;
      /* on mobile the morph shapes ride in the upper half, cards sit below */
      group.position.y = homeY * home + (mobile ? 1.4 * (1 - home) : 0) + Math.sin(t * 0.8) * 0.08 * home;
      camera.position.z = CAM_Z - 1.3 * Math.min(1, morph) * (1 - back);

      /* the key light orbits so glints travel across the surface */
      key.position.set(Math.cos(t * 0.5) * 3.6 + group.position.x, 1.2 + Math.sin(t * 0.33) * 1.6, 3.2);
      key.intensity = 12 + Math.sin(t * 1.7) * 4;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // On mobile the address bar hiding/showing during scroll fires plain
    // resize events with the same width but a different height; resizing
    // the renderer/camera for those makes the canvas visibly jump. Only
    // react when the width changes (real rotation/resize) or the height
    // changes by more than a toolbar-sized amount.
    let lastW = window.innerWidth, lastH = window.innerHeight;
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      if (w === lastW && Math.abs(h - lastH) < 150) return;
      lastW = w; lastH = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* canvas dimming behind dense sections; the core returns behind the
       contact headline */
    const triggers: ScrollTrigger[] = [
      /* the canvas sits over the hero so the core occludes the headline; from
         the Journey on it drops behind the content so text stays readable */
      ScrollTrigger.create({
        trigger: '.journey', start: 'top 95%',
        onEnter: () => canvas.classList.add('behind'),
        onLeaveBack: () => canvas.classList.remove('behind'),
      }),
    ];
    if (!reduced) {
      triggers.push(
        gsap.to(canvas, {
          opacity: 0.28,
          scrollTrigger: { trigger: '#about', start: 'top 70%', end: 'top 20%', scrub: true },
        }).scrollTrigger!,
        gsap.to(canvas, {
          opacity: 0.7,
          scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 30%', scrub: true },
        }).scrollTrigger!,
        gsap.to(uniforms.uBack, {
          value: 1, ease: 'none',
          scrollTrigger: { trigger: '#contact', start: 'top 85%', end: 'top 15%', scrub: 0.8 },
        }).scrollTrigger!,
      );
    } else {
      uniforms.uMorph.value = 4;
      sceneState.journey = 1;
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('app-ready', onAppReady);
      triggers.forEach(t => t.kill());
      geo.dispose();
      mat.dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="gl" ref={canvasRef} />;
};

export default MorphScene;
