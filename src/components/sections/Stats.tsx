"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, Globe, Clock, TrendingUp } from "lucide-react";
import Counter from "@/components/animations/Counter";
import FadeIn from "@/components/animations/FadeIn";
import { staggerContainer, staggerItem } from "@/lib/animations";

const ICONS = [Users, Globe, Clock, TrendingUp];
const COLORS = [
  "from-brand/20 to-brand/5",
  "from-blue-500/20 to-blue-500/5",
  "from-purple-500/20 to-purple-500/5",
  "from-amber-500/20 to-amber-500/5",
];
const ICON_COLORS = [
  "text-brand",
  "text-blue-400",
  "text-purple-400",
  "text-amber-400",
];
const BORDER_COLORS = [
  "border-brand/20",
  "border-blue-500/20",
  "border-purple-500/20",
  "border-amber-500/20",
];

const STATS = [
  { value: 2000, suffix: "+", key: "hero.stats_workers" },
  { value: 5,    suffix: "+", key: "hero.stats_countries" },
  { value: 15,    suffix: "+", key: "hero.stats_years" },
  { value: 98,   suffix: "%", key: "hero.stats_success" },
];

export default function Stats() {
  const t = useTranslations();

  return (
    <section className="relative py-12 bg-dark-900 overflow-hidden">
      {/* Divider line glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2
                      h-px bg-gradient-to-r from-transparent via-brand/40
                      to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative rounded-2xl p-6 sm:p-8 text-center
                            bg-gradient-to-br ${COLORS[i]}
                            border ${BORDER_COLORS[i]}
                            backdrop-blur-sm overflow-hidden group`}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                transition-opacity duration-500 bg-white/[0.02]
                                rounded-2xl" />

                <div className={`inline-flex w-12 h-12 rounded-xl mb-4
                                 items-center justify-center
                                 bg-white/5 border border-white/10
                                 ${ICON_COLORS[i]}`}>
                  <Icon size={22} />
                </div>

                <div className={`text-4xl sm:text-5xl font-black mb-2 ${ICON_COLORS[i]}`}>
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>

                <p className="text-white/60 text-sm font-medium">
                  {t(stat.key)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2
                      h-px bg-gradient-to-r from-transparent via-brand/20
                      to-transparent" />
    </section>
  );
}