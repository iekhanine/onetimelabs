import { ArrowLeft, Gauge, Ruler, ExternalLink } from "lucide-react";
import { metrologyTools } from "../../../lib/metrology/tools";
import "./metrology.css";

export default function MetrologyToolkitPage() {
  return (
    <main className="metro-shell">
      <section className="metro-panel">
        <header className="metro-header">
          <div><span className="metro-kicker">ONETIME LABS // TOOLKIT MODULE</span><h1><Ruler size={20}/> METROLOGY TOOLKIT</h1><p>Measurement, calibration, dimensional, and statistical utilities.</p></div>
          <a href="/" className="metro-back"><ArrowLeft size={14}/> PRODUCT DECK</a>
        </header>
        <div className="metro-display"><div><span>INSTRUMENT LIBRARY</span><strong>SELECT A TOOL</strong></div><div><span>MODULES</span><strong>{String(metrologyTools.length).padStart(2,"0")} ONLINE</strong></div></div>
        <section className="metro-grid">
          {metrologyTools.map((tool, index) => (
            <div className="metro-well" key={tool.slug}>
              <a className={`metro-key metro-key--${tool.accent}`} href={`/toolkits/metrology/${tool.slug}`}>
                <div className="metro-key__top"><span><i/> {tool.category}</span><span>{String(index+1).padStart(2,"0")}</span></div>
                <div className="metro-key__body"><Gauge size={24}/><div><strong>{tool.name}</strong><p>{tool.description}</p></div></div>
                <div className="metro-key__open">OPEN INSTRUMENT <ExternalLink size={11}/></div>
              </a>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
