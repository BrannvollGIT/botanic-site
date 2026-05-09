let cleanup = null;

export function initVideoBGrow() {
  if (cleanup) {
    cleanup();
    cleanup = null;
  }

  const section = document.querySelector('.js-videob-section');
  const bg = document.querySelector('.js-videob-bg');
  const frame = document.querySelector('.js-videob-frame');
  const overlay = document.querySelector('.js-videob-overlay');
  const highlights = document.querySelector('.js-highlights-section');
  if (!section || !bg || !frame || !overlay || !highlights) return;

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  const update = () => {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;
    const lastHighlight = highlights.querySelector('.js-highlight:last-of-type');
    const endBottom = lastHighlight
      ? lastHighlight.getBoundingClientRect().bottom
      : highlights.getBoundingClientRect().bottom;

    const showBg = sectionTop <= 0 && endBottom > 0;

    if (showBg) {
      bg.style.display = 'flex';
      const progress = clamp01(-sectionTop / sh);
      frame.style.width = `${lerp(0, sw, progress)}px`;
      frame.style.height = `${lerp(0, sh, progress)}px`;
      overlay.style.opacity = clamp01((progress - 0.8) / 0.2);
    } else {
      bg.style.display = 'none';
    }
  };

  update();

  const onScroll = () => update();
  const onResize = () => update();

  if (window.lenis) {
    window.lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('resize', onResize);

  cleanup = () => {
    if (window.lenis) window.lenis.off('scroll', onScroll);
    else window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };
}
