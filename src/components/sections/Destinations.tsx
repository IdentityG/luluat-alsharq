"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, TrendingUp } from "lucide-react";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { DESTINATIONS } from "@/lib/constants";

const DEST_IMAGES = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80",
  "/images/destinations/qatar.webp",
  "/images/destinations/kuawit.webp",
  "/images/destinations/bahiren.webp",
];

const DEST_KEYS = ["dubai", "saudi", "qatar", "kuwait", "bahrain"] as const;

export default function Destinations() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="relative py-20 lg:py-28 bg-dark-900 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]
                      bg-brand/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end
                        justify-between gap-6 mb-16">
          <div>
            <FadeIn>
              <Badge dot className="mb-4">{t("destinations.badge")}</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                             text-white leading-tight">
                {t("destinations.title")}
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} direction="right">
            <p className="text-white/50 text-base max-w-sm lg:text-right">
              {t("destinations.subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* Destination Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {DEST_KEYS.map((key, i) => (
            <motion.div
              key={key}
              variants={staggerItem}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer
                          border border-white/10 hover:border-brand/40
                          transition-all duration-400
                          ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <motion.img
                  src={DEST_IMAGES[i]}
                  alt={t(`destinations.${key}.title`)}
                  className="w-full h-full object-cover
                             group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t
                                from-dark-900 via-dark-900/50 to-transparent" />

                {/* Flag badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2
                                glass-dark px-3 py-1.5 rounded-full border border-white/20">
                  <span className="text-xl">{DESTINATIONS[i].flag}</span>
                  <span className="text-white/80 text-xs font-medium">
                    {DESTINATIONS[i].country}
                  </span>
                </div>

                {/* Trending badge */}
                {i === 0 && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5
                                  bg-brand text-dark-900 px-2.5 py-1 rounded-full
                                  text-xs font-bold">
                    <TrendingUp size={11} />
                    Top Pick
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 bg-dark-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2
                                   group-hover:text-brand transition-colors">
                      {t(`destinations.${key}.title`)}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/50 text-sm">
                      <MapPin size={13} className="text-brand" />
                      {DESTINATIONS[i].country}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1.5 justify-end
                                    text-brand text-sm font-bold mb-1">
                      <Briefcase size={13} />
                      {t(`destinations.${key}.jobs`)}
                    </div>
                    <p className="text-white/30 text-xs">Available now</p>
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mt-4 text-brand/70
                             text-sm font-medium opacity-0 group-hover:opacity-100
                             transition-opacity duration-300"
                >
                  View Jobs <ArrowRight size={14} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <Link href={`/${locale}/destinations`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                           border border-brand/40 text-brand font-semibold
                           hover:bg-brand/10 transition-all duration-300"
              >
                {t("common.learn_more")}
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}