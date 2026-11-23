import type {Metadata} from "next";
import Link from "next/link";
import SupportForm from "./SupportForm";
import styles from "./support.module.css";
export const metadata:Metadata={title:"Help Desk & Remote IT Support | OneTime Labs",description:"Request technical support from OneTime Labs. Open a ticket, receive a private tracking link, and arrange attended remote assistance if needed."};
export default function SupportPage(){return <main className={styles.page}><div className={styles.shell}>
 <header className={styles.header}><Link href="/" className={styles.brand}>◈ OneTime Labs</Link><Link href="/">Home ↗</Link></header>
 
 <div className={styles.layout}><section className={styles.panel}><div className={styles.panelHeading}><span className={styles.kicker}>OPEN A TICKET</span><h2>How can we help?</h2><p>For business clients and individuals. Fields marked optional can be skipped.</p></div><SupportForm/></section>
 <aside className={styles.side}><div className={styles.sideCard}><span className={styles.kicker}>WHAT HAPPENS NEXT</span><h3>Simple, traceable support.</h3><ol><li>Send a support request.</li><li>Receive a ticket number and private link by email.</li><li>Reply and follow progress from that link.</li><li>Arrange an attended remote session if needed.</li></ol></div><div className={styles.sideCard}><span className={styles.kicker}>REMOTE SUPPORT</span><h3>Splashtop SOS</h3><p>If you need screen-sharing assistance, we'll coordinate a session. You'll run the official Splashtop SOS app and provide a temporary code directly to your technician.</p><a href="https://sos.splashtop.com" target="_blank" rel="noopener noreferrer">Official Splashtop SOS →</a><p className={styles.note}>Never install software or share a session code based on an unsolicited message.</p></div></aside></div>
 <footer className={styles.foot}>OneTime Labs · Secure ticket tracking · <Link href="/contact">General inquiries</Link></footer>
 </div></main>}