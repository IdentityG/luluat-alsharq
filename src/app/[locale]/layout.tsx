import type { Metadata } from "next";
import { notFound }               from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages }            from "next-intl/server";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import { locales, type Locale }   from "@/i18n";
import Navbar                     from "@/components/layout/Navbar";
import Footer                     from "@/components/layout/Footer";
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
  title: {
    default:  "Luluat Alsharq | Foreign Employment Agency Ethiopia",
    template: "%s | Luluat Alsharq",
  },
  description:
    "Licensed Ethiopian foreign employment agency. We connect skilled workers with opportunities in Dubai, Saudi Arabia, Qatar, Kuwait and Bahrain.",
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
