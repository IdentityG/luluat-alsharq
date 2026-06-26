import type { Metadata } from "next";
import { notFound }               from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages }            from "next-intl/server";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import { locales, type Locale }   from "@/i18n";
import Navbar                     from "@/components/layout/Navbar";
import Footer                     from "@/components/layout/Footer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
});

export const metadata: Metadata = {
  /* ── Base URL for all relative metadata paths ── */
  metadataBase: new URL("https://www.luluatalsharq.com"),

  /* ── Title ── */
  title: {
    default:  "Luluat Alsharq | Foreign Employment Agency Ethiopia",
    template: "%s | Luluat Alsharq",
  },

  /* ── Description ── */
  description:
    "Licensed Ethiopian foreign employment agency. We connect skilled workers with opportunities in Dubai, Saudi Arabia, Qatar, Kuwait and Bahrain. Over 2000+ workers deployed with 98% success rate.",

  /* ── SEO Keywords ── */
  keywords: [
    "Luluat Alsharq",
    "ሉሉአት አልሸርቅ",
    "Ethiopian employment agency",
    "foreign employment Ethiopia",
    "jobs in Dubai for Ethiopians",
    "jobs in Saudi Arabia for Ethiopians",
    "Ethiopian workers Gulf",
    "Qatar jobs Ethiopia",
    "Kuwait jobs Ethiopia",
    "domestic workers agency",
    "hospitality staff recruitment",
    "construction workers Gulf",
    "Ethiopian recruitment agency Addis Ababa",
    "work abroad Ethiopia",
    "Gulf jobs from Ethiopia",
    "employment agency Addis Ababa",
    "Luluat Alsharq Foreign Employment Agent PLC",
  ],

  /* ── Site author & creator ── */
  authors: [{ name: "Luluat Alsharq Foreign Employment Agent PLC" }],
  creator: "Luluat Alsharq",
  publisher: "Luluat Alsharq Foreign Employment Agent PLC",

  /* ── Application name ── */
  applicationName: "Luluat Alsharq",

  /* ── Robots: tell Google to index everything ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Language alternates for SEO ── */
  alternates: {
    canonical: "https://www.luluatalsharq.com/en",
    languages: {
      en: "https://www.luluatalsharq.com/en",
      am: "https://www.luluatalsharq.com/am",
      om: "https://www.luluatalsharq.com/om",
    },
  },

  /* ── OpenGraph (Facebook, LinkedIn, WhatsApp sharing) ── */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.luluatalsharq.com",
    siteName: "Luluat Alsharq",
    title: "Luluat Alsharq | Foreign Employment Agency Ethiopia",
    description:
      "Licensed Ethiopian foreign employment agency connecting skilled workers with opportunities in Dubai, Saudi Arabia, Qatar, Kuwait and Bahrain.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luluat Alsharq - Foreign Employment Agency Ethiopia",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: "Luluat Alsharq | Foreign Employment Agency Ethiopia",
    description:
      "Licensed Ethiopian foreign employment agency. Jobs in Dubai, Saudi Arabia, Qatar, Kuwait & Bahrain.",
    images: ["/images/og-image.jpg"],
  },

  /* ── Google Search Console verification ── */
  verification: {
    google: "53IO3rRVTSm_bA1m5mVye6Qu93kHt9ISecFDUDvimUU",
  },

  /* ── Categorization ── */
  category: "Employment Agency",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  const isEthiopic = locale === "am" || locale === "om";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} ${notoSansEthiopic.variable}
          bg-dark-900 text-white overflow-x-hidden
          antialiased
          ${isEthiopic ? "font-ethiopic" : "font-sans"}
        `}
        suppressHydrationWarning
      >
        {/* Structured data for Google Rich Results */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
