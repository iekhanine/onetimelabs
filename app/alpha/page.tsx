import "./alpha.css";

export default function AlphaPage() {
  return (
    <main className="alpha-page">

      <div className="alpha-backdrop" />

      <div className="alpha-dialog">

        <div className="alpha-badge">
          COMING SOON
        </div>

        <h1>
          OTLES Alpha
        </h1>

        <p>
          We're putting the finishing touches on the first public
          alpha release.
        </p>

        <p>
          When applications open, you'll be able to request access,
          receive a license, and begin exploring OTLES before its
          public release.
        </p>

        <div className="alpha-actions">

          <a
            href="/"
            className="secondaryButton"
          >
            Back to OneTime Labs
          </a>

          <a
            href="https://otles.onetimelabs.net"
            className="primaryButton"
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch OTLES
          </a>

        </div>

        <small>
          Applications are expected to open soon.
        </small>

      </div>

    </main>
  );
}