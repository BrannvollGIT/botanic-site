import '../css/tailwind.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { runPreloader } from './animations/preloader.js';
import { initHeader } from './animations/header.js';
import { initCursor } from './animations/cursor.js';
import { initMenu } from './animations/menu.js';
import { initPage } from './page.js';
import { initTransitions } from './transitions.js';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

window.lenis = lenis;

async function safe(label, fn) {
  try {
    await fn();
  } catch (err) {
    console.error(`[init] ${label} failed:`, err);
  }
}

(async () => {
  await safe('preloader', runPreloader);
  await safe('header', initHeader);
  await safe('cursor', initCursor);
  await safe('menu', initMenu);
  await safe('page', initPage);
  await safe('transitions', () => initTransitions(lenis));
})();
