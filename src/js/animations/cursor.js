import { gsap } from 'gsap';

export function initCursor() {
  if (window.matchMedia('(max-width: 1024px)').matches) return;

  let cursor = document.querySelector('.js-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'cursor js-cursor';
    document.body.appendChild(cursor);
  }

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const hoverables = 'a, button, .js-highlight-line, [data-cursor-hover]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) cursor.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) cursor.classList.remove('is-hovering');
  });
}
