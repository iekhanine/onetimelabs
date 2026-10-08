import type { Metadata } from "next";

import { TeleprompterClient } from "../TeleprompterClient";

export const metadata: Metadata = {
  title: "Teleprompter Display | OneTime Labs",
  description: "Clean full-screen teleprompter output for a second display or beam-splitter teleprompter hardware.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeleprompterDisplayPage() {
  return <TeleprompterClient displayMode />;
}
