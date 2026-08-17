import { ArrowLeft, Ruler } from "lucide-react";
import { metrologyTools } from "../../lib/metrology/tools";
import "./metrology.css";

export default function MetrologyPage() {
  return (
    <main className="metrology-shell">
      <section className="metrology-panel">
        <header className="metrology-header">
          <div><span>ONETIME LABS // TOOLKIT MODULE</span><h1><Ruler size={20} /> METROLOGY</h1><p>Measurement, calibration, tolerance, uncertainty, and conversion utilities.</p></div>
          <a href="/toolkits"><ArrowLeft size={14} /> TOOLKITS</a>
        </header>
        <div className="metrology-display"><span>INSTRUMENT LIBRARY</span><strong>{String(metrologyTools.length).padStart(2,"0")} TOOLS ONLINE</strong></div>
        <section className="metrology-grid">
          {metrologyTools.map((tool, index) => (
            <a className="metrology-key" href={`/toolkits/metrology/${tool.slug}`} key={tool.slug}>
              <div><span>{tool.category}</span><small>MT-{String(index+1).padStart(2,"0")}</small></div>
              <strong>{tool.name}</strong>
              <p>{tool.description}</p>
              <em>OPEN TOOL →</em>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
