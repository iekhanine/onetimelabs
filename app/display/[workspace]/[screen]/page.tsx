import DisplayClient from "../../DisplayClient";
export const metadata={title:"OneTime Display",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{workspace:string;screen:string}>}){const {workspace,screen}=await params;return <DisplayClient workspace={workspace} screen={screen}/>;}