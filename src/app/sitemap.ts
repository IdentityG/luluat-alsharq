import type { MetadataRoute } from "next";

const BASE_URL = "https://www.luluatalsharq.com";

const locales = ["en", "am", "om"] as const;

const serviceSlugs = [
  "domestic",
  "hospitality",
  "construction",
  "healthcare",
  "drivers",
  "security",
] as const;

/**
 * Auto-generates a sitemap with all pages × all locales.
 * Google will use this to discover and index every page on the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = ["", "/about", "/services", "/destinations", "/contact", "/apply"];

  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each static page with locale alternates
  for (const page of staticPages) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}${page}`;
    }

    entries.push({
      url: `${BASE_URL}/en${page}`,
      lastModified: now,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: alternates,
      },
    });
  }

  // Generate entries for each service detail page
  for (const slug of serviceSlugs) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}/services/${slug}`;
    }

    entries.push({
      url: `${BASE_URL}/en/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: alternates,
      },
    });
  }

  return entries;
}
