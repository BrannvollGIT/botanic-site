import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let cleanup = null;

export function initHero() {
  if (cleanup) {
    cleanup();
    cleanup = null;
  }

  const lines = document.querySelectorAll('.js-hero-line');
  lines.forEach((line, i) => {
    line.style.transitionDelay = `${0.066 + i * 0.066}s`;
    requestAnimationFrame(() => line.classList.add('is-visible'));
  });

  const heroSection = document.querySelector('.js-hero-section');
  const pillVideo = document.querySelector('.js-hero-pill-video');
  const pillTarget = document.querySelector('.js-hero-pill-target');
  if (!heroSection || !pillVideo || !pillTarget) return;

  const fadeEls = [
    { el: document.querySelector('.js-hero-fade-1'), start: 0.30, end: 0.65 },
    { el: document.querySelector('.js-hero-fade-2'), start: 0.55, end: 0.95 },
  ].filter((f) => f.el);

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  const update = (progress) => {
    const tr = pillTarget.getBoundingClientRect();
    const sw = window.innerWidth;
    const sh = window.innerHeight;

    pillVideo.style.left = `${lerp(0, tr.left, progress)}px`;
    pillVideo.style.top = `${lerp(0, tr.top, progress)}px`;
    pillVideo.style.width = `${lerp(sw, tr.width, progress)}px`;
    pillVideo.style.height = `${lerp(sh, tr.height, progress)}px`;
    pillVideo.style.borderRadius = `${lerp(0, 50, progress)}%`;

    fadeEls.forEach(({ el, start, end }) => {
      el.style.opacity = clamp01((progress - start) / (end - start));
    });
  };

  const onScroll = () => {
    const scrollY = window.lenis ? window.lenis.scroll : window.scrollY;
    const progress = clamp01(scrollY / window.innerHeight);
    update(progress);
  };

  const onResize = () => onScroll();

  update(0);

  const trigger = ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: false,
  });

  if (window.lenis) {
    window.lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('resize', onResize);

  cleanup = () => {
    if (window.lenis) window.lenis.off('scroll', onScroll);
    else window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    trigger.kill();
  };
}
