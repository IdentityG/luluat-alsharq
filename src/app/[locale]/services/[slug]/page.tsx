import { Metadata }         from "next";
import { notFound }         from "next/navigation";
import { getTranslations }  from "next-intl/server";
import ServiceDetailClient  from "./ServiceDetailClient";
import { SERVICES_DATA, SERVICE_LABELS, SERVICE_DESC }
  from "@/lib/services-data";

export function generateStaticParams() {
  const locales = ["en", "am", "om"];
  const slugs   = SERVICES_DATA.map((s) => s.slug);
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as "en" | "am" | "om";
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };

  return {
    title:       SERVICE_LABELS[service.slug][loc],
    description: SERVICE_DESC[service.slug][loc],
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const service  = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}