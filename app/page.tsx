import "./page.css";

interface Product {
  name: string;
  description: string;
  url: string;
  status: string;
  category: string;
}

const products: Product[] = [
  {
    name: "OTLES",
    description:
      "Engineering documentation and standards platform that allows organizations to create, manage, and share controlled technical documentation.",
    url: "https://otles.onetimelabs.net",
    status: "Active",
    category: "Platform",
  },
  {
    name: "PCCR",
    description:
      "Printer Compliance & Configuration Reporter for enterprise print environments.",
    url: "https://pccr.onetimelabs.net",
    status: "Active",
    category: "Enterprise Software",
  },
  {
    name: "OTL Licensing",
    description:
      "Software licensing, activation, and entitlement platform designed for managing product access.",
    url: "https://licensing.onetimelabs.net",
    status: "Active",
    category: "Platform",
  },
  {
    name: "Printer Toolkit",
    description:
      "Utilities for enterprise printer administration and troubleshooting.",
    url: "#",
    status: "Research",
    category: "Labs",
  },
  {
    name: "Discord Infrastructure",
    description:
      "Automation, moderation, and infrastructure tools for online communities.",
    url: "#",
    status: "Research",
    category: "Labs",
  },
];

export default function Home() {
  return (
    <main className="page">

      <header className="hero">

        <p className="eyebrow">
          ONETIMELABS.NET
        </p>

        <h1>
          OneTime Labs
        </h1>

        <p className="lead">
          Professional software built from real operational experience.
        </p>

        <p className="intro">
          OneTime Labs creates practical software platforms for IT
          professionals, operations teams, and technical organizations.
          Every product begins as a solution to a real-world problem
          before becoming something we share with others.
        </p>

        <div className="heroActions">

          <a
            href="https://otles.onetimelabs.net"
            className="primaryButton"
            target="_blank"
            rel="noopener noreferrer"
          >
            See It In Action
          </a>

          <a
            href="/alpha"
            className="secondaryButton"
          >
            Apply for Alpha
          </a>

        </div>

      </header>


      <section className="platform">

        <h2>
          The OneTime Labs Platform
        </h2>

        <p>
          OneTime Labs provides secure software platforms for
          engineering organizations, technical teams, and enterprise
          environments.
        </p>

        <p>
          A OneTime Labs account allows authorized users to access
          applications, manage organization memberships, and work
          within secure application workspaces.
        </p>

        <p>
          Authentication is used to verify user identity and provide
          controlled access to authorized services, documentation,
          licensing systems, and operational tools.
        </p>

      </section>


      <section className="philosophy">

        <h2>
          Our Philosophy
        </h2>

        <p>
          We believe professional software should be transparent,
          maintainable, and available without forcing recurring
          subscriptions. Whenever practical, our products are designed
          to be purchased once, deployed where you need them,
          and owned by the people who use them.
        </p>

      </section>


      <section>

        <div className="section-header">

          <h2>
            Products
          </h2>

          <span>
            Active and in-development software projects from OneTime Labs.
          </span>

        </div>


        <div className="projects">

          {products.map((product) => (

            <a
              key={product.name}
              href={product.url}
              className="card"
              target={
                product.url.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel="noopener noreferrer"
            >

              <div className="cardTop">

                <span className="category">
                  {product.category}
                </span>


                <span
                  className={`status ${
                    product.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                  }`}
                >
                  {product.status}
                </span>

              </div>


              <h3>
                {product.name}
              </h3>


              <p>
                {product.description}
              </p>


              <div className="cardFooter">

                <span>
                  Open Project
                </span>

                <span>
                  →
                </span>

              </div>

            </a>

          ))}

        </div>

      </section>


      <section className="authentication">

        <h2>
          Account Access
        </h2>

        <p>
          OneTime Labs uses secure authentication to verify user
          identity and provide access to authorized applications.
          Users may be assigned to organizations and workspaces
          based on their permissions.
        </p>

        <p>
          OneTime Labs does not sell personal information or use
          account data for advertising purposes.
        </p>

      </section>


      <footer>

        <div>

          <a href="/privacy">
            Privacy Policy
          </a>

          {" | "}

          <a href="/terms">
            Terms of Service
          </a>

        </div>


        <span>
          I had an idea once.
        </span>


        <span>
          © 2026 OneTime Labs
        </span>

      </footer>


    </main>
  );
}