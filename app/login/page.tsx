import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isFieldOwner } from "@/lib/field";
import "./login.css";
export const metadata:Metadata={title:"Private Access | OneTime Labs",robots:{index:false,follow:false}};
export default async function LoginPage(){if(await isFieldOwner())redirect("/field");return <main className="otl-login"><div className="otl-login-glass"><span className="otl-login-mark">OTL / PRIVATE WORKSPACE</span><div className="otl-login-emblem">◈</div><h1>Field Operations.</h1><p>Authorized access only. Sign in with the designated Discord account.</p><Link className="otl-login-button" href="/api/field/auth">Continue with Discord →</Link><small>Identity verified before access is granted.</small></div></main>}