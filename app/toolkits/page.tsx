import {
  ArrowLeft,
  Gamepad2,
  Gauge,
  MailSearch,
  Network,
  Ruler,
  Snowflake,
  Timer,
  Wrench,
} from "lucide-react";
import "./page.css";

const tools = [
  { name: "MAIL PARSER", category: "EMAIL", href: "/mail-parser", description: "Parse raw or copied email into structured message data.", icon: MailSearch },
  { name: "ARCADE", category: "GAMING", href: "/arcade", description: "Games, puzzles, reflex tests, and interactive experiments.", icon: Gamepad2 },
  { name: "METROLOGY", category: "MEASUREMENT", href: "/toolkits/metrology", description: "Calibration, tolerance, uncertainty, conversion, and measurement tools.", icon: Ruler },
  { name: "NETWORK", category: "NETWORKING", href: "/toolkits/network", description: "IP addressing, subnetting, performance, and network reference tools.", icon: Network },
  { name: "METRONOME", category: "TIMING", href: "/toolkits/metronome", description: "A browser-based timing and tempo utility.", icon: Timer },
  { name: "IT OPERATIONS", category: "SYSTEMS", href: "/toolkits/it-operations", description: "Operational utilities for systems, support, and infrastructure work.", icon: Wrench },
  { name: "HVAC FIELD", category: "FACILITIES", href: "/toolkits/hvac-field", description: "Field utilities for HVAC and maintenance workflows.", icon: Snowflake },
];

export default function ToolkitsPage() {
  return (
    <main className="tool-page">
      <div className="tool-shell">
        <a className="tool-back" href="/"><ArrowLeft size={14} /> OneTime Labs</a>
        <p className="tool-kicker">ONETIME LABS // TOOLKITS</p>
        <h1>TOOLKITS</h1>
        <p>Small, focused tools built to solve actual work instead of becoming another platform.</p>
        <section className="toolkit-index-grid">
          {tools.map(({ icon: Icon, ...tool }) => (
            <a className="toolkit-index-card" href={tool.href} key={tool.href}>
              <div><Icon size={22} /><span>{tool.category}</span></div>
              <strong>{tool.name}</strong>
              <p>{tool.description}</p>
              <small>OPEN →</small>
            </a>
          ))}
        </section>
        <div className="tool-actions">
          <a className="tool-action" href="/custom-development/contact"><Gauge size={14} /> Request a Custom Tool</a>
        </div>
      </div>
    </main>
  );
}
