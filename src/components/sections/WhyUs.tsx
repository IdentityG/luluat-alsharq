"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ShieldCheck, FileCheck, HeartHandshake,
  Clock, Globe2, Users2
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import { staggerContainer, staggerItem } from "@/lib/animations";

const FEATURES = [
  {
    icon: ShieldCheck,
    color: "text-brand",
    bg:    "bg-brand/10 border-brand/20",
    titleKey: "Government Licensed",
    descKey:  "Fully licensed and registered under Ethiopian law since 2015.",
  },
  {
    icon: FileCheck,
    color: "text-blue-400",
    bg:    "bg-blue-500/10 border-blue-500/20",
    titleKey: "Legal Documentation",
    descKey:  "We handle all paperwork, visas and contracts professionally.",
  },
  {
    icon: HeartHandshake,
    color: "text-rose-400",
    bg:    "bg-rose-500/10 border-rose-500/20",
    titleKey: "Worker Welfare First",
    descKey:  "Your safety and dignity are our top priority at every step.",
  },
  {
    icon: Clock,
    color: "text-amber-400",
    bg:    "bg-amber-500/10 border-amber-500/20",
    titleKey: "Fast Processing",
    descKey:  "Efficient processing gets you working abroad in record time.",
  },
  {
    icon: Globe2,
    color: "text-purple-400",
    bg:    "bg-purple-500/10 border-purple-500/20",
    titleKey: "Wide Network",
    descKey:  "Strong employer partnerships across 5+ Gulf countries.",
  },
  {
    icon: Users2,
    color: "text-teal-400",
    bg:    "bg-teal-500/10 border-teal-500/20",
    titleKey: "Post-Arrival Support",
    descKey:  "We stay with you even after you arrive at your destination.",
  },
];

export default function WhyUs() {
  const t = useTranslations();

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden
                        bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      {/* Background */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            `radial-gradient(circle at 20% 50%, rgba(107,255,60,0.06) 0%, transparent 60%),
             radial-gradient(circle at 80% 50%, rgba(107,255,60,0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <Badge dot className="mb-4">Why Choose Us</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                           text-white mb-5 leading-tight">
              The{" "}
              <span className="text-gradient">Luluat Alsharq</span>
              {" "}Difference
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              We are not just an agency — we are your trusted partner
              for a safe, legal, and successful international journey.
            </p>
          </FadeIn>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative glass rounded-2xl p-7
                           border border-white/8 hover:border-brand/25
                           transition-all duration-300 overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute -top-4 -right-2 text-[80px]
                                font-black text-white/[0.025] leading-none
                                select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className={`w-13 h-13 w-[52px] h-[52px] rounded-xl mb-5
                                 flex items-center justify-center border
                                 ${feat.bg} ${feat.color}
                                 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>

                <h3 className="text-white font-bold text-lg mb-3
                               group-hover:text-brand transition-colors duration-300">
                  {feat.titleKey}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  {feat.descKey}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0
                                bg-brand/60 group-hover:w-full
                                transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Big number showcase */}
        <FadeIn delay={0.2}>
          <div className="mt-16 p-8 sm:p-12 rounded-3xl
                          glass-brand border border-brand/20
                          flex flex-col md:flex-row items-center
                          justify-around gap-8 text-center">
            {[
              { num: "5,000+", label: "Happy workers placed abroad" },
              { num: "9+",     label: "Years of trusted service" },
              { num: "100%",   label: "Legal & government licensed" },
              { num: "24/7",   label: "Support for our workers" },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-5xl font-black text-gradient">{item.num}</p>
                <p className="text-white/50 text-sm max-w-[140px] mx-auto">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}