import { submitJobApplication } from '../forms.js';

export function initJobsForm() {
  const form = document.querySelector('.js-jobs-form');
  if (!form) return;

  const textarea = form.querySelector('.js-textarea-omdeg');
  const counter = form.querySelector('.js-char-counter');
  if (textarea && counter) {
    const updateCount = () => {
      counter.textContent = `${textarea.value.length}/150`;
    };
    textarea.addEventListener('input', updateCount);
    updateCount();
  }

  const radios = form.querySelectorAll('input[name="Erfaring"]');
  const conditional = form.querySelector('.js-erfaring-conditional');
  if (radios.length && conditional) {
    const condInput = conditional.querySelector('input, textarea');
    const updateConditional = () => {
      const selected = form.querySelector('input[name="Erfaring"]:checked');
      const showIt = selected?.value === 'JA';
      conditional.style.display = showIt ? '' : 'none';
      if (condInput) {
        if (showIt) {
          condInput.setAttribute('required', '');
        } else {
          condInput.removeAttribute('required');
          condInput.value = '';
        }
      }
    };
    radios.forEach((r) => r.addEventListener('change', updateConditional));
    updateConditional();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = {
      name: fd.get('Navn') || '',
      phone: fd.get('Telefon') || '',
      email: fd.get('E-post') || '',
      age: fd.get('Alder') ? parseInt(fd.get('Alder'), 10) : null,
      about: fd.get('Om deg selv') || '',
      has_experience: fd.get('Erfaring') === 'JA',
      experience_details: fd.get('Type erfaring') || null,
      social_handles: fd.get('Sosiale medier') || '',
      desired_roles: fd.getAll('Rolle'),
    };

    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;

    try {
      await submitJobApplication(data);
      window.location.href = '/';
    } catch (err) {
      console.error('Job application failed:', err);
      if (submit) submit.disabled = false;
    }
  });
}
