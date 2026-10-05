import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/assessment-report/"],
    },
    sitemap: "https://onetimelabs.net/sitemap.xml",
  };
}
