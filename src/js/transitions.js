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
            const hash = window.location.hash;
            let targetY = 0;
            if (hash && hash.length > 1) {
              try {
                const el = next.container.querySelector(hash);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const currentScroll = lenis ? lenis.scroll : window.scrollY;
                  targetY = rect.top + currentScroll;
                }
              } catch (e) {
                /* invalid selector — fall back to top */
              }
            }
            window.scrollTo(0, targetY);
            if (lenis) lenis.scrollTo(targetY, { immediate: true });
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
