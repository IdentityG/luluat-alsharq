"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowRight, Play, Shield, Award,
  Star, ChevronDown
} from "lucide-react";
import Counter from "@/components/animations/Counter";
import Badge from "@/components/ui/Badge";
import { COMPANY } from "@/lib/constants";

/* ── Floating particle ──────────────────────────────── */
function Particle({
  style,
  className,
  duration,
}: {
  style?: React.CSSProperties;
  className?: string;
  duration: number;
}) {
  return (
    <motion.div
      animate={{ y: [-15, 15, -15], opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={style}
    />
  );
}

const STATS = [
  { value: 2000, suffix: "+", label: "Workers Placed",  labelAm: "የተቀጠሩ",       labelOm: "Ramadaman"  },
  { value: 5,    suffix: "+", label: "Countries",       labelAm: "ሀገሮች",          labelOm: "Biyyoota"   },
  { value: 15,   suffix: "+", label: "Years Experience",labelAm: "ዓመታት ልምድ",    labelOm: "Muuxannoo"  },
  { value: 98,   suffix: "%", label: "Success Rate",    labelAm: "የስኬት ምጣኔ",    labelOm: "Milkaa'ina" },
];

export default function Hero() {
  const t       = useTranslations();
  const locale  = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y1  = useTransform(scrollY, [0, 600], [0,  150]);
  const y2  = useTransform(scrollY, [0, 600], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  /* ── GSAP timeline on mount ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-badge",    { y: -30, opacity: 0, duration: 0.6, ease: "back.out(1.7)" })
        .from(".hero-title",    { y:  60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".hero-subtitle", { y:  40, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from(".hero-ctas",     { y:  30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .from(".hero-stats",    { y:  40, opacity: 0, duration: 0.7, ease: "power2.out",
                                  stagger: 0.1 }, "-=0.2")
        .from(".hero-scroll",   { y: -20, opacity: 0, duration: 0.5 }, "-=0.1");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── Canvas particle field ─── */
  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number;
    }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x:     Math.random() * window.innerWidth,
        y:     Math.random() * window.innerHeight,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4,
        r:     Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107,255,60,${p.alpha})`;
        ctx.fill();
      });

      /* connection lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(107,255,60,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function localHref(href: string) {
    return `/${locale}${href}`;
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center
                 overflow-hidden bg-gradient-hero"
    >
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Background orbs */}
      <motion.div style={{ y: y1 }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px]
                   bg-brand/8 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div style={{ y: y2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px]
                   bg-brand/5 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] bg-brand/3 rounded-full
                      blur-[160px] pointer-events-none z-0" />

      {/* Floating elements */}
      <Particle className="w-3 h-3 bg-brand/40"
        duration={4.5}
        style={{ top: "20%", right: "15%", animationDelay: "0s" }} />
      <Particle className="w-2 h-2 bg-brand/30"
        duration={5.2}
        style={{ top: "60%", right: "25%", animationDelay: "1s" }} />
      <Particle className="w-4 h-4 bg-brand/20"
        duration={6.1}
        style={{ top: "35%", left: "10%",  animationDelay: "2s" }} />
      <Particle className="w-2 h-2 bg-brand/50"
        duration={5.6}
        style={{ bottom: "30%", left: "20%", animationDelay: "0.5s" }} />

      {/* Trust badges floating */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[8%] hidden xl:flex
                   items-center gap-2 glass-brand rounded-xl px-4 py-2.5
                   border border-brand/20 z-10"
      >
        <Shield size={14} className="text-brand" />
        <span className="text-white/80 text-xs font-medium">
          Gov. Licensed
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[30%] right-[6%] hidden xl:flex
                   items-center gap-2 glass-brand rounded-xl px-4 py-2.5
                   border border-brand/20 z-10"
      >
        <Award size={14} className="text-brand" />
        <div>
          <p className="text-white/80 text-xs font-semibold">Est. {COMPANY.established}</p>
          <p className="text-white/40 text-[10px]">Since 2015</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [-6, 10, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] left-[5%] hidden xl:flex
                   items-center gap-2 glass-brand rounded-xl px-4 py-2.5
                   border border-brand/20 z-10"
      >
        <Star size={14} className="text-brand fill-brand" />
        <div>
          <p className="text-white/80 text-xs font-semibold">5★ Rated</p>
          <p className="text-white/40 text-[10px]">By our clients</p>
        </div>
      </motion.div>

      {/* ── Main Content ──────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6
                   lg:px-8 xl:px-16 pt-10 pb-24 text-center"
      >
        {/* Badge */}
        <div className="hero-badge inline-block mb-6">
          <Badge dot animate>
            {t("hero.badge")}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="hero-title max-w-4xl mx-auto mb-6">
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                           font-black text-white leading-[1.05] tracking-tight">
            {t("hero.title")}
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                           font-black leading-[1.05] tracking-tight
                           text-gradient mt-1">
            {t("hero.titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-2xl mx-auto text-white/60
                      text-base sm:text-lg lg:text-xl leading-relaxed mb-10">
          {t("hero.subtitle")}
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-4
                        justify-center items-center mb-16">
          <Link href={localHref("/apply")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                         bg-gradient-brand text-dark-900 font-bold text-base
                         shadow-brand hover:shadow-brand-lg transition-all duration-300
                         min-w-[200px] justify-center"
            >
              {t("hero.cta_primary")}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>
          </Link>

          <Link href={localHref("/about")}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                         glass border border-white/15 text-white font-semibold
                         text-base hover:border-brand/40 transition-all duration-300
                         min-w-[200px] justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center
                              justify-center group-hover:bg-brand/30 transition-colors">
                <Play size={14} className="text-brand ml-0.5" />
              </div>
              {t("hero.cta_secondary")}
            </motion.button>
          </Link>

          <a href="/gcc_slip.pdf" download="gcc_slip.pdf" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                         glass border border-brand/40 text-brand font-semibold
                         text-base hover:bg-brand/10 transition-all duration-300
                         min-w-[200px] justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center
                              justify-center group-hover:bg-brand/30 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              Download GCC Slip
            </motion.button>
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 gap-4
                        max-w-3xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-brand border border-brand/15 rounded-2xl
                         p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-gradient mb-1">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/50 text-xs sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2
                   z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown size={18} className="text-brand" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32
                      bg-gradient-to-t from-dark-900 to-transparent
                      pointer-events-none z-10" />
    </section>
  );
}
