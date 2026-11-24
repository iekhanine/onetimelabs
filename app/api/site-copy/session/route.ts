import {isOtlAdmin} from "@/lib/admin-auth";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request){
 const admin=await isOtlAdmin(request);
 return Response.json({admin},{headers:{"Cache-Control":"no-store"}});
}
