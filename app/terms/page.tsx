import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page shell">
        <h1>OneTime Labs Terms of Use</h1>
        <p className="legal-meta">Effective August 6, 2026</p>
        <h2>1. Use of OneTime Labs services</h2>
        <p>You may use OneTime Labs websites and software only in accordance with applicable law and the license or access terms supplied with the applicable product.</p>
        <h2>2. Product availability</h2>
        <p>Products, demonstrations, alpha features, pricing, and availability may change as software is developed and released.</p>
        <h2>3. Accounts and access</h2>
        <p>You are responsible for maintaining the security of credentials and license information associated with your account or organization.</p>
        <h2>4. Intellectual property</h2>
        <p>Unless a product license states otherwise, OneTime Labs retains ownership of its software, branding, documentation, and related intellectual property.</p>
        <h2>5. Contact</h2>
        <p>Questions about these terms may be sent to <a href="mailto:inquiry@onetimelabs.net">inquiry@onetimelabs.net</a>.</p>
      </main>
      <SiteFooter />
    </>
  );
}
