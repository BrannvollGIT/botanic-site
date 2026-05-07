import barba from '@barba/core';
import { gsap } from 'gsap';
import { initPage } from './page.js';

export function initTransitions(lenis) {
  try {
    barba.init({
      transitions: [
        {
          name: 'fade',
          leave({ current }) {
            return gsap.to(current.container, {
              autoAlpha: 0,
              duration: 0.5,
              ease: 'power2.in',
            });
          },
          enter({ next }) {
            window.scrollTo(0, 0);
            if (lenis) lenis.scrollTo(0, { immediate: true });
            return gsap.fromTo(
              next.container,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }
            );
          },
          after() {
            initPage();
          },
        },
      ],
    });
  } catch (err) {
    console.error('[barba] init failed, page transitions disabled:', err);
  }
}
