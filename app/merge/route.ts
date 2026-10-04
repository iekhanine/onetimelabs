import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // This utility is intentionally localhost/development-only.
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  const mergeDir = path.join(process.cwd(), "local-tools", "merge");

  try {
    const [html, css, js] = await Promise.all([
      readFile(path.join(mergeDir, "index.html"), "utf8"),
      readFile(path.join(mergeDir, "merge.css"), "utf8"),
      readFile(path.join(mergeDir, "merge.js"), "utf8"),
    ]);

    // Inline the assets so /merge is a self-contained local page and nothing
    // under public/ exposes the tool on a production deployment.
    const document = html
      .replace(
        '<link rel="stylesheet" href="./merge.css" />',
        `<style>${css.replace(/<\/style/gi, "<\\/style")}</style>`,
      )
      .replace(
        '<script src="./merge.js"></script>',
        `<script>${js.replace(/<\/script/gi, "<\\/script")}</script>`,
      );

    return new Response(document, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Unable to load local merge tool", error);
    return new Response("Local merge tool files are missing.", { status: 500 });
  }
}
