import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let cleanup = null;

export function initVideoBGrow() {
  if (cleanup) {
    cleanup();
    cleanup = null;
  }

  const section = document.querySelector('.js-videob-section');
  const frame = document.querySelector('.js-videob-frame');
  if (!section || !frame) return;

  const lerp = (a, b, t) => a + (b - a) * t;

  const update = (progress) => {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    frame.style.width = `${lerp(0, sw, progress)}px`;
    frame.style.height = `${lerp(0, sh, progress)}px`;
  };

  update(0);

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: false,
    scrub: 1,
    onUpdate: (self) => update(self.progress),
  });

  const onResize = () => update(trigger.progress);
  window.addEventListener('resize', onResize);

  cleanup = () => {
    window.removeEventListener('resize', onResize);
    trigger.kill();
  };
}
