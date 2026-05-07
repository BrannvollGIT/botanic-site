export function initHighlights() {
  const highlights = document.querySelectorAll('.js-highlight');
  highlights.forEach((h) => {
    const trigger = h.querySelector('.js-highlight-line');
    const desc = h.querySelector('.js-highlight-description');
    if (!trigger || !desc) return;

    trigger.addEventListener('click', () => {
      const isOpen = h.classList.toggle('is-open');
      if (isOpen) {
        desc.style.height = `${desc.scrollHeight}px`;
      } else {
        desc.style.height = '0px';
      }
    });
  });
}
