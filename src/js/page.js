import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHero } from './animations/hero.js';
import { initVideoBGrow } from './animations/videob.js';
import { initReveals } from './animations/reveals.js';
import { initJobsForm } from './animations/jobsForm.js';
import { initNewsletterForm } from './animations/newsletterForm.js';

export function initPage() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  initHero();
  initVideoBGrow();
  initReveals();
  initJobsForm();
  initNewsletterForm();
  ScrollTrigger.refresh();
}
