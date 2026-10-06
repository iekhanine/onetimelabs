"use client";

import { createClient } from "@/lib/supabase/client";

export default function AdminLogin({ slug }: { slug: string }) {
  async function signIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?next=/${encodeURIComponent(slug)}/admin` },
    });
  }

  return <button className="biz-admin-primary" onClick={() => void signIn()}>Sign in with Google</button>;
}
