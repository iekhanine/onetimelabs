import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import ItamWorkspace from './workspace';
import './itam.css';
export const metadata:Metadata={title:'ITAM 30-Day Field Guide & Workspace',description:'A free, reusable 30-day IT Asset Management implementation checklist with technical questions, progress tracking, documentation and private Google-sign-in workspaces.'};
export default function Page(){return <><SiteHeader/><ItamWorkspace/><SiteFooter/></>}
