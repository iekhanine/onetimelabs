import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Mail,
} from "lucide-react";

import Link from "next/link";

import "./page.css";


// ==========================================================
// DOCUMENTS 001 — PUBLIC DOCUMENT INDEX
// ==========================================================

const documents = [
  {
    id: "SCJ-ROLE-001",
    title: "SC Johnson Role Scope / Misclassification",
    type: "CORRESPONDENCE",
    date: "August 17, 2026",
    description:
      "Email requesting a direct discussion regarding the difference between the position originally accepted and the responsibilities ultimately performed during the SC Johnson engagement.",
    href: "/documents/scj-role-scope",
    icon: Mail,
  },
] as const;


// ==========================================================
// DOCUMENTS 002 — PAGE
// ==========================================================

export default function DocumentsPage() {
  return (
    <main className="documents-shell">
      <section className="documents-panel">

        <header className="documents-header">
          <div>
            <span className="documents-eyebrow">
              OTL // PUBLIC RECORDS
            </span>

            <h1>Documents</h1>

            <p>
              Published correspondence, records, and supporting
              material maintained by OneTime Labs.
            </p>
          </div>

          <Link
            className="documents-back"
            href="/"
          >
            <ArrowLeft size={15} />
            Product Deck
          </Link>
        </header>


        <section className="documents-list">
          {documents.map((document) => {
            const Icon = document.icon;

            return (
              <Link
                className="document-card"
                href={document.href}
                key={document.id}
              >
                <div className="document-card__icon">
                  <Icon
                    size={22}
                    strokeWidth={1.7}
                  />
                </div>

                <div className="document-card__content">
                  <div className="document-card__meta">
                    <span>{document.id}</span>
                    <span>{document.type}</span>
                    <span>{document.date}</span>
                  </div>

                  <h2>{document.title}</h2>

                  <p>{document.description}</p>
                </div>

                <ExternalLink
                  className="document-card__open"
                  size={18}
                />
              </Link>
            );
          })}
        </section>


        <footer className="documents-footer">
          <FileText size={14} />
          <span>ONE TIME LABS // DOCUMENT ARCHIVE</span>
        </footer>
      </section>
    </main>
  );
}
