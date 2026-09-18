import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://onetimelabs.net";

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/vendor-migration`, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/managed-print-services`, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/consulting`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/custom-development`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/software`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/creator-tools`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/experience`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/contribute`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/invest`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/tvm`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/products/otles`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/products/roffle`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/products/tasks`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/toolkits`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
