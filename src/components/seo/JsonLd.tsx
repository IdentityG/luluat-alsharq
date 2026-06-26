import { COMPANY } from "@/lib/constants";

/**
 * JSON-LD structured data for the business.
 * This helps Google understand that Luluat Alsharq is an "Employment Agency"
 * and can display rich results (address, phone, ratings, etc.) in search.
 */

export interface JsonLdProps {
  locale: string;
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: COMPANY.fullName,
    alternateName: [COMPANY.name, COMPANY.nameAm],
    url: "https://www.luluatalsharq.com",
    logo: "https://www.luluatalsharq.com/icons/logo.png",
    image: "https://www.luluatalsharq.com/images/og-image.jpg",
    description:
      "Licensed Ethiopian foreign employment agency connecting skilled workers with opportunities in Dubai, Saudi Arabia, Qatar, Kuwait and Bahrain. Over 2000+ workers deployed with 98% success rate.",
    foundingDate: COMPANY.established,
    founder: {
      "@type": "Person",
      name: COMPANY.manager,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kera Sufi Tower, 3rd Floor, Office No. 305",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.0054,
      longitude: 38.7468,
    },
    telephone: COMPANY.phone1,
    email: COMPANY.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY.phone1,
        contactType: "customer service",
        areaServed: ["ET", "AE", "SA", "QA", "KW", "BH"],
        availableLanguage: ["English", "Amharic", "Oromo", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: COMPANY.phone2,
        contactType: "customer service",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
    ],
    serviceType: [
      "Foreign Employment Agency",
      "Domestic Worker Recruitment",
      "Hospitality Staff Recruitment",
      "Construction Worker Recruitment",
      "Healthcare Worker Recruitment",
      "Professional Driver Recruitment",
      "Security Guard Recruitment",
    ],
    knowsLanguage: ["en", "am", "om", "ar"],
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2000",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    alternateName: COMPANY.fullName,
    url: "https://www.luluatalsharq.com",
    inLanguage: ["en", "am", "om"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.luluatalsharq.com/en/services?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
