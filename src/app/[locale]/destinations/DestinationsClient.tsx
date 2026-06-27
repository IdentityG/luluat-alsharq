"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties }          from "react";
import { useLocale, useTranslations }  from "next-intl";
import Link                            from "next/link";
import { motion, AnimatePresence,
         useScroll, useTransform }     from "framer-motion";
import { gsap }                        from "gsap";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import {
  MapPin, Briefcase, DollarSign,
  Clock, Globe2, Star, ArrowRight,
  ChevronRight, CheckCircle2,
  X, ArrowLeft, ArrowUpRight,
  TrendingUp, Quote,
  Thermometer, Languages,
  Banknote, Plane,
} from "lucide-react";
import Badge   from "@/components/ui/Badge";
import FadeIn  from "@/components/animations/FadeIn";
import Counter from "@/components/animations/Counter";
import {
  DESTINATIONS_DATA,
  type DestinationData,
} from "@/lib/destinations-data";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";
import { cn }      from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Loc = "en" | "am" | "om";

/* ─────────────────────────────────────
   COMPONENT
───────────────────────────────────── */
export default function DestinationsClient() {
  const t      = useTranslations();
  const locale = useLocale() as Loc;

  const heroRef    = useRef<HTMLDivElement>(null);
  const [selected,   setSelected]   = useState<DestinationData | null>(null);
  const [activeTab,  setActiveTab]  = useState<"jobs" | "living" | "requirements">("jobs");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 500], [0, 120]);

  /* ── helpers ─── */
  const gl = (obj: { en: string; am: string; om: string }) =>
    locale === "am" ? obj.am : locale === "om" ? obj.om : obj.en;

  /* ── GSAP hero entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dest-badge",    { y: -25, opacity: 0, duration: 0.5, delay: 0.1 });
      gsap.from(".dest-title",    { y:  50, opacity: 0, duration: 0.7, delay: 0.2 });
      gsap.from(".dest-subtitle", { y:  30, opacity: 0, duration: 0.5, delay: 0.35 });
      gsap.from(".dest-stat",     { y:  25, opacity: 0, duration: 0.4,
                                    stagger: 0.1, delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── GSAP scroll reveals ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-dest").forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── lock body when drawer open ─── */
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const totalJobs = DESTINATIONS_DATA.reduce((a, d) => a + d.totalJobs, 0);

  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          01 · HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center
                   overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900"
      >
        {/* BG parallax */}
        <motion.div style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px]
                          bg-brand/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px]
                          bg-brand/4 rounded-full blur-[100px]" />
        </motion.div>

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
            backgroundSize: "55px 55px",
          }}
        />

        {/* Floating flags */}
        {DESTINATIONS_DATA.map((dest, i) => (
          <motion.div
            key={dest.slug}
            animate={{
              y:       [0, -15 + i * 3, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + i,
              repeat:   Infinity,
              ease:     "easeInOut",
              delay:    i * 0.8,
            }}
            className="absolute text-4xl sm:text-5xl pointer-events-none
                       select-none"
            style={{
              top:   `${15 + i * 14}%`,
              right: `${3 + (i % 2) * 5}%`,
              filter: "drop-shadow(0 0 20px rgba(107,255,60,0.2))",
            }}
          >
            {dest.flag}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto
                        px-4 sm:px-6 lg:px-16 py-24 w-full">
          <div className="max-w-3xl">
            <div className="dest-badge mb-6">
              <Badge dot animate>{t("destinations.badge")}</Badge>
            </div>

            <h1 className="dest-title text-5xl sm:text-6xl lg:text-8xl
                           font-black text-white mb-6 leading-[1.02] tracking-tight">
              {t("destinations.title")}
              <br />
              <span className="text-gradient">
                {locale === "am" ? "ዕድሎች"
                 : locale === "om" ? "Carraalee"
                 : "& Opportunities"}
              </span>
            </h1>

            <p className="dest-subtitle text-white/55 text-lg lg:text-xl
                          leading-relaxed max-w-2xl mb-12">
              {t("destinations.subtitle")}
            </p>

            {/* Hero stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { v: DESTINATIONS_DATA.length, suffix: "", label: { en: "Countries", am: "ሀገሮች", om: "Biyyoota" } },
                { v: totalJobs, suffix: "+",  label: { en: "Total Jobs", am: "ጠቅላላ ስራዎች", om: "Hojii Waliigalaa" } },
                { v: 98, suffix: "%",         label: { en: "Success Rate", am: "የስኬት ምጣኔ", om: "Sadarkaa Milkaa'inaa" } },
                { v: 15,  suffix: "+",         label: { en: "Years Active", am: "ዓመታት ንቁ", om: "Waggaa Hojii" } },
              ].map((s, i) => (
                <div
                  key={i}
                  className="dest-stat glass-brand border border-brand/20
                             rounded-2xl px-6 py-4 text-center"
                >
                  <div className="text-3xl font-black text-gradient">
                    <Counter to={s.v} suffix={s.suffix} />
                  </div>
                  <p className="text-white/45 text-xs mt-0.5">{gl(s.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32
                        bg-gradient-to-t from-dark-900 to-transparent
                        pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════
          02 · DESTINATION CARDS GRID
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          <div className="reveal-dest text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black
                           text-white mb-4">
              {locale === "am" ? "ዋና ዋና መድረሻዎቻችን"
               : locale === "om" ? "Bakkeewwan Ijoo Keenya"
               : "Our Top Destinations"}
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              {locale === "am"
                ? "እያንዳንዱን ሀገር ጠቅ ያድርጉ ለሙሉ ዝርዝሮች — ስራዎች፣ ደሞዝ፣ አኗኗር"
                : locale === "om"
                ? "Biyya tokkoo tokkoo click godhaa bal'ina guutuutiif — hojii, mindaa, jireenya"
                : "Click on each country for full details — jobs, salaries, and living info"}
            </p>
          </div>

          {/* ── Masonry-style Grid ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {DESTINATIONS_DATA.map((dest, i) => (
              <motion.div
                key={dest.slug}
                variants={staggerItem}
                className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <DestinationCard
                  dest={dest}
                  locale={locale}
                  gl={gl}
                  featured={i === 0}
                  onSelect={() => { setSelected(dest); setActiveTab("jobs"); }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 · COMPARISON TABLE
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-dest text-center mb-12">
            <Badge dot className="mb-4">
              {locale === "am" ? "ሀገሮች ማነፃፀሪያ"
               : locale === "om" ? "Biyyoota Madaalluu"
               : "Destination Comparison"}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {locale === "am" ? "ሁሉንም በአንድ ዕይታ"
               : locale === "om" ? "Hundumaasaa Mul'ata Tokkoon"
               : "All at a Glance"}
            </h2>
          </div>

          <div className="reveal-dest overflow-x-auto rounded-2xl
                          border border-white/8">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-dark-700/50">
                  <th className="text-left px-5 py-4 text-white/50
                                 font-semibold uppercase tracking-wide text-xs">
                    {locale === "am" ? "ሀገር"
                     : locale === "om" ? "Biyya"
                     : "Country"}
                  </th>
                  <th className="text-center px-5 py-4 text-white/50
                                 font-semibold uppercase tracking-wide text-xs">
                    {locale === "am" ? "ጠቅላላ ስራዎች"
                     : locale === "om" ? "Hojii Waliigalaa"
                     : "Total Jobs"}
                  </th>
                  <th className="text-center px-5 py-4 text-white/50
                                 font-semibold uppercase tracking-wide text-xs">
                    {locale === "am" ? "ደሞዝ (USD)"
                     : locale === "om" ? "Mindaa (USD)"
                     : "Salary (USD)"}
                  </th>
                  <th className="text-center px-5 py-4 text-white/50
                                 font-semibold uppercase tracking-wide text-xs">
                    {locale === "am" ? "ምንዛሬ"
                     : locale === "om" ? "Maallaqaa"
                     : "Currency"}
                  </th>
                  <th className="text-center px-5 py-4 text-white/50
                                 font-semibold uppercase tracking-wide text-xs">
                    {locale === "am" ? "ቋንቋ"
                     : locale === "om" ? "Afaan"
                     : "Language"}
                  </th>
                  <th className="text-center px-5 py-4 text-white/50
                                 font-semibold uppercase tracking-wide text-xs">
                    {locale === "am" ? "ዝርዝሮች"
                     : locale === "om" ? "Bal'ina"
                     : "Details"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {DESTINATIONS_DATA.map((dest, i) => (
                  <motion.tr
                    key={dest.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={cn(
                      "border-b border-white/5 last:border-0",
                      "hover:bg-white/[0.02] transition-colors"
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{dest.flag}</span>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {gl(dest.label)}
                          </p>
                          <p className="text-white/40 text-xs">{dest.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`font-bold ${dest.color}`}>
                        {dest.totalJobs.toLocaleString()}+
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="text-white/70 text-xs">
                        ${dest.avgSalary.min}–${dest.avgSalary.max}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="text-white/60 text-xs">{dest.currency}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="text-white/60 text-xs">{dest.language}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => { setSelected(dest); setActiveTab("jobs"); }}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-xs font-semibold",
                          "border transition-all duration-200",
                          `bg-gradient-to-br ${dest.gradient}`,
                          dest.borderColor, dest.color
                        )}
                      >
                        {locale === "am" ? "ይመልከቱ"
                         : locale === "om" ? "Ilaali"
                         : "View"}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 · TESTIMONIALS ROW
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-dest text-center mb-12">
            <Badge dot className="mb-4">
              {locale === "am" ? "የሰራተኞቻችን ልምድ"
               : locale === "om" ? "Muuxannoo Hojjattoota Keenya"
               : "Worker Experiences"}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {locale === "am" ? "ሕይወቶቻቸው"
               : locale === "om" ? "Jireenyoota Isaanii"
               : "Their Lives,"}{" "}
              <span className="text-gradient">
                {locale === "am" ? "ቀይረዋቸዋል"
                 : locale === "om" ? "Jijjiiran"
                 : "Transformed"}
              </span>
            </h2>
          </div>

          <div className="reveal-dest grid grid-cols-1 sm:grid-cols-2
                          lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {DESTINATIONS_DATA.map((dest, i) => {
              const tmn = dest.workerTestimonial;
              return (
                <motion.div
                  key={dest.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`group glass rounded-2xl p-5 border
                              ${dest.borderColor}
                              bg-gradient-to-br ${dest.gradient}
                              transition-all duration-300`}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: tmn.rating }).map((_, si) => (
                      <Star key={si} size={12}
                        className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <Quote size={16} className={`${dest.color} opacity-50 mb-2`} />
                  <p className="text-white/70 text-xs leading-relaxed mb-4
                                line-clamp-4">
                    {gl(tmn.text)}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 pt-3
                                  border-t border-white/8">
                    <div className={`w-8 h-8 rounded-full flex items-center
                                     justify-center text-[10px] font-black
                                     bg-gradient-to-br ${dest.gradient}
                                     ${dest.borderColor} border ${dest.color}`}>
                      {tmn.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs">
                        {tmn.name}
                      </p>
                      <p className={`text-[10px] ${dest.color}`}>
                        {gl(dest.label)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05 · FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              `radial-gradient(ellipse at 50% 50%,
               rgba(107,255,60,0.07) 0%, transparent 65%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-16
                        text-center">
          <FadeIn>
            <Badge dot animate className="mb-6">
              {locale === "am" ? "ጉዞዎን ይጀምሩ"
               : locale === "om" ? "Imala Keessan Jalqabaa"
               : "Begin Your Journey"}
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                           text-white mb-6 leading-tight">
              {locale === "am"
                ? "የዕድልዎን ሀገር ለማግኘት"
                : locale === "om"
                ? "Biyya Carraa Keessaniif"
                : "Ready to Find Your"}{" "}
              <span className="text-gradient">
                {locale === "am" ? "ዝግጁ ነዎት?"
                 : locale === "om" ? "Qophii Dha?"
                 : "Destination?"}
              </span>
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-2xl mx-auto">
              {locale === "am"
                ? "ዛሬ ያመልክቱ እና ሉሉአት አልሸርቅ ጉዞዎን ለማቀድ ይረዳዎታል።"
                : locale === "om"
                ? "Har'a iyyadhaa fi Luluat Alsharq imala keessan karoorfachuuf isin gargaara."
                : "Apply today and let Luluat Alsharq guide you to your perfect destination."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/apply`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-10 py-4 rounded-2xl
                             bg-gradient-brand text-dark-900 font-bold text-lg
                             shadow-brand hover:shadow-brand-lg
                             transition-all duration-300"
                >
                  {t("nav.apply")}
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-10 py-4 rounded-2xl
                             glass border border-white/15 text-white font-semibold
                             text-lg hover:border-brand/40 transition-all duration-300"
                >
                  {t("nav.contact")}
                  <ChevronRight size={20} />
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DETAIL DRAWER
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[90]
                         w-full max-w-2xl
                         bg-dark-800 border-l border-white/10
                         overflow-y-auto"
            >
              {/* Hero image */}
              <div className="relative h-56 sm:h-72 overflow-hidden">
                <motion.img
                  src={selected.heroImage}
                  alt={gl(selected.label)}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t
                                from-dark-800 via-dark-800/30 to-transparent" />

                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full
                             bg-dark-900/80 backdrop-blur-sm flex items-center
                             justify-center text-white/70 hover:text-white
                             border border-white/20 transition-colors"
                >
                  <X size={17} />
                </button>

                {/* Back */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 left-4 flex items-center gap-1.5
                             px-3 py-1.5 rounded-full bg-dark-900/80
                             backdrop-blur-sm text-white/70 hover:text-white
                             border border-white/20 text-xs transition-colors"
                >
                  <ArrowLeft size={13} />
                  {locale === "am" ? "ሁሉም" : locale === "om" ? "Hunda" : "All"}
                </button>

                {/* Overlay info */}
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-4xl">{selected.flag}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs
                                          font-bold border
                                          bg-gradient-to-br ${selected.gradient}
                                          ${selected.borderColor} ${selected.color}`}>
                          {selected.totalJobs.toLocaleString()}+ jobs
                        </span>
                      </div>
                      <h2 className="text-white font-black text-3xl sm:text-4xl">
                        {gl(selected.label)}
                      </h2>
                      <p className={`text-sm mt-0.5 ${selected.color}`}>
                        {gl(selected.tagline)}
                      </p>
                    </div>
                    <Link href={`/${locale}/apply`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl
                                   bg-gradient-brand text-dark-900 font-bold
                                   text-sm shadow-brand flex-shrink-0"
                      >
                        {t("nav.apply")}
                        <ArrowUpRight size={15} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer content */}
              <div className="p-5 sm:p-7 space-y-6">

                {/* Quick meta */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Banknote,     label: selected.currency,     sub: locale === "am" ? "ምንዛሬ" : locale === "om" ? "Maallaqaa" : "Currency" },
                    { icon: Languages,    label: selected.language,     sub: locale === "am" ? "ቋንቋ" : locale === "om" ? "Afaan" : "Language" },
                    { icon: Clock,        label: selected.timezone,     sub: locale === "am" ? "ሰዓት ዞን" : locale === "om" ? "Zoom Yeroo" : "Timezone" },
                    { icon: Thermometer,  label: selected.climate,     sub: locale === "am" ? "ወቅት" : locale === "om" ? "Qilleensa" : "Climate" },
                  ].map((m, i) => (
                    <div key={i}
                      className={`p-3 rounded-xl border text-center
                                  bg-gradient-to-br ${selected.gradient}
                                  ${selected.borderColor}`}>
                      <m.icon size={16} className={`${selected.color} mx-auto mb-1`} />
                      <p className="text-white text-xs font-semibold leading-tight">
                        {m.label}
                      </p>
                      <p className="text-white/40 text-[10px]">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-white/65 text-sm leading-relaxed">
                  {gl(selected.description)}
                </p>

                {/* Highlights */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                    {locale === "am" ? "ጥቅሞች"
                     : locale === "om" ? "Faayidaalee"
                     : "Why Work Here"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selected.highlights[locale].map((h, i) => (
                      <div key={i}
                        className="flex items-start gap-2 text-white/65 text-xs">
                        <CheckCircle2
                          size={13}
                          className={`${selected.color} flex-shrink-0 mt-0.5`}
                        />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div className="flex gap-1 p-1 glass rounded-xl mb-5">
                    {(["jobs", "living", "requirements"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-xs font-semibold",
                          "transition-all duration-200 relative",
                          activeTab === tab
                            ? `${selected.color}`
                            : "text-white/40 hover:text-white/70"
                        )}
                      >
                        {activeTab === tab && (
                          <motion.div
                            layoutId="drawer-tab"
                            className={`absolute inset-0 rounded-lg
                                        bg-gradient-to-br ${selected.gradient}
                                        border ${selected.borderColor}`}
                          />
                        )}
                        <span className="relative z-10">
                          {tab === "jobs"
                            ? (locale === "am" ? "ስራዎች" : locale === "om" ? "Hojiwwan" : "Jobs")
                            : tab === "living"
                            ? (locale === "am" ? "አኗኗር" : locale === "om" ? "Jireenya" : "Living")
                            : (locale === "am" ? "መስፈርቶች" : locale === "om" ? "Gaaffilee" : "Requirements")}
                        </span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {/* ── Jobs Tab ── */}
                    {activeTab === "jobs" && (
                      <motion.div
                        key="jobs"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        {selected.jobCategories.map((job, i) => (
                          <div key={i}
                            className={`flex items-center gap-4 p-4 rounded-xl
                                        border bg-gradient-to-br ${selected.gradient}
                                        ${selected.borderColor}`}>
                            <span className="text-2xl flex-shrink-0">{job.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold text-sm truncate">
                                {gl(job.name)}
                              </p>
                              <p className="text-white/50 text-xs">
                                {job.openings}+ {locale === "am" ? "ቦታዎች" : locale === "om" ? "Bakkeewwan" : "positions"}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className={`font-bold text-sm ${selected.color}`}>
                                ${job.salary.min}–${job.salary.max}
                              </p>
                              <p className="text-white/30 text-xs">USD/mo</p>
                            </div>
                          </div>
                        ))}

                        {/* Total */}
                        <div className={`flex justify-between items-center
                                         p-4 rounded-xl border
                                         bg-gradient-to-br ${selected.gradient}
                                         ${selected.borderColor}`}>
                          <span className="text-white/60 text-sm font-medium">
                            {locale === "am" ? "ጠቅላላ ቦታዎች"
                             : locale === "om" ? "Bakkeewwan Waliigalaa"
                             : "Total Positions"}
                          </span>
                          <span className={`font-black text-xl ${selected.color}`}>
                            {selected.totalJobs.toLocaleString()}+
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Living Tab ── */}
                    {activeTab === "living" && (
                      <motion.div
                        key="living"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        {selected.livingInfo[locale].map((row, i) => (
                          <div key={i}
                            className={`p-4 rounded-xl border
                                        bg-gradient-to-br ${selected.gradient}
                                        ${selected.borderColor}`}>
                            <p className="text-white/40 text-xs mb-0.5">
                              {row.label}
                            </p>
                            <p className={`font-semibold text-sm ${selected.color}`}>
                              {row.value}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* ── Requirements Tab ── */}
                    {activeTab === "requirements" && (
                      <motion.div
                        key="requirements"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2.5"
                      >
                        {selected.requirements[locale].map((req, i) => (
                          <div key={i}
                            className={`flex items-start gap-3 p-4 rounded-xl
                                        border bg-gradient-to-br ${selected.gradient}
                                        ${selected.borderColor}`}>
                            <CheckCircle2
                              size={15}
                              className={`${selected.color} flex-shrink-0 mt-0.5`}
                            />
                            <p className="text-white/75 text-sm">{req}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gallery */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                    {locale === "am" ? "ፎቶዎች"
                     : locale === "om" ? "Suuraalee"
                     : "Gallery"}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {selected.galleryImages.map((img, i) => (
                      <motion.img
                        key={i}
                        src={img}
                        alt={`${gl(selected.label)} ${i + 1}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setLightboxImg(img)}
                        className="h-20 w-full object-cover rounded-xl
                                   cursor-pointer border border-white/10
                                   hover:border-brand/40 transition-colors"
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className={`p-5 rounded-2xl border
                                 bg-gradient-to-br ${selected.gradient}
                                 ${selected.borderColor}`}>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: selected.workerTestimonial.rating }).map((_, i) => (
                      <Star key={i} size={12}
                        className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={18} className={`${selected.color} opacity-40 mb-2`} />
                  <p className="text-white/75 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{gl(selected.workerTestimonial.text)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center
                                     justify-center font-black text-sm
                                     bg-gradient-to-br ${selected.gradient}
                                     border ${selected.borderColor} ${selected.color}`}>
                      {selected.workerTestimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">
                        {selected.workerTestimonial.name}
                      </p>
                      <p className={`text-xs ${selected.color}`}>
                        {selected.workerTestimonial.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Apply CTA */}
                <div className="grid grid-cols-2 gap-3 pb-4">
                  <Link href={`/${locale}/apply`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center
                                 gap-2 py-4 rounded-xl bg-gradient-brand
                                 text-dark-900 font-bold text-sm
                                 shadow-brand hover:shadow-brand-lg
                                 transition-all duration-300"
                    >
                      {t("nav.apply")}
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                  <a href={`tel:${COMPANY.phone1}`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center
                                 gap-2 py-4 rounded-xl glass border border-white/15
                                 text-white font-semibold text-sm
                                 hover:border-brand/40 transition-all duration-300"
                    >
                      <Plane size={15} className="text-brand" />
                      {locale === "am" ? "ይደውሉ"
                       : locale === "om" ? "Bilbilaa"
                       : "Call Now"}
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm
                       flex items-center justify-center p-4"
          >
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={lightboxImg}
              alt="Gallery"
              className="max-w-3xl w-full rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full
                         bg-white/10 flex items-center justify-center
                         text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────
   DESTINATION CARD SUB-COMPONENT
───────────────────────────────────── */
function DestinationCard({
  dest, locale, gl, featured, onSelect,
}: {
  dest:     DestinationData;
  locale:   Loc;
  gl:       (obj: { en: string; am: string; om: string }) => string;
  featured: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={onSelect}
      style={{ "--shadow": dest.shadowColor } as CSSProperties}
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer",
        "border transition-all duration-400",
        dest.borderColor,
        `hover:shadow-[0_16px_50px_var(--shadow)]`
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative overflow-hidden",
        featured ? "h-72 sm:h-80" : "h-52 sm:h-60"
      )}>
        <motion.img
          src={dest.heroImage}
          alt={gl(dest.label)}
          className="w-full h-full object-cover
                     group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t
                        from-dark-900 via-dark-900/40 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start
                        justify-between gap-2">
          <div className="flex items-center gap-2 glass-dark px-3 py-1.5
                          rounded-full border border-white/20">
            <span className="text-xl">{dest.flag}</span>
            <span className="text-white/80 text-xs font-semibold">
              {dest.country}
            </span>
          </div>
          {featured && (
            <div className="flex items-center gap-1.5 bg-brand px-2.5 py-1
                            rounded-full text-dark-900 text-xs font-black">
              <TrendingUp size={11} />
              #1 Pick
            </div>
          )}
        </div>

        {/* Job count */}
        <div className="absolute top-4 right-4">
          {!featured && (
            <div className="glass-dark border border-white/20 px-2.5 py-1
                            rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand
                               animate-pulse" />
              <span className="text-white/70 text-xs">
                {dest.totalJobs.toLocaleString()}+
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 sm:p-6 bg-gradient-to-br ${dest.gradient}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className={`font-black text-xl text-white mb-1
                            group-hover:${dest.color} transition-colors`}>
              {gl(dest.label)}
            </h3>
            <p className={`text-xs font-medium ${dest.color}`}>
              {gl(dest.tagline)}
            </p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                           border bg-dark-900/50 ${dest.borderColor} flex-shrink-0`}>
            <Briefcase size={12} className={dest.color} />
            <span className={`text-xs font-bold ${dest.color}`}>
              {dest.totalJobs.toLocaleString()}+
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-white/55">
          <span className="flex items-center gap-1">
            <DollarSign size={11} className={dest.color} />
            ${dest.avgSalary.min}–${dest.avgSalary.max}/mo
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} className={dest.color} />
            {dest.city}
          </span>
          <span className="flex items-center gap-1">
            <Globe2 size={11} className={dest.color} />
            {dest.language}
          </span>
        </div>

        {/* Job categories preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dest.jobCategories.slice(0, 3).map((job, i) => (
            <span key={i}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium",
                "border bg-dark-900/40",
                dest.borderColor, dest.color
              )}>
              {job.icon} {gl(job.name)}
            </span>
          ))}
          {dest.jobCategories.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-[10px]
                             font-medium border border-white/10
                             text-white/40">
              +{dest.jobCategories.length - 3} more
            </span>
          )}
        </div>

        {/* CTA row */}
        <div className={cn(
          "flex items-center gap-2 text-sm font-bold",
          dest.color,
          "group-hover:gap-3 transition-all duration-300"
        )}>
          {locale === "am" ? "ሙሉ ዝርዝሮችን ይመልከቱ"
           : locale === "om" ? "Bal'ina Guutuu Ilaali"
           : "View Full Details"}
          <ArrowRight size={15} />
        </div>
      </div>
    </motion.div>
  );
}
