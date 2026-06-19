import { Metadata }        from "next";
import { getTranslations } from "next-intl/server";
import DestinationsClient  from "./DestinationsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "destinations" });
  return {
    title:       t("title"),
    description: t("subtitle"),
  };
}

export default function DestinationsPage() {
  return <DestinationsClient />;
}