import {redirect} from "next/navigation";
import type {Metadata} from "next";
import {isFieldOwner} from "@/lib/field";
import FieldDashboard from "./FieldDashboard";
import "./field.css";
export const metadata:Metadata={title:"Field Operations | OneTime Labs",robots:{index:false,follow:false}};
export default async function FieldPage(){if(!await isFieldOwner())redirect("/login");return <FieldDashboard/>;}