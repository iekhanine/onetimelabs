export default function PrivacyPage() {
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
          OneTime Labs Privacy Policy
        </h1>

        <p>
          Effective Date: August 6, 2026
        </p>
      </header>


      <Section title="1. Introduction">
        <p>
          OneTime Labs ("OneTime Labs", "we", "our", or
          "us") develops software products and engineering
          platforms designed around transparency, ownership,
          and customer-controlled solutions.
        </p>

        <p>
          This Privacy Policy explains how we collect,
          use, protect, and process information when you
          access OneTime Labs websites, applications,
          and services.
        </p>
      </Section>


      <Section title="2. Information We Collect">
        <p>
          Depending on the services you use, OneTime Labs
          may collect:
        </p>

        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Profile information provided by authentication providers</li>
          <li>Authentication identifiers</li>
          <li>Organization and workspace memberships</li>
          <li>Application configuration information</li>
        </ul>

        <p>
          This information allows us to authenticate users,
          provide access-controlled services, and maintain
          application functionality.
        </p>
      </Section>


      <Section title="3. Google Authentication">
        <p>
          OneTime Labs supports authentication through
          Google OAuth.
        </p>

        <p>
          When you sign in with Google, Google may provide
          limited account information such as your name,
          email address, profile image, and authentication
          identifiers.
        </p>

        <p>
          Google account information is used only for:
        </p>

        <ul>
          <li>Verifying your identity</li>
          <li>Creating and maintaining your account</li>
          <li>Maintaining secure login sessions</li>
          <li>Associating you with authorized organizations</li>
        </ul>

        <p>
          OneTime Labs does not sell Google user data,
          use Google user data for advertising, or create
          advertising profiles.
        </p>
      </Section>


      <Section title="4. Organizations and Workspaces">
        <p>
          OneTime Labs applications may use organizations,
          users, roles, and workspaces to control access
          to software and information.
        </p>

        <p>
          Workspace information is used to provide secure
          separation between customers and authorized users.
        </p>
      </Section>


      <Section title="5. Customer Content">
        <p>
          Some OneTime Labs products allow users to create,
          store, and manage documents, engineering standards,
          configurations, and operational information.
        </p>

        <p>
          Customer content is used only to provide the
          requested service. OneTime Labs does not sell,
          publish, or disclose private customer content.
        </p>
      </Section>


      <Section title="6. Licensing Information">
        <p>
          Certain OneTime Labs products may collect licensing
          information such as product identifiers, activation
          records, and software version information.
        </p>

        <p>
          This information is used to validate licenses,
          maintain product security, and provide support.
        </p>
      </Section>


      <Section title="7. Data Security">
        <p>
          OneTime Labs uses reasonable technical safeguards
          including authentication controls, authorization
          policies, encrypted connections, and restricted
          administrative access.
        </p>
      </Section>


      <Section title="8. Data Sharing">
        <p>
          OneTime Labs does not sell personal information.
        </p>

        <p>
          Information may only be shared when required to:
        </p>

        <ul>
          <li>Provide requested services</li>
          <li>Operate required infrastructure</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>


      <Section title="9. Contact">
        <p>
          Questions regarding this Privacy Policy may be
          sent to:
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