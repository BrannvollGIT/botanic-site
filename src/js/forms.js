// TODO Supabase: replace mailto-based submit with Supabase insert calls.
//
//   import { supabase } from './supabase-client.js';
//
// Inside submitJobApplication:
//   const { error } = await supabase.from('job_applications').insert([data]);
//   if (error) throw error;
//
// Inside submitNewsletterSignup:
//   const { error } = await supabase.from('newsletter_subscribers').insert([data]);
//   if (error) throw error;
//
// The `data` shape coming in already matches the expected column names — see
// TODO_SUPABASE.md for the schema.

const JOBS_RECIPIENT = 'hello@botanic.social';
const NEWSLETTER_RECIPIENT = 'hello@botanic.social';

const JOB_LABELS = {
  name: 'Navn',
  phone: 'Telefon',
  email: 'E-post',
  age: 'Alder',
  about: 'Om deg selv',
  has_experience: 'Har erfaring',
  experience_details: 'Type erfaring',
  social_handles: 'Sosiale medier',
  desired_roles: 'Ønsker å jobbe som',
};

const NEWSLETTER_LABELS = {
  email: 'E-post',
  phone: 'Telefon',
};

function formatValue(v) {
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'boolean') return v ? 'Ja' : 'Nei';
  return String(v);
}

function formatBody(data, labels) {
  return Object.entries(data)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${labels[k] || k}: ${formatValue(v)}`)
    .join('\n');
}

function openMailto(recipient, subject, body) {
  const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

export async function submitJobApplication(data) {
  // TODO Supabase: replace mailto with `supabase.from('job_applications').insert([data])`.
  const body = formatBody(data, JOB_LABELS);
  openMailto(JOBS_RECIPIENT, 'Jobbsøknad — Botanic', body);
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export async function submitNewsletterSignup(data) {
  // TODO Supabase: replace mailto with `supabase.from('newsletter_subscribers').insert([data])`.
  const body = formatBody(data, NEWSLETTER_LABELS);
  openMailto(NEWSLETTER_RECIPIENT, 'Insider-påmelding — Botanic', body);
  return new Promise((resolve) => setTimeout(resolve, 800));
}
