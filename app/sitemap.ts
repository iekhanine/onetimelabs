import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://onetimelabs.net";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products/tvm`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/products/otles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/products/roffle`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/products/tasks`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
