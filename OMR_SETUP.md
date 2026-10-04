# OMR setup

1. Copy `.env.example` to `.env.local` and enter the existing Supabase Project URL and publishable key.
2. In Supabase SQL Editor, run `sql/006_omr_audio_auth.sql`. This creates `omr_characters`, `omr_rants`, the public `omr-audio` Storage bucket, and RLS policies.
3. In Supabase Authentication > Providers > Google, enable Google and enter the Google OAuth Client ID and secret.
4. In Google Cloud OAuth, add the Supabase callback URL shown by Supabase's Google provider screen.
5. In Supabase Authentication URL Configuration, add `http://localhost:3000/auth/callback` and the production callback URL as allowed redirect URLs.
6. Run `npm install` then `npm run dev`.
7. Visit `/omr/login` and sign in once. In Supabase Authentication > Users copy that user's UUID.
8. Create/assign a character in SQL, e.g.:
   `insert into public.omr_characters(name,slug,bio,avatar_url,owner_id) values ('Walter','walter','Retired. Irritated. Correct about everything.','/omr/ep1.jpg','USER-UUID');`
9. The contributor can now upload at `/omr/upload`; public profile is `/omr/character/walter`.

Audio is stored in Supabase Storage bucket `omr-audio`; only its path and rant metadata are stored in Postgres.
