"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardList, FileSearch, UserCheck,
  GraduationCap, Plane, CheckCircle2
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

const STEP_ICONS = [
  ClipboardList, FileSearch, UserCheck,
  GraduationCap, Plane, CheckCircle2,
];

const STEP_COLORS = [
  { icon: "text-brand",    bg: "bg-brand/15    border-brand/30",    line: "bg-brand"    },
  { icon: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30", line: "bg-blue-400" },
  { icon: "text-purple-400",bg:"bg-purple-500/15 border-purple-500/30",line:"bg-purple-400"},
  { icon: "text-amber-400",bg: "bg-amber-500/15 border-amber-500/30",line: "bg-amber-400"},
  { icon: "text-rose-400", bg: "bg-rose-500/15  border-rose-500/30", line: "bg-rose-400" },
  { icon: "text-teal-400", bg: "bg-teal-500/15  border-teal-500/30", line: "bg-teal-400" },
];

const STEP_KEYS = [
  "step1","step2","step3","step4","step5","step6"
] as const;

export default function Process() {
  const t   = useTranslations();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden
                        bg-gradient-to-b from-dark-800 to-dark-900">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <Badge dot className="mb-4">{t("process.badge")}</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                           text-white mb-5 leading-tight">
              {t("process.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {t("process.subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0
                          w-px bg-white/8 -translate-x-1/2" />

          {/* Animated progress line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0
                       w-px bg-gradient-to-b from-brand via-brand/50
                       to-transparent -translate-x-1/2"
          />

          <div className="space-y-8 lg:space-y-0">
            {STEP_KEYS.map((key, i) => {
              const Icon    = STEP_ICONS[i];
              const color   = STEP_COLORS[i];
              const isLeft  = i % 2 === 0;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative lg:flex lg:items-center lg:mb-16
                              ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`lg:w-[45%] ${isLeft ? "lg:pr-12" : "lg:pl-12"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`group glass rounded-2xl p-6 border
                                  border-white/8 hover:border-brand/25
                                  transition-all duration-300 relative overflow-hidden`}
                    >
                      {/* Step number watermark */}
                      <div className="absolute -bottom-3 -right-2 text-[80px]
                                      font-black text-white/[0.025] leading-none
                                      select-none">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center
                                         justify-center border flex-shrink-0
                                         ${color.bg} ${color.icon}
                                         group-hover:scale-110 transition-transform`}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs font-bold
                                        uppercase tracking-widest mb-1">
                            Step {String(i + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-white font-bold text-lg mb-2
                                         group-hover:text-brand transition-colors">
                            {t(`process.${key}.title`)}
                          </h3>
                          <p className="text-white/50 text-sm leading-relaxed">
                            {t(`process.${key}.desc`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex w-[10%] justify-center
                                  items-center relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: i * 0.15 + 0.3, type: "spring" }}
                      className={`w-10 h-10 rounded-full border-4 border-dark-900
                                  flex items-center justify-center
                                  ${color.bg} shadow-lg`}
                    >
                      <div className={`w-3 h-3 rounded-full ${color.line}`} />
                    </motion.div>
                  </div>

                  {/* Empty side (desktop) */}
                  <div className="hidden lg:block lg:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}