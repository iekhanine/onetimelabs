import Link from "next/link";
import ContentEditorStart from "../ContentEditorStart";
import styles from "../admin-home.module.css";
export const metadata={title:"Website Copy Editor | OneTime Labs Admin",robots:{index:false,follow:false}};
export default function AdminContent(){return <main className={styles.page}><header className={styles.top}><div><Link href="/admin"><strong>OneTime Labs</strong> / ADMIN</Link></div><nav><Link href="/admin">Dashboard</Link><Link href="/admin/support">Support Inbox</Link></nav></header><ContentEditorStart/></main>}