import { Download, FileText, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

/* ==========================================================
   INVESTOR NAV 001
   Prominent investor-only navigation shown beneath Store chrome
   ========================================================== */

export default function InvestorNav() {
  return (
    <nav className="investor-nav" aria-label="Investor navigation">
      <div className="store-shell investor-nav-inner">
        <div className="investor-nav-label">
          <span>INVESTORS</span>
          <strong>OneTime Labs</strong>
        </div>

        <div className="investor-nav-links">
          <NavLink to="/business" end>
            <LayoutDashboard size={14} />
            Overview
          </NavLink>
          <NavLink to="/business/plan">
            <FileText size={14} />
            Business Plan
          </NavLink>
          <NavLink to="/business/plan?export=1" className="investor-nav-export">
            <Download size={14} />
            Export PDF
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
