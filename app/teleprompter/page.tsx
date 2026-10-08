import type { Metadata } from "next";

import { TeleprompterClient } from "./TeleprompterClient";

export const metadata: Metadata = {
  title: "Free Teleprompter | OneTime Labs",
  description:
    "A free, privacy-first browser teleprompter with auto-scroll, timed pacing, voice follow, mirror mode, presenter display, keyboard controls, and local-only scripts.",
};

export default function TeleprompterPage() {
  return <TeleprompterClient />;
}
