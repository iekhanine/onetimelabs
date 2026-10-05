import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

export function getAssessmentServiceClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function getAssessmentAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function safeAssessmentError(error: unknown) {
  if (error instanceof Error) return error.message.slice(0, 300);
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message || "Unknown error").slice(0, 300);
  }
  return String(error || "Unknown error").slice(0, 300);
}

export type AssessmentAdminAuthorization = {
  user: User | null;
  stage?: "NO_TOKEN" | "AUTH_CONFIG" | "AUTH_VERIFY" | "ADMIN_LOOKUP" | "NOT_AUTHORIZED";
  detail?: string;
};

export async function authorizeAssessmentAdmin(
  db: SupabaseClient,
  request: Request,
): Promise<AssessmentAdminAuthorization> {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return { user: null, stage: "NO_TOKEN", detail: "No bearer token was sent." };

  const auth = getAssessmentAuthClient();
  if (!auth) return { user: null, stage: "AUTH_CONFIG", detail: "Supabase auth client is not configured." };

  let user: User | null = null;
  try {
    const result = await auth.auth.getUser(token);
    if (result.error) return { user: null, stage: "AUTH_VERIFY", detail: safeAssessmentError(result.error) };
    user = result.data.user;
  } catch (error) {
    return { user: null, stage: "AUTH_VERIFY", detail: safeAssessmentError(error) };
  }

  if (!user?.email) {
    return { user: null, stage: "AUTH_VERIFY", detail: "Supabase returned no email for this session." };
  }

  const email = user.email.toLowerCase();
  const envAdmins = (process.env.OTL_ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, "").toLowerCase())
    .filter(Boolean);

  if (envAdmins.includes(email)) return { user };

  try {
    const { data: admin, error } = await db
      .from("admin_users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error) return { user: null, stage: "ADMIN_LOOKUP", detail: safeAssessmentError(error) };
    if (admin) return { user };
  } catch (error) {
    return { user: null, stage: "ADMIN_LOOKUP", detail: safeAssessmentError(error) };
  }

  return { user: null, stage: "NOT_AUTHORIZED", detail: `Signed-in email ${email} is not in the admin allowlist.` };
}
