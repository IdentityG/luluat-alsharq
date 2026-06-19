"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations }  from "next-intl";
import Link                            from "next/link";
import { motion, AnimatePresence }     from "framer-motion";
import { gsap }                        from "gsap";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import {
  ArrowLeft, ArrowRight, CheckCircle2,
  MapPin, DollarSign, Users, Briefcase,
  ChevronRight, Star, Clock,
  FileText, Award, Phone, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Badge    from "@/components/ui/Badge";
import FadeIn   from "@/components/animations/FadeIn";
import {
  SERVICES_DATA,
  SERVICE_LABELS,
  SERVICE_DESC,
  type ServiceData,
} from "@/lib/services-data";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

type Tab = "requirements" | "responsibilities" | "benefits";

interface Props {
  service: ServiceData;
}

export default function ServiceDetailClient({ service }: Props) {
  const t      = useTranslations();
  const locale = useLocale() as "en" | "am" | "om";

  const [activeTab,    setActiveTab]    = useState<Tab>("requirements");
  const [activeImage,  setActiveImage]  = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [applyOpen,    setApplyOpen]    = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const Icon    = service.icon;
  const label   = SERVICE_LABELS[service.slug][locale];
  const desc    = SERVICE_DESC[service.slug][locale];

  const allImages = [service.image, ...service.galleryImages];

  /* ── GSAP hero entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".detail-badge",    { y: -20, opacity: 0, duration: 0.5 })
        .from(".detail-title",    { y:  40, opacity: 0, duration: 0.6 }, "-=0.2")
        .from(".detail-desc",     { y:  30, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".detail-meta",     { y:  20, opacity: 0, duration: 0.4,
                                    stagger: 0.1 }, "-=0.2")
        .from(".detail-actions",  { y:  20, opacity: 0, duration: 0.4 }, "-=0.1");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── Scroll-triggered sections ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.7,
          scrollTrigger: {
            trigger: el,
            start:   "top 85%",
            once:    true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* related services */
  const related = SERVICES_DATA
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "requirements",     label: "Requirements",     icon: FileText    },
    { id: "responsibilities", label: "Responsibilities", icon: Briefcase   },
    { id: "benefits",         label: "Benefits",         icon: Award       },
  ];

  return (
    <div className="min-h-screen bg-dark-900">

      {/* ══════════════════════════════════════════════
          BREADCRUMB
      ══════════════════════════════════════════════ */}
      <div className="bg-dark-800 border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link
              href={`/${locale}`}
              className="hover:text-brand transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={13} />
            <Link
              href={`/${locale}/services`}
              className="hover:text-brand transition-colors"
            >
              {t("services.title")}
            </Link>
            <ChevronRight size={13} />
            <span className={service.iconColor}>{label}</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative py-16 lg:py-24 overflow-hidden
                   bg-gradient-to-b from-dark-800 to-dark-900"
      >
        {/* Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at 70% 50%,
              ${service.shadowColor} 0%, transparent 60%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12
                          items-center">

            {/* ── Left · Text ──────────────────────────── */}
            <div className="space-y-6">
              {/* Back button */}
              <Link href={`/${locale}/services`}>
                <motion.div
                  whileHover={{ x: -4 }}
                  className="inline-flex items-center gap-2 text-white/50
                             hover:text-brand transition-colors text-sm mb-2"
                >
                  <ArrowLeft size={15} />
                  {t("services.title")}
                </motion.div>
              </Link>

              <div className="detail-badge">
                <Badge dot>{t("services.badge")}</Badge>
              </div>

              {/* Icon + Title */}
              <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center
                                 justify-center flex-shrink-0 border
                                 bg-gradient-to-br ${service.gradient}
                                 ${service.borderColor} ${service.iconColor}`}>
                  <Icon size={32} />
                </div>
                <div>
                  <h1 className={`detail-title text-4xl sm:text-5xl
                                  font-black text-white leading-tight`}>
                    {label}
                  </h1>
                  <p className="detail-desc text-white/55 text-base
                                leading-relaxed mt-3 max-w-lg">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-3">
                <div className="detail-meta flex items-center gap-2
                                glass px-4 py-2 rounded-xl border border-white/10
                                text-white/70 text-sm">
                  <DollarSign size={14} className={service.iconColor} />
                  ${service.salary.min}–${service.salary.max}{" "}
                  {service.salary.currency}/mo
                </div>
                <div className="detail-meta flex items-center gap-2
                                glass px-4 py-2 rounded-xl border border-white/10
                                text-white/70 text-sm">
                  <Users size={14} className={service.iconColor} />
                  {service.openings} openings
                </div>
                <div className="detail-meta flex items-center gap-2
                                glass px-4 py-2 rounded-xl border border-white/10
                                text-white/70 text-sm">
                  <Clock size={14} className={service.iconColor} />
                  Fast Processing
                </div>
                <div className="detail-meta flex items-center gap-2
                                glass px-4 py-2 rounded-xl border border-white/10
                                text-white/70 text-sm">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  Top Rated
                </div>
              </div>

              {/* Destinations */}
              <div className="detail-meta">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                  Available in
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.destinations.map((d) => (
                    <span key={d}
                      className={`px-3 py-1 rounded-full text-xs font-medium
                                  border bg-gradient-to-br ${service.gradient}
                                  ${service.borderColor} ${service.iconColor}`}>
                      <MapPin size={10} className="inline mr-1" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="detail-actions flex flex-wrap gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setApplyOpen(true)}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl
                             bg-gradient-brand text-dark-900 font-bold
                             shadow-brand hover:shadow-brand-lg
                             transition-all duration-300"
                >
                  {t("nav.apply")}
                  <ArrowRight size={17} />
                </motion.button>

                <a href={`tel:${COMPANY.phone1}`}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl
                               glass border border-white/15 text-white font-semibold
                               hover:border-brand/40 transition-all duration-300"
                  >
                    <Phone size={16} className="text-brand" />
                    Call Us
                  </motion.button>
                </a>
              </div>
            </div>

            {/* ── Right · Image Gallery ─────────────────── */}
            <div className="space-y-3">
              {/* Main image */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => { setActiveImage(0); setLightboxOpen(true); }}
                className="relative rounded-2xl overflow-hidden
                           cursor-pointer border border-white/10
                           hover:border-brand/30 transition-colors"
              >
                <img
                  src={allImages[0]}
                  alt={label}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t
                                from-dark-900/40 to-transparent" />
                <div className="absolute bottom-3 right-3
                                bg-dark-900/80 backdrop-blur-sm
                                px-3 py-1.5 rounded-lg text-xs text-white/70">
                  Click to expand
                </div>
              </motion.div>

              {/* Thumbnail row */}
              <div className="grid grid-cols-3 gap-3">
                {service.galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => { setActiveImage(i + 1); setLightboxOpen(true); }}
                    className={`relative rounded-xl overflow-hidden
                                cursor-pointer border transition-colors
                                ${activeImage === i + 1 && lightboxOpen
                                  ? `${service.borderColor}`
                                  : "border-white/10 hover:border-brand/30"
                                }`}
                  >
                    <img
                      src={img}
                      alt={`${label} ${i + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TABS SECTION
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="scroll-reveal">

            {/* Tab buttons */}
            <div className="flex gap-2 mb-8 p-1.5 glass rounded-2xl
                            border border-white/8 w-fit">
              {tabs.map(({ id, label: tabLabel, icon: TabIcon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative flex items-center gap-2 px-5 py-3
                              rounded-xl text-sm font-semibold
                              transition-all duration-300
                              ${activeTab === id
                                ? `${service.iconColor} bg-white/8`
                                : "text-white/50 hover:text-white/80"
                              }`}
                >
                  {activeTab === id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className={`absolute inset-0 rounded-xl
                                  bg-gradient-to-br ${service.gradient}
                                  border ${service.borderColor}`}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <TabIcon size={15} />
                    {tabLabel}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {service[activeTab][locale].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-start gap-3 p-5 rounded-xl
                                bg-gradient-to-br ${service.gradient}
                                border ${service.borderColor}
                                group hover:scale-[1.02] transition-transform`}
                  >
                    <CheckCircle2
                      size={18}
                      className={`${service.iconColor} mt-0.5 flex-shrink-0`}
                    />
                    <p className="text-white/80 text-sm leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SALARY CARD
      ══════════════════════════════════════════════ */}
      <section className="py-8 lg:py-12 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="scroll-reveal">
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
              {/* Salary range */}
              <div className={`col-span-1 p-8 rounded-2xl text-center
                              bg-gradient-to-br ${service.gradient}
                              border ${service.borderColor}`}>
                <DollarSign
                  size={32}
                  className={`${service.iconColor} mx-auto mb-3`}
                />
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                  Monthly Salary
                </p>
                <p className={`text-4xl font-black ${service.iconColor}`}>
                  ${service.salary.min}
                  <span className="text-white/40 text-2xl">–</span>
                  ${service.salary.max}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  {service.salary.currency} per month
                </p>
              </div>

              {/* Openings */}
              <div className="p-8 rounded-2xl text-center glass
                              border border-white/8">
                <Users
                  size={32}
                  className={`${service.iconColor} mx-auto mb-3`}
                />
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                  Open Positions
                </p>
                <p className="text-4xl font-black text-white">
                  {service.openings}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  Available now
                </p>
              </div>

              {/* Destinations count */}
              <div className="p-8 rounded-2xl text-center glass
                              border border-white/8">
                <MapPin
                  size={32}
                  className={`${service.iconColor} mx-auto mb-3`}
                />
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                  Destinations
                </p>
                <p className="text-4xl font-black text-white">
                  {service.destinations.length}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  Countries available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RELATED SERVICES
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="scroll-reveal">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Other <span className="text-gradient">Services</span>
              </h2>
              <Link
                href={`/${locale}/services`}
                className="text-brand text-sm hover:underline
                           flex items-center gap-1"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {related.map((rel) => {
                const RelIcon   = rel.icon;
                const relLabel  = SERVICE_LABELS[rel.slug][locale];
                const relDesc   = SERVICE_DESC[rel.slug][locale];
                return (
                  <motion.div key={rel.slug} variants={staggerItem}>
                    <Link href={`/${locale}/services/${rel.slug}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className={`group p-6 rounded-2xl border
                                    bg-gradient-to-br ${rel.gradient}
                                    ${rel.borderColor}
                                    transition-all duration-300 cursor-pointer`}
                      >
                        <div className={`w-11 h-11 rounded-xl mb-4
                                         flex items-center justify-center
                                         bg-white/8 border border-white/10
                                         ${rel.iconColor}
                                         group-hover:scale-110 transition-transform`}>
                          <RelIcon size={22} />
                        </div>
                        <h3 className="text-white font-bold text-base mb-2
                                       group-hover:text-brand transition-colors">
                          {relLabel}
                        </h3>
                        <p className="text-white/50 text-xs leading-relaxed
                                      line-clamp-2">
                          {relDesc}
                        </p>
                        <div className={`flex items-center gap-1 mt-3 text-xs
                                        font-semibold ${rel.iconColor}`}>
                          Learn more <ChevronRight size={12} />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16
                        text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to Apply for{" "}
              <span className={service.iconColor}>{label}</span>?
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Start your application today. Our team will guide you
              through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setApplyOpen(true)}
                className="flex items-center justify-center gap-2
                           px-8 py-4 rounded-2xl bg-gradient-brand
                           text-dark-900 font-bold shadow-brand
                           hover:shadow-brand-lg transition-all duration-300"
              >
                {t("nav.apply")} <ArrowRight size={17} />
              </motion.button>
              <Link href={`/${locale}/contact`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2
                             px-8 py-4 rounded-2xl glass border border-white/15
                             text-white font-semibold hover:border-brand/40
                             transition-all duration-300"
                >
                  <Phone size={16} className="text-brand" />
                  {t("contact.badge")}
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[200] bg-black/90
                       backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 text-white/60
                           hover:text-white transition-colors"
              >
                <X size={28} />
              </button>

              <img
                src={allImages[activeImage]}
                alt={label}
                className="w-full rounded-2xl"
              />

              {/* Prev / Next */}
              <button
                onClick={() =>
                  setActiveImage((p) =>
                    (p - 1 + allImages.length) % allImages.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2
                           w-10 h-10 rounded-full bg-black/60
                           flex items-center justify-center text-white
                           hover:bg-brand/40 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setActiveImage((p) => (p + 1) % allImages.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2
                           w-10 h-10 rounded-full bg-black/60
                           flex items-center justify-center text-white
                           hover:bg-brand/40 transition-colors"
              >
                <ArrowRight size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-2 rounded-full transition-all duration-300
                                ${i === activeImage
                                  ? "w-8 bg-brand"
                                  : "w-2 bg-white/30"}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          QUICK APPLY MODAL
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {applyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyOpen(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-[110] flex items-center
                         justify-center p-4"
            >
              <div className="relative w-full max-w-md glass-dark rounded-3xl
                              p-8 border border-brand/25 shadow-brand-lg">
                <button
                  onClick={() => setApplyOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full
                             glass flex items-center justify-center
                             text-white/50 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center
                                 justify-center border
                                 bg-gradient-to-br ${service.gradient}
                                 ${service.borderColor} ${service.iconColor}`}>
                  <Icon size={24} />
                </div>

                <h3 className="text-white font-bold text-xl mb-1">
                  Apply for {label}
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  We&apos;ll contact you within 48 hours
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder={t("apply.name")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5
                               border border-white/10 text-white text-sm
                               placeholder-white/30 focus:border-brand/50
                               focus:outline-none transition-all"
                  />
                  <input
                    type="tel"
                    placeholder={t("apply.phone")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5
                               border border-white/10 text-white text-sm
                               placeholder-white/30 focus:border-brand/50
                               focus:outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder={t("apply.name") + " Email"}
                    className="w-full px-4 py-3 rounded-xl bg-white/5
                               border border-white/10 text-white text-sm
                               placeholder-white/30 focus:border-brand/50
                               focus:outline-none transition-all"
                  />
                  <select
                    defaultValue={service.slug}
                    className="w-full px-4 py-3 rounded-xl bg-dark-700
                               border border-white/10 text-white/80 text-sm
                               focus:border-brand/50 focus:outline-none
                               transition-all"
                  >
                    {service.destinations.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <Link href={`/${locale}/apply`}>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2
                                 py-4 rounded-xl bg-gradient-brand
                                 text-dark-900 font-bold mt-2
                                 shadow-brand hover:shadow-brand-lg
                                 transition-all duration-300"
                    >
                      {t("apply.submit")}
                      <ArrowRight size={17} />
                    </motion.button>
                  </Link>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
