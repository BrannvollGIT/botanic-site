import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initReveals() {
  const els = document.querySelectorAll('.js-reveal, .reveal');
  els.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('is-visible'),
    });
  });
}
