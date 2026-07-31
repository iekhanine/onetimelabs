import "./page.css";

interface Project {
  name: string;
  description: string;
  url: string;
  status: string;
  category: string;
}

const projects: Project[] = [
  {
    name: "OTLES",
    description: "OneTime Labs Engineering Standards.",
    url: "https://otles.onetimelabs.net",
    status: "Active Development",
    category: "Engineering Standard",
  },
  {
    name: "PCCR",
    description: "Printer Compliance & Configuration Reporter.",
    url: "https://pccr.onetimelabs.net",
    status: "Active Development",
    category: "Enterprise Software",
  },
  {
    name: "OTL Licensing",
    description: "Software licensing platform.",
    url: "https://licensing.onetimelabs.net",
    status: "Active Development",
    category: "Platform",
  },
  {
    name: "UnfilteredLog",
    description: "Anonymous writing platform.",
    url: "http://www.unfilteredlog.com",
    status: "Planning",
    category: "Research",
  },
  {
    name: "Printer Toolkit",
    description: "Enterprise printer utilities.",
    url: "#",
    status: "Planning",
    category: "Research",
  },
  {
    name: "Discord Infrastructure",
    description: "Automation and community tooling.",
    url: "#",
    status: "Planning",
    category: "Research",
  },
];

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">ONETIMELABS.NET</p>

        <h1>OneTime Labs</h1>

        <p className="lead">
          Engineering software built from real operational problems.
        </p>
      </header>

      <section className="projects">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            className="card"
            target={project.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <div className="cardTop">
              <span className="category">
                {project.category}
              </span>

              <span className="status">
                {project.status}
              </span>
            </div>

            <h2>{project.name}</h2>

            <p>{project.description}</p>

            <div className="cardFooter">
              <span>Open Project</span>

              <span>→</span>
            </div>
          </a>
        ))}
      </section>

      <footer>
        <span>Engineering software. Built deliberately.</span>

        <span>© 2026 OneTime Labs</span>
      </footer>
    </main>
  );
}