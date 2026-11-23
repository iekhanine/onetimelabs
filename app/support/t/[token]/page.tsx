import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {accessTicket} from "@/lib/support";
import CustomerTicket from "../../CustomerTicket";
import styles from "../../support.module.css";
export const metadata:Metadata={title:"Private Support Ticket | OneTime Labs",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function TicketPage({params}:{params:Promise<{token:string}>}){
 const {token}=await params;if(!await accessTicket(token))notFound();
 return <main className={styles.page}><div className={styles.shell}><header className={styles.header}><Link href="/" className={styles.brand}>◈ OneTime Labs</Link><Link href="/support">New request</Link></header><CustomerTicket token={token}/></div></main>;
}