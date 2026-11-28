import DisplayClient from "../../display/DisplayClient";
export const metadata={title:"Display management",robots:{index:false,follow:false}};
export default function Page(){return <DisplayClient workspace="ivan" screen="default" admin/>;}