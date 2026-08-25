import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page shell">
        <h1>OneTime Labs Privacy Policy</h1>
        <p className="legal-meta">Effective August 6, 2026</p>
        <h2>1. Introduction</h2>
        <p>OneTime Labs develops software products and engineering platforms designed around transparency, ownership, and customer-controlled solutions.</p>
        <h2>2. Information we collect</h2>
        <p>Depending on the product, we may process account information, authentication identifiers, organization memberships, application configuration, licensing records, and customer-created content needed to provide the service.</p>
        <h2>3. Authentication</h2>
        <p>Products may support third-party authentication providers. Authentication data is used to verify identity, maintain secure sessions, and associate users with authorized organizations.</p>
        <h2>4. Customer content</h2>
        <p>Customer content is used to provide the requested product functionality. OneTime Labs does not sell private customer content.</p>
        <h2>5. Licensing information</h2>
        <p>Certain products may process product identifiers, activation records, machine fingerprints, application versions, and license status information for licensing and support.</p>
        <h2>6. Data sharing</h2>
        <p>OneTime Labs does not sell personal information. Information may be shared with infrastructure providers when necessary to operate services or when required by law.</p>
        <h2>7. Contact</h2>
        <p>Questions may be sent to <a href="mailto:support@onetimelabs.net">support@onetimelabs.net</a>.</p>
      </main>
      <SiteFooter />
    </>
  );
}
