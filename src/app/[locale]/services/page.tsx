import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title:       t("title"),
    description: t("subtitle"),
  };
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}