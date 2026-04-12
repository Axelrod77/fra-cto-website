import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fra-cto.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/quick-scan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/quick-scan/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/express-interest`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
