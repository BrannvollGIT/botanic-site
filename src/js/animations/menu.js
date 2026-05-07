export function initMenu() {
  const menu = document.querySelector('.js-menu');
  const button = document.querySelector('.js-menu-button');
  const openLabel = button?.querySelector('.js-menu-button-open');
  const closeLabel = button?.querySelector('.js-menu-button-close');
  const links = menu?.querySelectorAll('.js-menu-stagger') ?? [];
  if (!menu || !button) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    button.classList.toggle('is-open', open);
    if (openLabel) openLabel.style.opacity = open ? '0' : '1';
    if (closeLabel) closeLabel.style.opacity = open ? '1' : '0';
    if (open) {
      links.forEach((link, i) => {
        link.style.transitionDelay = `${0.1 + i * 0.07}s`;
        requestAnimationFrame(() => link.classList.add('is-visible'));
      });
    } else {
      links.forEach((link) => {
        link.style.transitionDelay = '0s';
        link.classList.remove('is-visible');
      });
    }
  };

  button.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(!menu.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}
