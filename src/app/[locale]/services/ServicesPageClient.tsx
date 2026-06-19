"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations, useLocale }  from "next-intl";
import Link                            from "next/link";
import { motion, AnimatePresence }     from "framer-motion";
import { gsap }                        from "gsap";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import type { CSSProperties }          from "react";
import {
  ArrowRight, MapPin,
  DollarSign, Users, Search,
  SlidersHorizontal, X, ChevronRight,
  Sparkles,
} from "lucide-react";
import Badge      from "@/components/ui/Badge";
import FadeIn     from "@/components/animations/FadeIn";
import {
  SERVICES_DATA,
  SERVICE_LABELS,
  SERVICE_DESC,
} from "@/lib/services-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const ALL_DESTINATIONS = [
  "All", "Dubai, UAE", "Saudi Arabia",
  "Qatar", "Kuwait", "Bahrain",
];

export default function ServicesPageClient() {
  const t      = useTranslations();
  const locale = useLocale() as "en" | "am" | "om";

  const [search,      setSearch]      = useState("");
  const [destination, setDestination] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  /* ── GSAP hero entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".srv-hero-badge",    { y: -30, opacity: 0, duration: 0.6, delay: 0.1 });
      gsap.from(".srv-hero-title",    { y:  50, opacity: 0, duration: 0.7, delay: 0.2 });
      gsap.from(".srv-hero-subtitle", { y:  30, opacity: 0, duration: 0.6, delay: 0.35 });
      gsap.from(".srv-hero-stat",     { y:  30, opacity: 0, duration: 0.5,
                                        stagger: 0.1, delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const filtered = useMemo(() => {
    let result = SERVICES_DATA;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          SERVICE_LABELS[s.slug][locale].toLowerCase().includes(q) ||
          SERVICE_DESC[s.slug][locale].toLowerCase().includes(q)
      );
    }
    if (destination !== "All") {
      result = result.filter((s) =>
        s.destinations.includes(destination)
      );
    }
    return result;
  }, [search, destination, locale]);

  function clearFilters() {
    setSearch("");
    setDestination("All");
  }

  const hasFilters = search !== "" || destination !== "All";

  return (
    <div className="min-h-screen bg-dark-900">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative py-24 lg:py-32 overflow-hidden
                   bg-gradient-to-b from-dark-800 to-dark-900"
      >
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px]
                        bg-brand/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px]
                        bg-brand/4 rounded-full blur-[80px] pointer-events-none" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16
                        text-center">
          <div className="srv-hero-badge mb-6">
            <Badge dot animate>{t("services.badge")}</Badge>
          </div>

          <h1 className="srv-hero-title text-5xl sm:text-6xl lg:text-7xl
                         font-black text-white mb-6 leading-tight">
            {t("services.title")}
            <br />
            <span className="text-gradient">&amp; Opportunities</span>
          </h1>

          <p className="srv-hero-subtitle text-white/55 text-lg lg:text-xl
                        max-w-2xl mx-auto mb-12">
            {t("services.subtitle")}
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {[
              { label: "Job Categories",     value: "6+" },
              { label: "Active Openings",    value: "585+" },
              { label: "Destinations",       value: "5" },
              { label: "Placed This Year",   value: "500+" },
            ].map((s, i) => (
              <div key={i}
                className="srv-hero-stat flex flex-col items-center
                           px-6 py-3 glass-brand border border-brand/20
                           rounded-2xl">
                <span className="text-3xl font-black text-gradient">
                  {s.value}
                </span>
                <span className="text-white/50 text-xs mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FILTERS
      ══════════════════════════════════════════════ */}
      <section className="sticky top-[65px] z-30 bg-dark-900/95
                          backdrop-blur-xl border-b border-white/5
                          py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5
                           border border-white/10 text-white text-sm
                           placeholder-white/30
                           focus:border-brand/40 focus:outline-none
                           transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Destination filter — desktop */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              {ALL_DESTINATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDestination(d)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium
                              transition-all duration-200
                              ${destination === d
                                ? "bg-brand text-dark-900 font-bold"
                                : "glass border border-white/10 text-white/60 hover:text-white"
                              }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Filter toggle — mobile */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="sm:hidden flex items-center gap-2 px-4 py-2.5
                         rounded-xl glass border border-white/10
                         text-white/70 text-sm"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && (
                <span className="w-2 h-2 rounded-full bg-brand" />
              )}
            </button>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                           text-xs text-red-400 border border-red-500/20
                           hover:bg-red-500/10 transition-colors"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          {/* Mobile destination pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                  {ALL_DESTINATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDestination(d); setShowFilters(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium
                                  transition-all duration-200
                                  ${destination === d
                                    ? "bg-brand text-dark-900"
                                    : "glass border border-white/10 text-white/60"
                                  }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICE CARDS GRID
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          {/* Result count */}
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <p className="text-white/50 text-sm">
                Showing{" "}
                <span className="text-brand font-bold">{filtered.length}</span>
                {" "}of {SERVICES_DATA.length} services
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-white/40 hover:text-brand text-xs
                             transition-colors underline"
                >
                  View all
                </button>
              )}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-white/60 text-lg font-medium mb-2">
                  No services found
                </p>
                <p className="text-white/30 text-sm mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-xl border border-brand/40
                             text-brand text-sm hover:bg-brand/10 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((service) => {
                  const Icon  = service.icon;
                  const label = SERVICE_LABELS[service.slug][locale];
                  const desc  = SERVICE_DESC[service.slug][locale];

                  return (
                    <motion.div
                      key={service.slug}
                      variants={staggerItem}
                      layout
                    >
                      <Link href={`/${locale}/services/${service.slug}`}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          style={
                            { "--shadow-color": service.shadowColor } as CSSProperties
                          }
                          className={`group relative rounded-2xl overflow-hidden
                                      border ${service.borderColor}
                                      bg-gradient-to-br ${service.gradient}
                                      hover:shadow-[0_12px_40px_var(--shadow-color)]
                                      transition-all duration-400 cursor-pointer
                                      flex flex-col h-full`}
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <motion.img
                              src={service.image}
                              alt={label}
                              className="w-full h-full object-cover
                                         group-hover:scale-110
                                         transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t
                                            from-dark-900 via-dark-900/40
                                            to-transparent" />

                            {/* Openings badge */}
                            <div className="absolute top-3 right-3
                                            flex items-center gap-1.5
                                            bg-dark-900/80 backdrop-blur-sm
                                            px-2.5 py-1 rounded-full
                                            border border-white/15">
                              <span className="w-1.5 h-1.5 rounded-full
                                               bg-brand animate-pulse" />
                              <span className="text-white/80 text-xs font-medium">
                                {service.openings} openings
                              </span>
                            </div>

                            {/* Icon overlay */}
                            <div className={`absolute bottom-3 left-3
                                            w-11 h-11 rounded-xl
                                            flex items-center justify-center
                                            bg-dark-900/80 backdrop-blur-sm
                                            border border-white/15
                                            ${service.iconColor}`}>
                              <Icon size={22} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className={`font-bold text-xl text-white mb-2
                                           group-hover:${service.iconColor}
                                           transition-colors duration-300`}>
                              {label}
                            </h3>

                            <p className="text-white/55 text-sm
                                          leading-relaxed mb-5 flex-1">
                              {desc}
                            </p>

                            {/* Meta row */}
                            <div className="space-y-2.5 mb-5">
                              {/* Salary */}
                              <div className="flex items-center gap-2
                                              text-white/60 text-xs">
                                <DollarSign
                                  size={13}
                                  className={service.iconColor}
                                />
                                <span>
                                  ${service.salary.min}–$
                                  {service.salary.max}{" "}
                                  {service.salary.currency}/month
                                </span>
                              </div>

                              {/* Destinations */}
                              <div className="flex items-start gap-2
                                              text-white/60 text-xs">
                                <MapPin
                                  size={13}
                                  className={`${service.iconColor} mt-0.5 flex-shrink-0`}
                                />
                                <span className="line-clamp-1">
                                  {service.destinations.join(" · ")}
                                </span>
                              </div>

                              {/* Openings */}
                              <div className="flex items-center gap-2
                                              text-white/60 text-xs">
                                <Users
                                  size={13}
                                  className={service.iconColor}
                                />
                                <span>{service.openings} positions open</span>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className={`flex items-center gap-2
                                            text-sm font-semibold
                                            ${service.iconColor}
                                            group-hover:gap-3
                                            transition-all duration-300`}>
                              View Details
                              <ArrowRight size={15} />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden
                            glass-brand border border-brand/25 p-8 sm:p-14
                            text-center">
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2
                              w-[400px] h-[200px] bg-brand/10
                              rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-4
                                px-4 py-2 bg-brand/15 border border-brand/30
                                rounded-full">
                  <Sparkles size={14} className="text-brand" />
                  <span className="text-brand text-xs font-bold uppercase tracking-wide">
                    Free Consultation
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black
                               text-white mb-4 leading-tight">
                  Don&apos;t See Your{" "}
                  <span className="text-gradient">Perfect Job?</span>
                </h2>

                <p className="text-white/55 text-base sm:text-lg mb-8
                              max-w-xl mx-auto">
                  Contact us directly and we will find the right opportunity
                  tailored to your skills and experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4
                                justify-center items-center">
                  <Link href={`/${locale}/apply`}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4
                                 rounded-2xl bg-gradient-brand
                                 text-dark-900 font-bold text-base
                                 shadow-brand hover:shadow-brand-lg
                                 transition-all duration-300"
                    >
                      Apply Now <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4
                                 rounded-2xl glass border border-white/15
                                 text-white font-semibold
                                 hover:border-brand/40 transition-all duration-300"
                    >
                      Contact Us <ChevronRight size={18} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
