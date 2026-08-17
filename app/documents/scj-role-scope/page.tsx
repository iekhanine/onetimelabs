import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Mail,
} from "lucide-react";

import Link from "next/link";

import "../page.css";


// ==========================================================
// EMAIL 001 — SC JOHNSON ROLE SCOPE RECORD
// ==========================================================

export default function ScjRoleScopePage() {
  return (
    <main className="documents-shell">
      <article className="documents-panel email-record">

        <header className="email-record__header">
          <div>
            <span className="documents-eyebrow">
              SCJ-ROLE-001 // CORRESPONDENCE
            </span>

            <h1>
              SC Johnson Role Scope / Misclassification
            </h1>

            <p>
              Request for discussion regarding the difference
              between the position originally accepted and the
              responsibilities ultimately performed.
            </p>
          </div>

          <Link
            className="documents-back"
            href="/documents"
          >
            <ArrowLeft size={15} />
            Documents
          </Link>
        </header>


        <section className="email-record__metadata">
          <div>
            <Mail size={14} />
            <span>TO</span>
            <strong>Rohit</strong>
          </div>

          <div>
            <CalendarDays size={14} />
            <span>DATE</span>
            <strong>August 17, 2026</strong>
          </div>

          <div>
            <FileText size={14} />
            <span>RECORD</span>
            <strong>SCJ-ROLE-001</strong>
          </div>
        </section>


        <section className="email-record__body">
          <p>Hello Rohit,</p>

          <p>
            I wanted to respond because, after reviewing the
            position I was originally hired to perform and
            comparing it with the responsibilities I ultimately
            assumed at SC Johnson, I believe there is a
            significant discrepancy that warrants a serious
            discussion.
          </p>

          <p>
            The role I accepted did not include software
            development, server configuration, systems
            administration, or enterprise infrastructure
            responsibilities. Nevertheless, at SC Johnson&apos;s
            request, I designed and developed a web application
            to support operational needs.
          </p>

          <p>
            Ironically, I recently built a mail-parsing
            application that has made it considerably easier
            for me to compile and review the correspondence
            documenting the work I performed during my
            engagement.
          </p>

          <p>
            Software development, however, was only one part
            of the expansion of my responsibilities.
          </p>

          <p>
            I was also not hired to function as a server
            administrator, participate extensively in Change
            Management activities, configure and administer
            enterprise systems, or assume a number of the
            other technical responsibilities that were
            ultimately assigned to me.
          </p>

          <p>
            My prior experience made me capable of performing
            that work, and I did perform it. However, being
            capable of doing work is not the same as having
            been hired, classified, or compensated to perform
            it.
          </p>

          <p>
            When I compare the original position and
            expectations communicated to me with the work I
            was actually asked to perform, the difference is
            substantial.
          </p>

          <p>
            I have retained documentation that allows me to
            reconstruct that progression, including
            correspondence regarding projects, technical
            responsibilities, Change Management activities,
            infrastructure work, software development, and
            other requests made of me during my engagement.
          </p>

          <p>
            I believe it would be in everyone&apos;s best
            interest for us to have a direct conversation
            about this before I consider what further steps
            may be appropriate.
          </p>

          <p>
            I would prefer to resolve the matter professionally
            and directly.
          </p>

          <p>
            Thank you,
            <br />
            Ivan Khanine
          </p>
        </section>


        <footer className="documents-footer">
          <FileText size={14} />
          <span>
            ONE TIME LABS // PUBLIC RECORD // SCJ-ROLE-001
          </span>
        </footer>
      </article>
    </main>
  );
}
