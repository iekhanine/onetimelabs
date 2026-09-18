import type { Metadata } from "next";
import A220AcronymsClient from "./A220AcronymsClient";

export const metadata: Metadata = {
  title: "A220 Acronym Reference | OneTime Labs",
  description: "Private A220 acronym study reference.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function A220Page() {
  return <A220AcronymsClient />;
}
