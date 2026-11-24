import Link from "next/link";
import SupportInboxClient from "../SupportInboxClient";
import styles from "../admin-home.module.css";
export const metadata={title:"Support Inbox | OneTime Labs Admin",robots:{index:false,follow:false}};
export default function SupportAdmin(){return <main className={styles.page}><header className={styles.top}><div><Link href="/admin"><strong>OneTime Labs</strong> / ADMIN</Link></div><nav><Link href="/admin/assessments">Assessment Inbox</Link><Link href="/admin">Dashboard</Link></nav></header><div className={styles.shell}><SupportInboxClient/></div></main>}
