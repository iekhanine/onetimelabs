# Credential safety and release checklist

## Never put API keys in a ZIP or Git

- Store local secrets only in `.env.local`, which is ignored by Git; **do not upload it**.
- Put production secrets in **Vercel Project Settings → Environment Variables**. Redeploy after changes.
- Use only deliberately public client credentials (e.g. Supabase publishable key) in `NEXT_PUBLIC_` variables. NEVER put service-role keys, Resend API keys, Stripe secret keys, private tokens, or database passwords in `NEXT_PUBLIC_` variables.
- Keep `.env.example` limited to variable names and dummy placeholders.

## Enable commit protection once on your Windows computer

From the repository root (PowerShell):

```powershell
git config core.hooksPath .githooks
python scripts/check_secrets.py
```

The `.githooks/pre-commit` hook scans staged files and blocks common credential patterns, including accidentally staged environment files. **Hooks are local and can be bypassed**, so use protected CI scans as well.

## Export a safe ZIP

```powershell
python scripts/safe_export.py
```

This excludes environment files, private keys, credential JSON, generated folders and previous ZIPs. Always use this instead of zipping the whole project manually.

## If a key was already committed or shared

1. Revoke/rotate it immediately; `.gitignore` does not protect already tracked files or Git history.
2. Remove it from Git tracking with `git rm --cached -- path/to/file`, without deleting the local copy.
3. For a publicly pushed key, consider history cleanup with `git filter-repo` and coordinate a force-push; **rotation is still required**.
4. Enable GitHub secret scanning and push protection (where available). A scan cannot guarantee that every kind of secret is detected.
