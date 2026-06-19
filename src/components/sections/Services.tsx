"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home, UtensilsCrossed, HardHat,
  HeartPulse, Car, Shield,
  ArrowRight, Sparkles
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SERVICE_ICONS = [
  Home, UtensilsCrossed, HardHat,
  HeartPulse, Car, Shield,
];

const SERVICE_GRADIENTS = [
  "from-emerald-500/15 to-emerald-500/5  border-emerald-500/20  text-emerald-400",
  "from-orange-500/15  to-orange-500/5   border-orange-500/20   text-orange-400",
  "from-yellow-500/15  to-yellow-500/5   border-yellow-500/20   text-yellow-400",
  "from-red-500/15     to-red-500/5      border-red-500/20      text-red-400",
  "from-blue-500/15    to-blue-500/5     border-blue-500/20     text-blue-400",
  "from-purple-500/15  to-purple-500/5   border-purple-500/20   text-purple-400",
];

const HOVER_GLOWS = [
  "hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]",
  "hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)]",
  "hover:shadow-[0_8px_30px_rgba(234,179,8,0.15)]",
  "hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]",
  "hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
  "hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]",
];

const SERVICE_KEYS = [
  "domestic", "hospitality", "construction",
  "healthcare", "drivers", "security",
] as const;

export default function Services() {
  const t      = useTranslations();
  const locale = useLocale();

  return (
    <section className="relative py-20 lg:py-28 bg-dark-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px]
                      bg-brand/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px]
                      bg-brand/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <Badge dot className="mb-4">{t("services.badge")}</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                           text-white mb-5 leading-tight">
              {t("services.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {t("services.subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICE_KEYS.map((key, i) => {
            const Icon = SERVICE_ICONS[i];
            const [from, to, border, iconColor] =
              SERVICE_GRADIENTS[i].split("  ");

            return (
              <motion.div
                key={key}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className={`group relative rounded-2xl p-7 border
                            bg-gradient-to-br ${from} ${to} ${border}
                            ${HOVER_GLOWS[i]} backdrop-blur-sm
                            transition-all duration-400 cursor-pointer overflow-hidden`}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24
                                bg-white/[0.02] rounded-bl-[60px] rounded-tr-2xl" />

                {/* Sparkle on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles size={14} className={iconColor} />
                </motion.div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl mb-5 flex items-center
                                 justify-center bg-white/8 border border-white/10
                                 ${iconColor} group-hover:scale-110
                                 transition-transform duration-300`}>
                  <Icon size={26} />
                </div>

                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-brand
                               transition-colors duration-300">
                  {t(`services.${key}.title`)}
                </h3>

                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  {t(`services.${key}.desc`)}
                </p>

                <div className={`flex items-center gap-2 text-sm font-semibold
                                 ${iconColor} opacity-0 group-hover:opacity-100
                                 translate-y-2 group-hover:translate-y-0
                                 transition-all duration-300`}>
                  {t("common.learn_more")}
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <Link href={`/${locale}/services`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                           border border-brand/40 text-brand font-semibold
                           hover:bg-brand/10 hover:shadow-brand-sm
                           transition-all duration-300"
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