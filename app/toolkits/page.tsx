import Link from "next/link";
import "./page.css";

const tools = [
  ["MAIL PARSER", "/toolkits/mail-parser"],
  ["ARCADE", "/toolkits/arcade"],
  ["METROLOGY", "/toolkits/metrology"],
  ["IT OPERATIONS", "/toolkits/it-operations"],
  ["HVAC FIELD", "/toolkits/hvac-field"],
  ["NETWORK", "/toolkits/network"],
] as const;

export default function ToolkitsPage() {
  return (
    <main className="toolkits-page">
      <section className="toolkits-shell">
        <Link href="/">← OneTime Labs</Link>
        <h1>Toolkits</h1>
        <div className="toolkits-grid">
          {tools.map(([name, href]) => (
            <Link key={href} href={href} className="toolkits-card">
              <strong>{name}</strong>
              <span>OPEN →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
