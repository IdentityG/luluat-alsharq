"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const t        = useTranslations();
  const locale   = useLocale();
  const pathname = usePathname();

  const [mobileOpen,  setMobileOpen]  = useState(false);

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10,10,15,0)", "rgba(10,10,15,0.95)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(107,255,60,0)", "rgba(107,255,60,0.15)"]
  );

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const activeLink = `/${pathname.split("/")[2] || ""}`;

  function localHref(href: string) {
    return `/${locale}${href}`;
  }

  function isActive(href: string) {
    return activeLink === href;
  }

  return (
    <>
      {/* ── Top bar ────────────────────────────────────────── */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex items-center justify-between px-8 xl:px-16
                   py-2 bg-dark-800 border-b border-brand/10 text-xs text-white/50"
      >
        <div className="flex items-center gap-6">
          <a
            href={`tel:${COMPANY.phone1}`}
            className="flex items-center gap-1.5 hover:text-brand transition-colors"
          >
            <Phone size={11} />
            {COMPANY.phone1}
          </a>
          <a
            href={`tel:${COMPANY.phone2}`}
            className="flex items-center gap-1.5 hover:text-brand transition-colors"
          >
            <Phone size={11} />
            {COMPANY.phone2}
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="hover:text-brand transition-colors"
          >
            {COMPANY.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span>Licensed · TIN: {COMPANY.tin}</span>
        </div>
      </motion.div>

      {/* ── Main Navbar ────────────────────────────────────── */}
      <motion.header
        style={{ backgroundColor: navBg, borderBottomColor: navBorder }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl
                   lg:top-[33px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* ── Logo ─────────────────────────────────────── */}
            <Link
              href={localHref("/")}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative w-10 h-10 lg:w-12 lg:h-12"
              >
                {/* Logo placeholder — brand-colored glow box */}
                <div className="w-full h-full rounded-xl bg-gradient-brand
                                flex items-center justify-center
                                shadow-brand text-dark-900 font-black text-lg">
                  LA
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <p className="font-black text-white text-sm lg:text-base leading-none">
                  Luluat{" "}
                  <span className="text-gradient">Alsharq</span>
                </p>
                <p className="text-white/40 text-[10px] lg:text-xs mt-0.5 leading-none">
                  Foreign Employment Agency
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav Links ─────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, key }) => (
                <Link
                  key={href}
                  href={localHref(href)}
                  className="relative group px-3 xl:px-4 py-2 rounded-lg
                             text-sm font-medium transition-all duration-300"
                >
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-300",
                      isActive(href)
                        ? "text-brand"
                        : "text-white/70 group-hover:text-white"
                    )}
                  >
                    {t(key)}
                  </span>

                  {/* Active indicator */}
                  {isActive(href) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-brand/10
                                 border border-brand/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover indicator */}
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2
                               w-0 h-0.5 bg-brand rounded-full
                               group-hover:w-4/5 transition-all duration-300"
                  />
                </Link>
              ))}
            </nav>

            {/* ── Right Side ───────────────────────────────── */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              {/* CTA Button */}
              <Link
                href={localHref("/apply")}
                className="hidden lg:flex"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                             bg-gradient-brand text-dark-900 font-bold text-sm
                             shadow-brand hover:shadow-brand-lg
                             transition-all duration-300"
                >
                  {t("nav.apply")}
                  <ChevronRight size={15} />
                </motion.button>
              </Link>

              {/* Hamburger */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center justify-center
                           w-10 h-10 rounded-xl glass border border-white/10
                           text-white hover:border-brand/40 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Spacer ─────────────────────────────────────────── */}
      <div className="h-16 lg:h-[calc(4.5rem+33px)]" />

      {/* ── Mobile Menu Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[70]
                         w-80 max-w-[90vw]
                         bg-dark-800 border-l border-brand/20
                         flex flex-col overflow-y-auto"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between p-6
                              border-b border-brand/10">
                <div>
                  <p className="font-black text-white text-lg">
                    Luluat <span className="text-gradient">Alsharq</span>
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    Foreign Employment Agency
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl glass border border-white/10
                             flex items-center justify-center text-white/70
                             hover:text-white hover:border-brand/40 transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 p-6 space-y-1">
                {NAV_LINKS.map(({ href, key }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={localHref(href)}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5",
                        "rounded-xl font-medium text-sm transition-all duration-200",
                        isActive(href)
                          ? "bg-brand/15 text-brand border border-brand/25"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {t(key)}
                      <ChevronRight
                        size={16}
                        className={isActive(href) ? "text-brand" : "text-white/30"}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language + CTA */}
              <div className="p-6 border-t border-brand/10 space-y-4">
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  Language
                </p>
                <LanguageSwitcher mobile />

                <Link
                  href={localHref("/apply")}
                  onClick={() => setMobileOpen(false)}
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2
                               py-3.5 rounded-xl bg-gradient-brand
                               text-dark-900 font-bold text-sm
                               shadow-brand mt-2"
                  >
                    {t("nav.apply")}
                    <ChevronRight size={16} />
                  </motion.button>
                </Link>

                {/* Contact info */}
                <div className="space-y-2 pt-2">
                  <a
                    href={`tel:${COMPANY.phone1}`}
                    className="flex items-center gap-2 text-white/50
                               hover:text-brand transition-colors text-sm"
                  >
                    <Phone size={13} />
                    {COMPANY.phone1}
                  </a>
                  <a
                    href={`tel:${COMPANY.phone2}`}
                    className="flex items-center gap-2 text-white/50
                               hover:text-brand transition-colors text-sm"
                  >
                    <Phone size={13} />
                    {COMPANY.phone2}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
