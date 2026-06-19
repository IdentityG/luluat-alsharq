"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const locale    = useLocale() as Locale;
  const router    = useRouter();
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchLocale(next: Locale) {
    /* Replace current locale prefix with new one */
    const segments = pathname.split("/");
    segments[1]    = next;
    router.push(segments.join("/"));
    setOpen(false);
  }

  if (mobile) {
    return (
      <div className="flex gap-2 flex-wrap">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
              locale === l
                ? "bg-brand text-dark-900"
                : "glass text-white/70 hover:text-white"
            )}
          >
            <span>{localeFlags[l]}</span>
            <span>{localeNames[l]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium",
          "glass border border-white/10 hover:border-brand/40",
          "text-white/80 hover:text-white transition-all duration-300"
        )}
      >
        <Globe size={15} className="text-brand" />
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "absolute right-0 top-full mt-2 w-44 z-[100]",
              "glass-dark rounded-2xl overflow-hidden",
              "border border-brand/20 shadow-brand-sm"
            )}
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm",
                  "transition-all duration-200 text-left",
                  locale === l
                    ? "bg-brand/20 text-brand font-semibold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="text-base">{localeFlags[l]}</span>
                <span>{localeNames[l]}</span>
                {locale === l && (
                  <motion.div
                    layoutId="active-locale"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-brand"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}