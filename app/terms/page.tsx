export default function TermsPage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "40px",
        lineHeight: "1.7",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #ddd",
          marginBottom: "32px",
          paddingBottom: "20px",
        }}
      >
        <h1>
          OneTime Labs Terms of Service
        </h1>

        <p>
          Effective Date: August 6, 2026
        </p>
      </header>


      <Section title="1. Agreement">
        <p>
          By accessing or using OneTime Labs services,
          you agree to these Terms of Service.
        </p>
      </Section>


      <Section title="2. Use of Services">
        <p>
          OneTime Labs provides software tools designed
          to help organizations manage engineering,
          documentation, licensing, and operational
          workflows.
        </p>

        <p>
          Users agree to use OneTime Labs services only
          for lawful purposes.
        </p>
      </Section>


      <Section title="3. Accounts">
        <p>
          Users are responsible for maintaining the
          security of their accounts and protecting
          authentication credentials.
        </p>
      </Section>


      <Section title="4. Ownership">
        <p>
          OneTime Labs software, trademarks, documentation,
          and intellectual property remain the property of
          OneTime Labs unless otherwise agreed.
        </p>
      </Section>


      <Section title="5. Customer Data">
        <p>
          Customers retain ownership of content they create
          and store using OneTime Labs services.
        </p>

        <p>
          OneTime Labs uses customer data only as necessary
          to provide requested services.
        </p>
      </Section>


      <Section title="6. Service Changes">
        <p>
          OneTime Labs may update, improve, or modify
          services as products evolve.
        </p>
      </Section>


      <Section title="7. Contact">
        <p>
          Questions regarding these Terms may be sent to:
        </p>

        <p>
          support@onetimelabs.net
        </p>
      </Section>

    </main>
  );
}


function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: "36px",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}