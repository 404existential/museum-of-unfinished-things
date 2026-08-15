# Museum of Unfinished Things — live backend setup

The frontend is already in GitHub Pages. To make accounts and public submissions shared by everyone, connect a Supabase project.

## 1. Create a Supabase project

Create a free Supabase project at https://supabase.com/ .

## 2. Run the database schema

Open **SQL Editor** in Supabase, create a new query, paste everything from `supabase.sql`, and run it.

## 3. Turn off email confirmation

In Supabase go to **Authentication → Providers → Email** and turn off email confirmation. This museum intentionally uses username + password rather than email addresses.

## 4. Copy the browser credentials

In **Project Settings → API**, copy:

- Project URL
- Publishable/anon key

Put those two values into `config.js`:

```js
window.MOUT_CONFIG = {
  supabaseUrl: 'YOUR_PROJECT_URL',
  supabaseAnonKey: 'YOUR_PUBLISHABLE_OR_ANON_KEY'
};
```

Never put a `service_role` or secret key into `config.js` or GitHub.

## 5. Commit `config.js`

Once the values are filled in, commit the file to `main`. GitHub Pages will redeploy automatically.

## Account model

Accounts intentionally use a username plus password. The site converts the username into an internal synthetic email for Supabase Auth, so contributors never have to enter an email address.

There is no email-based password recovery in this design. Contributors should save their password. A future version can add a recovery-code flow with a server-side function.

## Public archive model

Every artifact submitted by a signed-in contributor is immediately inserted into the public `artifacts` table and is readable by everyone. Contributor names can be shown as Anonymous. The contributor dashboard only provides a way to find that user's own public deposits again.
