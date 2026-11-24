import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminAssessmentsClient from "./AdminAssessmentsClient";
import styles from "./admin.module.css";

export const metadata = {
  title: "Assessment Inbox | OneTime Labs Admin",
  robots: { index: false, follow: false },
};

export default function AssessmentAdminPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>OneTime Labs <span>ADMIN</span></div>
          <nav style={{display:"flex",gap:18,alignItems:"center"}}><Link href="/admin/support">Support Inbox</Link><Link href="/admin"><ArrowLeft size={14} /> Admin dashboard</Link></nav>
        </div>
      </header>
      <div className={styles.shell}>
        <AdminAssessmentsClient />
      </div>
    </main>
  );
}
