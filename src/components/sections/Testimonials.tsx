"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Almaz Bekele",
    location: "Now in Dubai, UAE",
    avatar: "AB",
    color: "from-brand/20 to-brand/5",
    text: "Luluat Alsharq changed my life completely. They handled everything professionally — from my documents to my visa. I now work for a great family in Dubai and earn well. I highly recommend them!",
    rating: 5,
  },
  {
    id: 2,
    name: "Tadesse Haile",
    location: "Now in Saudi Arabia",
    avatar: "TH",
    color: "from-blue-500/20 to-blue-500/5",
    text: "I was nervous about going abroad, but the team at Luluat Alsharq guided me every step. The pre-departure training was excellent. I feel safe and supported.",
    rating: 5,
  },
  {
    id: 3,
    name: "Selamawit Girma",
    location: "Now in Qatar",
    avatar: "SG",
    color: "from-purple-500/20 to-purple-500/5",
    text: "Very professional and honest agency. They were transparent about everything — salary, working conditions, everything. No hidden surprises. God bless the team!",
    rating: 5,
  },
  {
    id: 4,
    name: "Biruk Mengistu",
    location: "Now in Kuwait",
    avatar: "BM",
    color: "from-amber-500/20 to-amber-500/5",
    text: "Fast processing, friendly staff. They really care about workers. I got my visa within weeks and am now earning a great salary. Thank you Luluat Alsharq!",
    rating: 5,
  },
  {
    id: 5,
    name: "Fatuma Ahmed",
    location: "Now in Bahrain",
    avatar: "FA",
    color: "from-rose-500/20 to-rose-500/5",
    text: "I searched for a reliable agency for months. Luluat Alsharq was recommended by my neighbor and I have no regrets. Fully legal, fully professional.",
    rating: 5,
  },
];

export default function Testimonials() {
  const t                = useTranslations();
  const [current, setCurrent] = useState(0);
  const [auto, setAuto]       = useState(true);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  function next() {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    resetTimer();
  }
  function prev() {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    resetTimer();
  }
  function resetTimer() {
    setAuto(false);
    setTimeout(() => setAuto(true), 5000);
  }

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setTimeout(next, 4500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, auto]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="relative py-20 lg:py-28 bg-dark-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0"
        style={{
          backgroundImage:
            `radial-gradient(ellipse at 50% 50%,
             rgba(107,255,60,0.05) 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <Badge dot className="mb-4">Success Stories</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                           text-white mb-5 leading-tight">
              Lives We&apos;ve{" "}
              <span className="text-gradient">Transformed</span>
            </h2>
          </FadeIn>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative rounded-3xl p-8 sm:p-12 mb-8
                          bg-gradient-to-br ${testimonial.color}
                          border border-white/10`}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-8 opacity-15">
                <Quote size={80} className="text-brand" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18}
                    className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-white/90 text-lg sm:text-xl
                                     leading-relaxed mb-8 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-brand
                                flex items-center justify-center
                                text-dark-900 font-black text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-brand text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); resetTimer(); }}
                  className={`h-2 rounded-full transition-all duration-300
                              ${i === current
                                ? "w-8 bg-brand"
                                : "w-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-11 h-11 rounded-xl glass border border-white/15
                           flex items-center justify-center text-white/70
                           hover:text-white hover:border-brand/40
                           transition-colors duration-200"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-11 h-11 rounded-xl glass border border-white/15
                           flex items-center justify-center text-white/70
                           hover:text-white hover:border-brand/40
                           transition-colors duration-200"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mini cards row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TESTIMONIALS.map((t2, i) => (
            <motion.button
              key={t2.id}
              whileHover={{ scale: 1.04, y: -3 }}
              onClick={() => { setCurrent(i); resetTimer(); }}
              className={`p-4 rounded-2xl text-left border transition-all duration-300
                          ${i === current
                            ? "border-brand/50 bg-brand/10 shadow-brand-sm"
                            : "border-white/8 glass hover:border-brand/25"}`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-brand
                              flex items-center justify-center
                              text-dark-900 font-bold text-xs mb-2">
                {t2.avatar}
              </div>
              <p className="text-white text-xs font-semibold truncate">
                {t2.name}
              </p>
              <p className="text-white/40 text-[10px] truncate mt-0.5">
                {t2.location}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}