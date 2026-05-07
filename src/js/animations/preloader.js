import { gsap } from 'gsap';

export function runPreloader() {
  return new Promise((resolve) => {
    const el = document.querySelector('.js-preloader');
    if (!el) return resolve();

    const countEl = el.querySelector('.js-preloader-count');
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = 'none';
        resolve();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countEl) countEl.textContent = String(Math.floor(counter.value)).padStart(2, '0') + '%';
      },
    })
      .to(el, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.2');
  });
}
