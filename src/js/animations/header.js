import { gsap } from 'gsap';

export function initHeader() {
  const header = document.querySelector('.js-header-bar');
  if (!header) return;
  gsap.fromTo(
    header,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
  );
}
