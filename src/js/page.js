import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHero } from './animations/hero.js';
import { initHighlights } from './animations/highlights.js';
import { initReveals } from './animations/reveals.js';

export function initPage() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  initHero();
  initHighlights();
  initReveals();
  ScrollTrigger.refresh();
}
