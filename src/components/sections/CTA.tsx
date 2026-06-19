"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  ArrowRight, Phone, Mail,
  CheckCircle2, Sparkles
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { COMPANY } from "@/lib/constants";

const BENEFITS = [
  "100% Legal & Licensed Process",
  "Free Initial Consultation",
  "Fast Visa Processing",
  "Pre-departure Training Included",
  "Post-arrival Support",
  "Transparent Contracts",
];

export default function CTA() {
  const t      = useTranslations();
  const locale = useLocale();
  const ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".cta-orb-1", {
        x: 30, y: -20,
        duration: 6, repeat: -1, yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".cta-orb-2", {
        x: -20, y: 30,
        duration: 5, repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden bg-dark-800">

      {/* Orbs */}
      <div className="cta-orb-1 absolute -top-20 -left-20 w-[400px] h-[400px]
                      bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="cta-orb-2 absolute -bottom-20 -right-20 w-[400px] h-[400px]
                      bg-brand/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16
                        items-center">

          {/* ── Left ──────────────────────────────────────── */}
          <div className="space-y-8">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2
                              bg-brand/15 border border-brand/30 rounded-full">
                <Sparkles size={14} className="text-brand" />
                <span className="text-brand text-xs font-bold uppercase tracking-wide">
                  {t("apply.badge")}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                             text-white leading-tight">
                Ready to Start Your{" "}
                <span className="text-gradient">New Life</span>
                {" "}Abroad?
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-white/55 text-lg leading-relaxed">
                {t("apply.subtitle")} Join thousands of Ethiopian workers
                who have already transformed their lives with Luluat Alsharq.
              </p>
            </FadeIn>

            {/* Benefits */}
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2.5 text-white/70 text-sm"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-brand flex-shrink-0"
                    />
                    {b}
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Contact shortcuts */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${COMPANY.phone1}`}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl
                               glass border border-white/15 hover:border-brand/40
                               text-white/80 hover:text-white text-sm
                               transition-all duration-300"
                  >
                    <Phone size={15} className="text-brand" />
                    {COMPANY.phone1}
                  </motion.div>
                </a>
                <a href={`mailto:${COMPANY.email}`}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl
                               glass border border-white/15 hover:border-brand/40
                               text-white/80 hover:text-white text-sm
                               transition-all duration-300"
                  >
                    <Mail size={15} className="text-brand" />
                    {t("contact.email")}
                  </motion.div>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* ── Right · Form Card ─────────────────────────── */}
          <FadeIn direction="right" delay={0.2}>
            <motion.div
              whileHover={{ boxShadow: "0 20px 60px rgba(107,255,60,0.15)" }}
              className="glass-brand border border-brand/25 rounded-3xl p-8 sm:p-10
                         relative overflow-hidden"
            >
              {/* Card glow */}
              <div className="absolute top-0 right-0 w-40 h-40
                              bg-brand/10 rounded-full blur-[60px]
                              pointer-events-none" />

              <h3 className="text-white font-bold text-2xl mb-2">
                Apply Now
              </h3>
              <p className="text-white/50 text-sm mb-7">
                Fill in your details and we&apos;ll contact you within 48h.
              </p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Name */}
                <div>
                  <label className="block text-white/60 text-xs font-medium
                                    mb-1.5 uppercase tracking-wide">
                    {t("apply.name")}
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5
                               border border-white/10 text-white text-sm
                               placeholder-white/30
                               focus:border-brand/50 focus:bg-brand/5
                               focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/60 text-xs font-medium
                                    mb-1.5 uppercase tracking-wide">
                    {t("apply.phone")}
                  </label>
                  <input
                    type="tel"
                    placeholder="+251 9xx xxx xxx"
                    className="w-full px-4 py-3 rounded-xl bg-white/5
                               border border-white/10 text-white text-sm
                               placeholder-white/30
                               focus:border-brand/50 focus:bg-brand/5
                               focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-white/60 text-xs font-medium
                                    mb-1.5 uppercase tracking-wide">
                    {t("apply.destination")}
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-dark-700
                               border border-white/10 text-white/80 text-sm
                               focus:border-brand/50 focus:outline-none
                               transition-all duration-200"
                  >
                    <option value="">Select destination</option>
                    <option value="dubai">Dubai, UAE</option>
                    <option value="saudi">Saudi Arabia</option>
                    <option value="qatar">Qatar</option>
                    <option value="kuwait">Kuwait</option>
                    <option value="bahrain">Bahrain</option>
                  </select>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-white/60 text-xs font-medium
                                    mb-1.5 uppercase tracking-wide">
                    {t("apply.job_type")}
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-dark-700
                               border border-white/10 text-white/80 text-sm
                               focus:border-brand/50 focus:outline-none
                               transition-all duration-200"
                  >
                    <option value="">Select job type</option>
                    <option value="domestic">Domestic Worker</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="construction">Construction</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="driver">Driver</option>
                    <option value="security">Security</option>
                  </select>
                </div>

                {/* Submit */}
                <Link href={`/${locale}/apply`}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2
                               py-4 rounded-xl bg-gradient-brand
                               text-dark-900 font-bold text-base
                               shadow-brand hover:shadow-brand-lg
                               transition-all duration-300 mt-2"
                  >
                    {t("apply.submit")}
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <p className="text-white/30 text-xs text-center">
                  Free consultation · No hidden fees · 100% legal
                </p>
              </form>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}