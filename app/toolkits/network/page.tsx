import { ArrowLeft, Network } from "lucide-react";
import { networkTools } from "../../lib/network/tools";
import "./network.css";

export default function NetworkPage() {
  return (
    <main className="network-shell">
      <section className="network-panel">
        <header className="network-header">
          <div><span>ONETIME LABS // TOOLKIT MODULE</span><h1><Network size={20} /> NETWORK</h1><p>Addressing, subnetting, transport, performance, and network reference utilities.</p></div>
          <a href="/toolkits"><ArrowLeft size={14} /> TOOLKITS</a>
        </header>
        <div className="network-display"><span>INSTRUMENT LIBRARY</span><strong>{String(networkTools.length).padStart(2,"0")} TOOLS ONLINE</strong></div>
        <section className="network-grid">
          {networkTools.map((tool, index) => (
            <a className="network-key" href={`/toolkits/network/${tool.slug}`} key={tool.slug}>
              <div><span>{tool.category}</span><small>NW-{String(index+1).padStart(2,"0")}</small></div>
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
