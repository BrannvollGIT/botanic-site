import { submitNewsletterSignup } from '../forms.js';

export function initNewsletterForm() {
  const form = document.querySelector('.js-newsletter-form');
  if (!form) return;

  const errorEl = form.querySelector('.js-newsletter-error');
  const successEl = form.querySelector('.js-newsletter-success');

  const showMessage = (el) => {
    [errorEl, successEl].forEach((e) => e?.classList.remove('is-visible'));
    el?.classList.add('is-visible');
  };
  const clearMessages = () => {
    [errorEl, successEl].forEach((e) => e?.classList.remove('is-visible'));
  };

  form.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', clearMessages);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = (fd.get('E-post') || '').trim();
    const phone = (fd.get('Telefon') || '').trim();

    if (!email && !phone) {
      showMessage(errorEl);
      return;
    }

    const data = {
      email: email || null,
      phone: phone || null,
    };

    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;

    try {
      await submitNewsletterSignup(data);
      form.reset();
      showMessage(successEl);
    } catch (err) {
      console.error('Newsletter signup failed:', err);
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
