"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Globe,
  MessageCircle, Play, ArrowUpRight,
  ChevronRight, Shield, Award
} from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SOCIAL = [
  { icon: Globe,         href: "#", label: "Facebook"  },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Play,          href: "#", label: "YouTube"   },
];

export default function Footer() {
  const t      = useTranslations();
  const locale = useLocale();

  function localHref(href: string) {
    return `/${locale}${href}`;
  }

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-800 border-t border-brand/10 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                      bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Main Footer ────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-16 pb-8">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >

          {/* ── Col 1 · Brand ───────────────────────────────── */}
          <motion.div variants={staggerItem} className="lg:col-span-1 space-y-5">
            {/* Logo */}
            <Link href={localHref("/")} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand
                              flex items-center justify-center
                              text-dark-900 font-black text-lg shadow-brand
                              group-hover:shadow-brand-lg transition-shadow">
                LA
              </div>
              <div>
                <p className="font-black text-white text-base leading-none">
                  Luluat <span className="text-gradient">Alsharq</span>
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Foreign Employment Agency
                </p>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>

            {/* Trust badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Shield size={13} className="text-brand flex-shrink-0" />
                <span>{t("about.license")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Award size={13} className="text-brand flex-shrink-0" />
                <span>Est. {COMPANY.established} · TIN {COMPANY.tin}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg glass border border-white/10
                             flex items-center justify-center text-white/50
                             hover:text-brand hover:border-brand/40
                             transition-colors duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2 · Quick Links ─────────────────────────── */}
          <motion.div variants={staggerItem} className="space-y-5">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">
              {t("footer.quicklinks")}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={localHref(href)}
                    className="flex items-center gap-2 text-sm text-white/50
                               hover:text-brand transition-colors duration-200 group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-brand/50 group-hover:text-brand
                                 group-hover:translate-x-0.5 transition-all"
                    />
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localHref("/apply")}
                  className="flex items-center gap-2 text-sm text-brand
                             hover:text-brand/80 transition-colors font-medium group"
                >
                  <ChevronRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                  {t("nav.apply")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* ── Col 3 · Destinations ────────────────────────── */}
          <motion.div variants={staggerItem} className="space-y-5">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">
              {t("footer.quicklinks")}
            </h3>
            <ul className="space-y-2">
              {(
                ["dubai", "saudi", "qatar", "kuwait"] as const
              ).map((dest) => (
                <li key={dest}>
                  <Link
                    href={localHref("/destinations")}
                    className="flex items-center gap-2 text-sm text-white/50
                               hover:text-brand transition-colors group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-brand/50 group-hover:text-brand
                                 group-hover:translate-x-0.5 transition-all"
                    />
                    {t(`destinations.${dest}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4 · Contact ─────────────────────────────── */}
          <motion.div variants={staggerItem} className="space-y-5">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">
              {t("footer.contact")}
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-brand" />
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t("contact.address_value")}
                </p>
              </div>

              {/* Phone 1 */}
              <a
                href={`tel:${COMPANY.phone1}`}
                className="flex gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20
                                flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-brand" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-white/50 text-xs">{t("contact.phone")}</p>
                  <p className="text-white/80 text-sm group-hover:text-brand
                                transition-colors">
                    {COMPANY.phone1}
                  </p>
                  <p className="text-white/80 text-sm group-hover:text-brand
                                transition-colors">
                    {COMPANY.phone2}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20
                                flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-brand" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-white/50 text-xs">{t("contact.email")}</p>
                  <p className="text-white/80 text-sm group-hover:text-brand
                                transition-colors break-all">
                    {COMPANY.email}
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── CTA Banner ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 p-6 sm:p-8 rounded-2xl gradient-border
                     bg-gradient-to-r from-brand/5 to-transparent
                     flex flex-col sm:flex-row items-center
                     justify-between gap-6"
        >
          <div>
            <p className="font-bold text-white text-lg">
              {t("apply.badge")}
            </p>
            <p className="text-white/50 text-sm mt-1">
              {t("apply.subtitle")}
            </p>
          </div>
          <Link href={localHref("/apply")}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl
                         bg-gradient-brand text-dark-900 font-bold text-sm
                         shadow-brand hover:shadow-brand-lg
                         transition-all duration-300 whitespace-nowrap"
            >
              {t("nav.apply")}
              <ArrowUpRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Bottom Bar ────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-white/5
                        flex flex-col sm:flex-row items-center
                        justify-between gap-4 text-xs text-white/30">
          <p>
            © {year} {t("footer.company")}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span>Reg. No: {COMPANY.license}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
