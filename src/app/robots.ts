import type { MetadataRoute } from "next";

/**
 * Tells search engine crawlers which pages to index.
 * Allows all crawlers to access the entire site and points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.luluatalsharq.com/sitemap.xml",
    host: "https://www.luluatalsharq.com",
  };
}
