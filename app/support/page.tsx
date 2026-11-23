import type {Metadata} from "next";
import Link from "next/link";
import SupportForm from "./SupportForm";
import styles from "./support.module.css";
export const metadata:Metadata={title:"Help Desk & Remote IT Support | OneTime Labs",description:"Request technical support from OneTime Labs. Open a ticket, receive a private tracking link, and arrange attended remote assistance if needed."};
export default function SupportPage(){return <main className={styles.page}>
 <header className={styles.header}><div className={styles.headerInner}><Link href="/" className={styles.brand}><span className={styles.brandMark}>◈</span> OneTime Labs</Link><div className={styles.headerRight}><span className={styles.portalLabel}>SERVICE PORTAL</span><Link href="/">Home</Link></div></div></header>
 <div className={styles.shell}>
 <div className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><strong>Support</strong><span>/</span><strong>New request</strong></div>
 <div className={styles.pageHeading}><div><span className={styles.kicker}>SERVICE DESK</span><h1>New support request</h1></div><span className={styles.requestType}>Incident / General inquiry</span></div>
 <div className={styles.layout}><section className={styles.panel}><div className={styles.panelHeading}><h2>Request details</h2><p>Fields marked <span className={styles.required}>*</span> are required.</p></div><SupportForm/></section>
 <aside className={styles.side}><div className={styles.sideCard}><h3>Ticket process</h3><div className={styles.step}><span>01</span><p>Submit your request</p></div><div className={styles.step}><span>02</span><p>Receive a private tracking link by email</p></div><div className={styles.step}><span>03</span><p>Reply to your technician and follow updates</p></div></div>
 <div className={styles.sideCard}><h3>Remote assistance</h3><p>When needed, your technician can arrange an attended Splashtop SOS session. You approve the connection.</p><a href="https://sos.splashtop.com" target="_blank" rel="noopener noreferrer">Splashtop SOS instructions ↗</a></div></aside></div>
 <footer className={styles.foot}><span>© {new Date().getFullYear()} OneTime Labs</span><Link href="/contact">Contact</Link></footer>
 </div></main>}
