# Supabase migration

The mailto submission flow is a stand-in. Both forms (`jobs.html` and the
"BLI EN INSIDER"-block on `index.html`) already collect data into objects
shaped for Supabase. To switch over, the only files that need to change are
the two listed below.

## Files to change

### 1. `src/js/supabase-client.js`
Currently exports `null`. Replace with a real client:

```js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

Install: `npm i @supabase/supabase-js`. Add `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` to a `.env` file at project root, and add `.env` to
`.gitignore`.

### 2. `src/js/forms.js`
Replace the `openMailto(...)` calls inside `submitJobApplication` and
`submitNewsletterSignup` with direct Supabase inserts:

```js
import { supabase } from './supabase-client.js';

export async function submitJobApplication(data) {
  const { error } = await supabase.from('job_applications').insert([data]);
  if (error) throw error;
}

export async function submitNewsletterSignup(data) {
  const { error } = await supabase.from('newsletter_subscribers').insert([data]);
  if (error) throw error;
}
```

The mailto helpers, `JOB_LABELS`, `NEWSLETTER_LABELS`, and the recipient
constants can be deleted at that point.

### 3. (Optional) Update `<form action="...">` attributes
`jobs.html` still has `action="mailto:PLACEHOLDER@BOTANIC.NO"` as a fallback
for users with JS disabled. After Supabase is wired, change `action="#"` and
keep the JS submit handler as the only path.

## Database schema

### `job_applications`

| Column              | Type                | Notes                                  |
| ------------------- | ------------------- | -------------------------------------- |
| `id`                | `uuid`              | primary key, default `gen_random_uuid()` |
| `created_at`        | `timestamptz`       | default `now()`                        |
| `name`              | `text`              | not null                               |
| `phone`             | `text`              | not null                               |
| `email`             | `text`              | not null                               |
| `age`               | `int2`              | not null, check `age >= 16 and age <= 99` |
| `about`             | `text`              | not null, check `length(about) <= 150` |
| `has_experience`    | `bool`              | not null                               |
| `experience_details`| `text`              | nullable; required only when `has_experience = true` (enforce in client) |
| `social_handles`    | `text`              | not null                               |
| `desired_roles`     | `text[]`            | not null, default `{}`                 |

### `newsletter_subscribers`

| Column        | Type            | Notes                                   |
| ------------- | --------------- | --------------------------------------- |
| `id`          | `uuid`          | primary key, default `gen_random_uuid()` |
| `created_at`  | `timestamptz`   | default `now()`                         |
| `email`       | `text`          | nullable                                |
| `phone`       | `text`          | nullable                                |

Constraint:

```sql
alter table newsletter_subscribers
  add constraint at_least_one_contact
  check (email is not null or phone is not null);
```

## RLS policies

Both tables should have row-level security enabled with insert-only policies
for the anon role:

```sql
alter table job_applications enable row level security;
create policy "anon can insert" on job_applications
  for insert to anon with check (true);

alter table newsletter_subscribers enable row level security;
create policy "anon can insert" on newsletter_subscribers
  for insert to anon with check (true);
```

No select/update/delete for anon — read access goes through service role
keys only (admin dashboard, scripts, etc).
