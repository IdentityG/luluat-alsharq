"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations }  from "next-intl";
import Link                            from "next/link";
import { motion, useScroll,
         useTransform, AnimatePresence } from "framer-motion";
import { gsap }                        from "gsap";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import {
  Shield, Award, Users, Globe2,
  CheckCircle2, ArrowRight, Quote,
  Building2, FileCheck, HeartHandshake,
  Clock, Star, Phone, Mail,
  MapPin, ChevronRight, Sparkles,
  TrendingUp, Target, Eye,
  Calendar, BadgeCheck, Briefcase,
} from "lucide-react";
import Badge    from "@/components/ui/Badge";
import FadeIn   from "@/components/animations/FadeIn";
import Counter  from "@/components/animations/Counter";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

type FloatingBlob = {
  size: string;
  delay: number;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
};

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const TIMELINE = [
  {
    year: "2015",
    en: {
      title: "Founded",
      desc:  "Luluat Alsharq was established in Addis Ababa with a mission to connect Ethiopian workers with safe, legal international employment opportunities.",
    },
    am: {
      title: "ተቋቋመ",
      desc:  "ሉሉአት አልሸርቅ ኢትዮጵያዊ ሰራተኞችን ከደህንነቱ የተጠበቀ፣ ህጋዊ ዓለም አቀፍ የሥራ ዕድሎች ጋር ለማገናኘት ዓላማ ይዞ አዲስ አበባ ውስጥ ተቋቋመ።",
    },
    om: {
      title: "Hundeeffame",
      desc:  "Luluat Alsharq hojjattoota Itoophiyaa carraalee hojii idil-addunyaa nagaa fi seeraa waliin walquunnamsiisuu kaayyoo godhachuun Finfinnee keessatti hundeeffame.",
    },
    icon: Building2,
    color: "text-brand bg-brand/15 border-brand/30",
  },
  {
    year: "2017",
    en: {
      title: "First 500 Workers Placed",
      desc:  "We successfully placed our first 500 workers in Dubai and Saudi Arabia, establishing our reputation as a trusted agency.",
    },
    am: {
      title: "የመጀመሪያ 500 ሰራተኞች ተቀጠሩ",
      desc:  "500 ሰራተኞቻችንን በዱባይ እና ሳዑዲ አረቢያ በተሳካ ሁኔታ አስቀጥረናል፣ ይህም አምኔ ኤጀንሲ ሆነን ዝናችንን ለመመስረት ረዳን።",
    },
    om: {
      title: "Hojjattoota 500 Jalqabaa Ramadame",
      desc:  "Hojjattoota 500 jalqabaa keenya Dubaayi fi Saa'udii Arabiyaa keessatti milkaa'inaan ramadne, ejensii amanamaa ta'uu keenya beeksifne.",
    },
    icon: Users,
    color: "text-blue-400 bg-blue-500/15 border-blue-500/30",
  },
  {
    year: "2019",
    en: {
      title: "Expanded to 5 Countries",
      desc:  "We expanded our network to include Qatar, Kuwait, and Bahrain, offering more diverse opportunities to Ethiopian workers.",
    },
    am: {
      title: "ወደ 5 ሀገሮች ተስፋፋ",
      desc:  "ወደ ቃጣር፣ ኩዌት እና ባህሬን ጨምሮ አውታሬያችንን አስፋፋን፣ ለኢትዮጵያ ሰራተኞች ብዙ ዓይነት ዕድሎችን ቀረበ።",
    },
    om: {
      title: "Biyyoota 5tti Bal'ate",
      desc:  "Qaxar, Kuwayt fi Baahireyn dabaluun network keenya bal'isne, hojjattoota Itoophiyaatiif carraalee garagaraa dhiheessine.",
    },
    icon: Globe2,
    color: "text-purple-400 bg-purple-500/15 border-purple-500/30",
  },
  {
    year: "2021",
    en: {
      title: "ISO Certified Processes",
      desc:  "We adopted internationally recognized processes for worker documentation, training, and placement to ensure the highest standards.",
    },
    am: {
      title: "ISO የተረጋገጡ ሂደቶች",
      desc:  "ከፍተኛ ደረጃዎችን ለማረጋገጥ ለሰራተኛ ሰነዶች፣ ስልጠና እና ምደባ ዓለም አቀፍ እውቅና ያላቸው ሂደቶችን ተቀበልን።",
    },
    om: {
      title: "Hojmaatota ISO Mirkanaa'an",
      desc:  "Sadarkaalee olaanaa mirkaneessuuf sanadoota hojjataa, leenjii fi ramaddiif hojmaatota idil-addunyaan beekaman fudhanne.",
    },
    icon: BadgeCheck,
    color: "text-amber-400 bg-amber-500/15 border-amber-500/30",
  },
  {
    year: "2023",
    en: {
      title: "5,000+ Workers Milestone",
      desc:  "A proud milestone — over 5,000 Ethiopian workers have built better lives abroad through our agency, with a 98% success rate.",
    },
    am: {
      title: "5,000+ ሰራተኞች ምልክት ደረሰ",
      desc:  "የኩራት ምልክት — ከ5,000 በላይ የኢትዮጵያ ሰራተኞች በ98% የስኬት ምጣኔ በኤጀንሲያችን በኩል ከውጭ ሀገር የተሻለ ህይወት ገነቡ።",
    },
    om: {
      title: "Hojjattoota 5,000+ Mallatoo Ga'ame",
      desc:  "Mallatoo boonsaa — hojjattoota Itoophiyaa 5,000 ol ejensii keenya dhaaf sadarkaa milkaa'ina 98% n biyya alatti jireenya gaarii ijaaratan.",
    },
    icon: TrendingUp,
    color: "text-teal-400 bg-teal-500/15 border-teal-500/30",
  },
  {
    year: "2025",
    en: {
      title: "Digital Transformation",
      desc:  "Launching our modern digital platform to make the application process faster, more transparent, and accessible for all Ethiopians.",
    },
    am: {
      title: "ዲጂታል ለውጥ",
      desc:  "የማመልከቻ ሂደቱን ለሁሉም ኢትዮጵያዊያን ፈጣን፣ ግልፅ እና ተደራሽ ለማድረግ ዘመናዊ ዲጂታል መድረካችንን አስጀምሯል።",
    },
    om: {
      title: "Jijjiirama Dijitaalaa",
      desc:  "Haala iyyannoo Itoophiyaanota hundaaf ariifataa, ifaa fi dhaqqabamaa gochuuf platform dijitaalaa ammayyaa keenya jalqabsiisne.",
    },
    icon: Sparkles,
    color: "text-brand bg-brand/15 border-brand/30",
  },
];

const FLOATING_BLOBS: FloatingBlob[] = [
  { size: "w-3 h-3", top: "20%", right: "12%", delay: 0 },
  { size: "w-2 h-2", top: "55%", right: "22%", delay: 1 },
  { size: "w-4 h-4", top: "30%", left: "8%", delay: 2 },
  { size: "w-2 h-2", bottom: "25%", left: "18%", delay: 0.5 },
];

const TEAM_MEMBERS = [
  {
    name:     "Mrs. Lula Geday Amebaye",
    nameAm:   "ወ/ሮ ሉላ ግዳይ አምባዬ",
    nameOm:   "Adde Lula Geday Amebaye",
    role:     "General Manager & Founder",
    roleAm:   "ዋና ሥራ አስኪያጅ እና መስራች",
    roleOm:   "Manaajara Olaanaa fi Hundeessituu",
    avatar:   "LG",
    color:    "from-brand/20 to-brand/5 border-brand/30",
    iconColor:"text-brand",
    bio: {
      en: "With over 10 years of experience in the foreign employment sector, Mrs. Lula founded Luluat Alsharq with a vision to provide safe, legal, and dignified international employment to Ethiopian workers.",
      am: "ከ10 ዓመታት በላይ በውጭ ሀገር ሥራ ዘርፍ ልምድ ያላቸው ወ/ሮ ሉላ ሉሉአት አልሸርቅን ለኢትዮጵያ ሰራተኞች ደህንነቱ የተጠበቀ፣ ህጋዊ እና ክብር ያለው ዓለም አቀፍ ሥራ ለመስጠት ራዕይ ይዘው መሰረቱ።",
      om: "Muuxannoo waggaa 10 ol lamisaawwan hojii alaa keessatti qaban waliin, Adde Lula hojjattoota Itoophiyaatiif carraalee hojii nagaa, seeraa fi ulfina qabu kennuuf mul'ata qabatanii Luluat Alsharq hundeessan.",
    },
    stats: [
      { label: "Years Experience", value: "10+" },
      { label: "Workers Placed",   value: "5k+" },
      { label: "Countries",        value: "5+"  },
    ],
  },
  {
    name:     "Operations Team",
    nameAm:   "የሥራ ቡድን",
    nameOm:   "Garee Hojii",
    role:     "Documentation & Visa Specialists",
    roleAm:   "የሰነድ እና ቪዛ ባለሙያዎች",
    roleOm:   "Ogeeyyii Sanadaa fi Viizaa",
    avatar:   "OT",
    color:    "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    iconColor:"text-blue-400",
    bio: {
      en: "Our dedicated operations team handles all documentation, visa processing, and legal compliance to ensure every worker's journey is smooth and fully compliant with Ethiopian and destination country laws.",
      am: "ቁርጠኛ የሥራ ቡድናችን ሁሉም ሰነዶች፣ የቪዛ ሂደት እና ህጋዊ ተቀጣጣሪነትን ይቆጣጠራል።",
      om: "Gareen hojii keenya kutataasaan sanadoota, hojmaata viizaa fi seerummaa hunda bulcha.",
    },
    stats: [
      { label: "Visas Processed", value: "5k+" },
      { label: "Success Rate",    value: "98%" },
      { label: "Avg Processing",  value: "14d" },
    ],
  },
  {
    name:     "Training Department",
    nameAm:   "የስልጠና ክፍል",
    nameOm:   "Kutaa Leenjii",
    role:     "Pre-Departure Training Experts",
    roleAm:   "ከጉዞ በፊት ስልጠና ባለሙያዎች",
    roleOm:   "Ogeeyyii Leenjii Dura Deemsa",
    avatar:   "TD",
    color:    "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    iconColor:"text-purple-400",
    bio: {
      en: "Our training team prepares every worker with language skills, cultural awareness, and job-specific training before departure — ensuring confidence and readiness upon arrival.",
      am: "የስልጠና ቡድናችን ከጉዞ በፊት እያንዳንዱን ሰራተኛ በቋንቋ ክህሎት፣ የባህል ግንዛቤ እና ሥራ-ልዩ ስልጠና ያዘጋጃቸዋል።",
      om: "Gareen leenjii keenya hojjataa hunda dura deemsa dura dandeettii afaanii, beekumsa aadaa fi leenjii hojii-addaatiin qopheessa.",
    },
    stats: [
      { label: "Workers Trained", value: "5k+" },
      { label: "Languages",       value: "3+"  },
      { label: "Programs",        value: "12+" },
    ],
  },
  {
    name:     "Support & Welfare",
    nameAm:   "ድጋፍ እና ደህንነት",
    nameOm:   "Deeggarsa fi Gabbifannaa",
    role:     "Worker Welfare Officers",
    roleAm:   "የሰራተኛ ደህንነት ኦፊሰሮች",
    roleOm:   "Ogeessota Gabbifannaa Hojjataa",
    avatar:   "SW",
    color:    "from-rose-500/20 to-rose-500/5 border-rose-500/30",
    iconColor:"text-rose-400",
    bio: {
      en: "Our welfare team remains in contact with every placed worker, providing 24/7 support for any issues that arise after deployment — because our responsibility doesn't end at departure.",
      am: "የደህንነት ቡድናችን ከተቀጠሩ ሰራተኞቻችን ጋር ግንኙነቱን ይቀጥላል፣ ከሰፈሩ በኋላ ለሚነሱ ችግሮች 24/7 ድጋፍ ይሰጣል።",
      om: "Gareen gabbifannaa keenya hojjataa ramadamaa hundumaatiin walqunnamtii itti fufa, dhimmoota erga ramadamanii ka'aniif 24/7 deeggarsa kenna.",
    },
    stats: [
      { label: "Active Workers",    value: "500+" },
      { label: "Support Channels",  value: "24/7" },
      { label: "Issues Resolved",   value: "99%"  },
    ],
  },
];

const VALUES = [
  {
    icon:    Shield,
    color:   "text-brand   bg-brand/10   border-brand/20",
    titleEn: "Integrity",
    titleAm: "ቅንነት",
    titleOm: "Sirrii ta'uu",
    descEn:  "We operate with full transparency and honesty in every step of the employment process.",
    descAm:  "በሥራ ፈጠራ ሂደት ሁሉ ሙሉ ግልፅነት እና ታማኝነት ይዘን እንሰራለን።",
    descOm:  "Tarkaanfii hojii hunda keessatti ifummaa fi amantaa guutuun hojjanna.",
  },
  {
    icon:    HeartHandshake,
    color:   "text-rose-400 bg-rose-500/10 border-rose-500/20",
    titleEn: "Worker First",
    titleAm: "ሰራተኛ ቅድሚያ",
    titleOm: "Hojjataan Jalqaba",
    descEn:  "The safety, dignity, and well-being of every worker is our absolute priority.",
    descAm:  "የእያንዳንዱ ሰራተኛ ደህንነት፣ ክብር እና ጤንነት ፍፁም ቅድሚያ ነው።",
    descOm:  "Nageenyi, ulfina fi fayyaan hojjataa hunda dursa duwwaa keenya.",
  },
  {
    icon:    FileCheck,
    color:   "text-blue-400 bg-blue-500/10 border-blue-500/20",
    titleEn: "Legal Compliance",
    titleAm: "ህጋዊ ተቀጣጣሪነት",
    titleOm: "Seerummaa",
    descEn:  "All operations are fully compliant with Ethiopian and destination country laws.",
    descAm:  "ሁሉም ሥራዎቻችን ከኢትዮጵያ እና ከመድረሻ ሀገር ህጎች ጋር ሙሉ ተቀጣጣሪ ናቸው።",
    descOm:  "Hojii hundi seerota Itoophiyaa fi biyya gahumsaa waliin guutummaatti simu.",
  },
  {
    icon:    Target,
    color:   "text-amber-400 bg-amber-500/10 border-amber-500/20",
    titleEn: "Excellence",
    titleAm: "ብቃት",
    titleOm: "Ol'aanummaa",
    descEn:  "We continuously improve our services to deliver the best outcomes for workers and employers.",
    descAm:  "ለሰራተኞች እና ቀጣሪዎች ምርጥ ውጤቶችን ለማቅረብ አገልግሎቶቻችንን ያለማቋረጥ ናሻለን።",
    descOm:  "Tajaajilota keenya hojjattoota fi qaxarsiistotaaf bu'aa gaarii dhiheessuuf yoomiiyyuu fooyyessina.",
  },
  {
    icon:    Eye,
    color:   "text-teal-400 bg-teal-500/10 border-teal-500/20",
    titleEn: "Transparency",
    titleAm: "ግልፅነት",
    titleOm: "Ifummaa",
    descEn:  "No hidden fees. No false promises. What we say is exactly what you get.",
    descAm:  "ምንም ድብቅ ክፍያ የለም። ምንም ሐሰተኛ ቃል ኪዳን የለም። የምንናገረው ያለ ምንም ለውጥ ያገኙታል።",
    descOm:  "Kaffalti dhoksaa hin jiru. Waadaa sobaa hin jiru. Kan jennu isa argattan.",
  },
  {
    icon:    Globe2,
    color:   "text-purple-400 bg-purple-500/10 border-purple-500/20",
    titleEn: "Global Network",
    titleAm: "ዓለም አቀፍ አውታር",
    titleOm: "Network Addunyaa",
    descEn:  "Strong partnerships with verified employers across 5+ Gulf countries.",
    descAm:  "ከ5+ የባህረሰላጤ ሀገሮች ያረጋገጡ ቀጣሪዎች ጋር ጠንካራ ሽርክና።",
    descOm:  "Michummaa cimaa qaxarsiisota mirkanaa'oo biyyoota Gulf 5+ keessa jiraniif.",
  },
];

const CERTIFICATIONS = [
  {
    icon:    Award,
    labelEn: "Government Licensed",
    labelAm: "መንግስት ፈቃድ ያለው",
    labelOm: "Mootummaan Hayyamamee",
    valueEn: "Reg. No: NL/AA/2/0029419/2015",
    valueAm: "ምዝ.ቁ: NL/AA/2/0029419/2015",
    valueOm: "Lakk.Galm: NL/AA/2/0029419/2015",
    color:   "border-brand/30    bg-brand/5",
    badge:   "text-brand",
  },
  {
    icon:    FileCheck,
    labelEn: "TIN Registered",
    labelAm: "TIN ተመዝጋቢ",
    labelOm: "TIN Galma'e",
    valueEn: "TIN: 0086099722",
    valueAm: "TIN: 0086099722",
    valueOm: "TIN: 0086099722",
    color:   "border-blue-500/30 bg-blue-500/5",
    badge:   "text-blue-400",
  },
  {
    icon:    Building2,
    labelEn: "Addis Ababa Trade Bureau",
    labelAm: "አዲስ አበባ ንግድ ቢሮ",
    labelOm: "Biiroo Daldalaa Finfinnee",
    valueEn: "Nefas Silk-Lafto Sub City",
    valueAm: "ንፋስ ስልክ ላፍቶ ክፍለ ከተማ",
    valueOm: "Kifle Magaalaa Nefas Silk-Lafto",
    color:   "border-purple-500/30 bg-purple-500/5",
    badge:   "text-purple-400",
  },
  {
    icon:    Calendar,
    labelEn: "Est. Since",
    labelAm: "ከ...ጀምሮ",
    labelOm: "Kan Hundeeffame",
    valueEn: "December 22, 2015",
    valueAm: "ታህሳስ 22, 2015",
    valueOm: "Mudde 22, 2015",
    color:   "border-amber-500/30 bg-amber-500/5",
    badge:   "text-amber-400",
  },
];

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
export default function AboutClient() {
  const t      = useTranslations();
  const locale = useLocale() as "en" | "am" | "om";

  const heroRef     = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const { scrollY }  = useScroll();
  const heroY        = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0]);

  /* ── GSAP hero entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".about-badge",    { y: -25, opacity: 0, duration: 0.5 })
        .from(".about-title",    { y:  50, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".about-subtitle", { y:  30, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".about-stat",     {
          y: 30, opacity: 0, duration: 0.5,
          stagger: 0.12,
        }, "-=0.2")
        .from(".about-scroll-hint", { opacity: 0, duration: 0.4 }, "-=0.1");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── GSAP scroll-triggered reveals ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* section headings */
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* cards stagger */
      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((el) => {
        const cards = el.querySelectorAll(".stagger-card");
        gsap.from(cards, {
          y: 40, opacity: 0, duration: 0.6,
          stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      /* timeline line draw */
      gsap.from(".timeline-line", {
        scaleY: 0, duration: 2, ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  /* helpers */
  const getName   = (m: (typeof TEAM_MEMBERS)[0]) =>
    locale === "am" ? m.nameAm : locale === "om" ? m.nameOm : m.name;
  const getRole   = (m: (typeof TEAM_MEMBERS)[0]) =>
    locale === "am" ? m.roleAm : locale === "om" ? m.roleOm : m.role;
  const getBio    = (m: (typeof TEAM_MEMBERS)[0]) => m.bio[locale];

  const getValTitle = (v: (typeof VALUES)[0]) =>
    locale === "am" ? v.titleAm : locale === "om" ? v.titleOm : v.titleEn;
  const getValDesc  = (v: (typeof VALUES)[0]) =>
    locale === "am" ? v.descAm  : locale === "om" ? v.descOm  : v.descEn;

  const getCertLabel = (c: (typeof CERTIFICATIONS)[0]) =>
    locale === "am" ? c.labelAm : locale === "om" ? c.labelOm : c.labelEn;
  const getCertValue = (c: (typeof CERTIFICATIONS)[0]) =>
    locale === "am" ? c.valueAm : locale === "om" ? c.valueOm : c.valueEn;

  const getTlTitle = (item: (typeof TIMELINE)[0]) =>
    locale === "am" ? item.am.title : locale === "om" ? item.om.title : item.en.title;
  const getTlDesc  = (item: (typeof TIMELINE)[0]) =>
    locale === "am" ? item.am.desc  : locale === "om" ? item.om.desc  : item.en.desc;

  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          01 — HERO
      ════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center
                   overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900"
      >
        {/* Background layers */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none"
        >
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

        {/* Floating blobs */}
        {FLOATING_BLOBS.map((b, i) => (
          <motion.div
            key={i}
            animate={{ y: [-12, 12, -12], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
            className={`absolute ${b.size} rounded-full bg-brand/40 pointer-events-none`}
            style={{ top: b.top, right: b.right, left: b.left, bottom: b.bottom }}
          />
        ))}

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto
                     px-4 sm:px-6 lg:px-16 py-20 lg:py-0
                     grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
                     w-full"
        >
          {/* Left */}
          <div className="space-y-6">
            <div className="about-badge">
              <Badge dot animate>{t("about.badge")}</Badge>
            </div>

            <h1 className="about-title text-5xl sm:text-6xl lg:text-7xl
                           font-black text-white leading-[1.05] tracking-tight">
              {t("about.title")}
              <br />
              <span className="text-gradient">Alsharq</span>
            </h1>

            <p className="about-subtitle text-white/60 text-base sm:text-lg
                          leading-relaxed max-w-lg">
              {t("about.description")}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { value: 5000, suffix: "+", label: "Workers Placed" },
                { value: 9,    suffix: "+", label: "Years Active"   },
                { value: 5,    suffix: "+", label: "Countries"      },
                { value: 98,   suffix: "%", label: "Success Rate"   },
              ].map((s, i) => (
                <div
                  key={i}
                  className="about-stat glass-brand border border-brand/20
                             rounded-2xl px-5 py-3 text-center min-w-[90px]"
                >
                  <div className="text-2xl font-black text-gradient">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/${locale}/apply`}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl
                             bg-gradient-brand text-dark-900 font-bold
                             shadow-brand hover:shadow-brand-lg
                             transition-all duration-300"
                >
                  {t("nav.apply")}
                  <ArrowRight size={17} />
                </motion.button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl
                             glass border border-white/15 text-white font-semibold
                             hover:border-brand/40 transition-all duration-300"
                >
                  <Phone size={15} className="text-brand" />
                  {t("nav.contact")}
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Right · Floating card stack */}
          <div className="relative hidden lg:block h-[520px]">
            {/* Main card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-80
                         glass-brand border border-brand/25 rounded-3xl p-7"
            >
              {/* Manager spotlight */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-brand
                                flex items-center justify-center
                                text-dark-900 font-black text-xl
                                shadow-brand">
                  LG
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-tight">
                    {locale === "am" ? "ወ/ሮ ሉላ ግዳይ አምባዬ"
                     : locale === "om" ? "Adde Lula Geday Amebaye"
                     : "Mrs. Lula Geday Amebaye"}
                  </p>
                  <p className="text-brand text-xs mt-0.5">
                    {t("about.manager_title")}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10}
                        className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-brand/15 pt-4">
                <Quote size={20} className="text-brand/40 mb-2" />
                <p className="text-white/65 text-sm leading-relaxed italic">
                  {locale === "am"
                    ? "\"ሁሉም ሰራተኛ ደህንነቱ የተጠበቀ፣ ክብር ያለው ሥራ ያገኝ — ይህ ቁርጠኝነቴ ነው።\""
                    : locale === "om"
                    ? "\"Hojjataan hundi hojii nagaa fi ulfina qabu haa argatuu — kun waadaa kooti.\""
                    : "\"Every worker deserves safe, dignified employment — that is my commitment.\""
                  }
                </p>
              </div>
            </motion.div>

            {/* License card */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{
                duration: 5, repeat: Infinity,
                ease: "easeInOut", delay: 1.5,
              }}
              className="absolute bottom-10 left-0 w-64
                         glass border border-white/15 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand/15
                                border border-brand/30 flex items-center
                                justify-center">
                  <Shield size={18} className="text-brand" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {t("about.license")}
                  </p>
                  <p className="text-white/40 text-[10px]">Ethiopian Government</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  { k: "TIN",  v: COMPANY.tin     },
                  { k: "Reg",  v: "NL/AA/2/0029419" },
                  { k: "Est",  v: COMPANY.established },
                ].map((row) => (
                  <div key={row.k}
                    className="flex justify-between text-xs">
                    <span className="text-white/40">{row.k}</span>
                    <span className="text-brand font-mono font-semibold">
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Success badge */}
            <motion.div
              animate={{ y: [-6, 10, -6] }}
              transition={{
                duration: 4, repeat: Infinity,
                ease: "easeInOut", delay: 0.5,
              }}
              className="absolute top-[45%] left-[30%]
                         glass-brand border border-brand/25
                         rounded-2xl px-4 py-3 flex items-center gap-3"
            >
              <TrendingUp size={20} className="text-brand" />
              <div>
                <p className="text-white font-bold text-sm">98% Success</p>
                <p className="text-white/40 text-xs">Placement Rate</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24
                        bg-gradient-to-t from-dark-900 to-transparent
                        pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════
          02 — MISSION & VISION
      ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-up text-center mb-14">
            <Badge dot className="mb-4">Our Purpose</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Mission &amp;{" "}
              <span className="text-gradient">Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="relative glass-brand border border-brand/25
                         rounded-3xl p-8 sm:p-10 overflow-hidden"
            >
              {/* Bg glow */}
              <div className="absolute top-0 right-0 w-48 h-48
                              bg-brand/8 rounded-full blur-[60px]
                              pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand/20
                                border border-brand/30 flex items-center
                                justify-center mb-6">
                  <Target size={28} className="text-brand" />
                </div>
                <p className="text-brand text-xs font-bold uppercase
                              tracking-widest mb-3">
                  {t("about.mission_title")}
                </p>
                <h3 className="text-white font-black text-2xl sm:text-3xl
                               leading-tight mb-4">
                  {locale === "am"
                    ? "ደህንነቱ የተጠበቀ ሕጋዊ ሥራ"
                    : locale === "om"
                    ? "Hojii Nagaa fi Seeraa"
                    : "Safe & Legal Employment"}
                </h3>
                <p className="text-white/60 leading-relaxed text-base">
                  {t("about.mission")}
                </p>
                <div className="mt-6 space-y-3">
                  {(locale === "am"
                    ? ["ደህንነቱ የተጠበቀ ምደባ",
                       "ሙሉ ህጋዊ ድጋፍ",
                       "ሰፊ የቀጣሪ አውታር"]
                    : locale === "om"
                    ? ["Ramaddii Nagaa",
                       "Deeggarsa Seeraa Guutuu",
                       "Network Qaxarsiisota Bal'aa"]
                    : ["Safe Placements",
                       "Full Legal Support",
                       "Wide Employer Network"]
                  ).map((item, i) => (
                    <div key={i}
                      className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle2
                        size={15}
                        className="text-brand flex-shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="relative glass border border-white/10
                         rounded-3xl p-8 sm:p-10 overflow-hidden
                         hover:border-brand/25 transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 w-48 h-48
                              bg-purple-500/5 rounded-full blur-[60px]
                              pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15
                                border border-purple-500/30 flex items-center
                                justify-center mb-6">
                  <Eye size={28} className="text-purple-400" />
                </div>
                <p className="text-purple-400 text-xs font-bold uppercase
                              tracking-widest mb-3">
                  {t("about.vision_title")}
                </p>
                <h3 className="text-white font-black text-2xl sm:text-3xl
                               leading-tight mb-4">
                  {locale === "am"
                    ? "ኢትዮጵያ ቁጥር 1 ኤጀንሲ"
                    : locale === "om"
                    ? "Ejensii Lakk.1 Itoophiyaa"
                    : "Ethiopia's #1 Agency"}
                </h3>
                <p className="text-white/60 leading-relaxed text-base">
                  {t("about.vision")}
                </p>
                <div className="mt-6 space-y-3">
                  {(locale === "am"
                    ? ["ሀገር አቀፍ መሪ ኤጀንሲ",
                       "ሙሉ ዲጂታል ሂደቶች",
                       "ቀጣይ ስኬት ማሳካት"]
                    : locale === "om"
                    ? ["Ejensii Geggeessaa Biyyoolessaa",
                       "Hojmaatota Dijitaalaa Guutuu",
                       "Milkaa'ina Itti Fufiinsa Qabu"]
                    : ["Nationwide Leading Agency",
                       "Fully Digital Processes",
                       "Continuous Achievement"]
                  ).map((item, i) => (
                    <div key={i}
                      className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle2
                        size={15}
                        className="text-purple-400 flex-shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          03 — VALUES
      ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-dark-800 relative overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2
                        -translate-y-1/2 w-[700px] h-[700px]
                        bg-brand/4 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-up text-center mb-14">
            <Badge dot className="mb-4">What Drives Us</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Our Core{" "}
              <span className="text-gradient">Values</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {locale === "am"
                ? "እነዚህ ዋና ዋና እሴቶች ያደርጉናል — በሚሰሩት ሁሉ"
                : locale === "om"
                ? "Kun gatii bu'uuraa nu taasisu — hojii hunda keessatti"
                : "These core values define who we are — in everything we do"}
            </p>
          </div>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2
                          lg:grid-cols-3 gap-5">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={i}
                  className="stagger-card group"
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <div className="h-full glass rounded-2xl p-7
                                  border border-white/8
                                  hover:border-brand/25
                                  transition-all duration-300
                                  relative overflow-hidden">
                    {/* Number */}
                    <div className="absolute -top-3 -right-1 text-[70px]
                                    font-black text-white/[0.025]
                                    leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className={`w-13 h-13 w-[52px] h-[52px] rounded-xl
                                     mb-5 flex items-center justify-center
                                     border ${val.color}
                                     group-hover:scale-110
                                     transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>

                    <h3 className="text-white font-bold text-xl mb-3
                                   group-hover:text-brand transition-colors">
                      {getValTitle(val)}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed">
                      {getValDesc(val)}
                    </p>

                    {/* Bottom line reveal */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0
                                    bg-brand/60 group-hover:w-full
                                    transition-all duration-500 rounded-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          04 — TIMELINE
      ════════════════════════════════════════════════ */}
      <section
        ref={timelineRef}
        className="py-20 lg:py-28 bg-dark-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-up text-center mb-14">
            <Badge dot className="mb-4">Our Journey</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              {locale === "am"
                ? "የእኛ ታሪክ"
                : locale === "om"
                ? "Seenaa Keenya"
                : "Our Story"}
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {locale === "am"
                ? "ከ2015 ጀምሮ እያደጉ ያሉ — ሁሉም ደረጃ ሁሉም ኢትዮጵያዊ ሰራተኛ ቁጠሮ ነው"
                : locale === "om"
                ? "2015 irraa kaasee guddata — tarkaanfii hundumaatu hojjataa Itoophiyaa tokkoo tokkoo lakkaawa"
                : "Growing since 2015 — every milestone counts every Ethiopian worker"}
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="hidden lg:block relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0
                            w-0.5 bg-white/8 -translate-x-1/2" />
            {/* Animated progress */}
            <div
              className="timeline-line absolute left-1/2 top-0 bottom-0
                          w-0.5 bg-gradient-to-b from-brand via-brand/50
                          to-transparent -translate-x-1/2 origin-top"
            />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => {
                const Icon    = item.icon;
                const isLeft  = i % 2 === 0;
                const isActive = activeTimelineItem === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`relative flex items-center mb-12
                                ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Card side */}
                    <div className={`w-[45%] ${isLeft ? "pr-12" : "pl-12"}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        onClick={() => setActiveTimelineItem(i)}
                        className={`glass rounded-2xl p-6 border
                                    cursor-pointer transition-all duration-300
                                    ${isActive
                                      ? "border-brand/40 bg-brand/5"
                                      : "border-white/8 hover:border-brand/25"
                                    }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-brand font-black text-2xl
                                           tabular-nums">
                            {item.year}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-xs
                                           font-bold ${item.color}`}>
                            {getTlTitle(item)}
                          </span>
                        </div>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {getTlDesc(item)}
                        </p>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="w-[10%] flex justify-center
                                    items-center relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className={`w-12 h-12 rounded-full border-4
                                    border-dark-900 flex items-center
                                    justify-center shadow-lg
                                    ${item.color}
                                    transition-transform duration-300
                                    ${isActive ? "scale-125" : ""}`}
                      >
                        <Icon size={18} />
                      </motion.div>
                    </div>

                    {/* Empty side */}
                    <div className="w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="lg:hidden space-y-4">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  {/* Left dot + line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center
                                     justify-center border flex-shrink-0
                                     ${item.color}`}>
                      <Icon size={16} />
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-0.5 flex-1 bg-white/10 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-brand font-black text-lg">
                        {item.year}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs
                                       font-bold ${item.color}`}>
                        {getTlTitle(item)}
                      </span>
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {getTlDesc(item)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          05 — TEAM
      ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-up text-center mb-14">
            <Badge dot className="mb-4">
              {locale === "am"
                ? "ቡድናችን"
                : locale === "om"
                ? "Garee Keenya"
                : "Our Team"}
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              {locale === "am"
                ? "ሰዎቻችን ጀርባ ያሉ"
                : locale === "om"
                ? "Namoota Duuba Jiran"
                : "The People Behind"}
              {" "}
              <span className="text-gradient">
                {locale === "am" ? "ስኬቱ"
                  : locale === "om" ? "Milkaa'inaa"
                  : "The Success"}
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {locale === "am"
                ? "ቁርጠኛ ባለሙያዎቻችን ጉዞዎን ደህንነቱ በተጠበቀ እና ምቹ ሁኔታ ማሳለፍ ያረጋግጣሉ"
                : locale === "om"
                ? "Ogeeyyiin keenya kutataasoon imala keessan nagaa fi salphaa akka ta'u mirkaneessu"
                : "Our dedicated professionals ensure your journey is safe and smooth"}
            </p>
          </div>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2
                          lg:grid-cols-4 gap-5">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={i}
                className="stagger-card group"
                whileHover={{ y: -8 }}
              >
                <div className={`h-full glass rounded-2xl overflow-hidden
                                 border transition-all duration-300
                                 hover:border-brand/25 flex flex-col
                                 border-white/8`}>
                  {/* Top gradient */}
                  <div className={`h-2 bg-gradient-to-r ${member.color
                    .split(" border")[0]
                    .replace("from-", "from-")}`}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Avatar */}
                    <div className={`w-16 h-16 rounded-2xl mb-5
                                     flex items-center justify-center
                                     font-black text-xl
                                     bg-gradient-to-br ${member.color}
                                     ${member.iconColor}
                                     group-hover:scale-105
                                     transition-transform`}>
                      {member.avatar}
                    </div>

                    <h3 className="text-white font-bold text-base mb-1
                                   group-hover:text-brand transition-colors
                                   leading-tight">
                      {getName(member)}
                    </h3>
                    <p className={`text-sm font-medium mb-3 ${member.iconColor}`}>
                      {getRole(member)}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed
                                  flex-1 mb-5">
                      {getBio(member)}
                    </p>

                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-1 pt-4
                                    border-t border-white/8">
                      {member.stats.map((s, si) => (
                        <div key={si} className="text-center">
                          <p className={`font-black text-sm ${member.iconColor}`}>
                            {s.value}
                          </p>
                          <p className="text-white/35 text-[9px] leading-tight
                                        mt-0.5">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          06 — CERTIFICATIONS
      ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-up text-center mb-14">
            <Badge dot className="mb-4">
              {locale === "am"
                ? "ፈቃዶቻችን"
                : locale === "om"
                ? "Hayyamoota Keenya"
                : "Our Credentials"}
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              {t("about.license")}
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              {t("about.license_desc")}
            </p>
          </div>

          {/* Cert cards */}
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2
                          lg:grid-cols-4 gap-5 mb-10">
            {CERTIFICATIONS.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={i}
                  className="stagger-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`p-6 rounded-2xl border text-center
                                   ${cert.color} transition-all duration-300
                                   hover:shadow-lg`}>
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-4
                                     flex items-center justify-center
                                     bg-white/8 border border-white/10
                                     ${cert.badge}`}>
                      <Icon size={22} />
                    </div>
                    <p className="text-white font-bold text-sm mb-1">
                      {getCertLabel(cert)}
                    </p>
                    <p className={`text-xs font-mono font-semibold ${cert.badge}`}>
                      {getCertValue(cert)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Big license banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-brand border border-brand/25 rounded-3xl
                       p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64
                            bg-brand/8 rounded-full blur-[80px]
                            pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row
                            items-center gap-8">
              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-brand/20
                              border border-brand/30 flex items-center
                              justify-center flex-shrink-0">
                <Award size={40} className="text-brand" />
              </div>

              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-brand text-xs font-bold uppercase
                              tracking-widest mb-2">
                  {locale === "am"
                    ? "ኦፊሴላዊ ምዝገባ"
                    : locale === "om"
                    ? "Galmeessa Idilee"
                    : "Official Registration"}
                </p>
                <h3 className="text-white font-black text-2xl sm:text-3xl
                               mb-2 leading-tight">
                  {locale === "am"
                    ? "ሉሉአት አልሸርቅ በዉጭ ሀገር ስራና ሰራተኛ አገናኝ ኃ/የ/የግ/ማህበር"
                    : locale === "om"
                    ? "Luluat Alsharq Foreign Employment Agent PLC"
                    : "Luluat Alsharq Foreign Employment Agent PLC"}
                </h3>
                <p className="text-white/50 text-sm">
                  {locale === "am"
                    ? "በኢትዮጵያ ህግ ሙሉ ፈቃድ ያለው — ከ2015 ጀምሮ ለሰራተኞች ቁርጠኛ"
                    : locale === "om"
                    ? "Seeraan Itoophiyaa hayyama guutuu qaba — 2015 irraa hojjatootaaf kutatame"
                    : "Fully licensed under Ethiopian law — committed to workers since 2015"}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {[
                  { label: "TIN", value: COMPANY.tin           },
                  { label: "REG", value: "NL/AA/2/0029419/2015"},
                ].map((b) => (
                  <div key={b.label}
                    className="glass px-4 py-2 rounded-xl border
                               border-brand/20 text-center">
                    <p className="text-white/40 text-[10px]">{b.label}</p>
                    <p className="text-brand font-mono font-bold text-sm">
                      {b.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          07 — MANAGER QUOTE
      ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              `radial-gradient(ellipse at 50% 50%,
               rgba(107,255,60,0.05) 0%, transparent 65%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-16
                        text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-brand border border-brand/25 rounded-3xl p-10 sm:p-14
                       relative"
          >
            <Quote
              size={60}
              className="absolute top-8 right-8 text-brand/10"
            />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>

            <blockquote className="text-white text-xl sm:text-2xl lg:text-3xl
                                   font-bold leading-relaxed mb-8 relative z-10">
              {locale === "am"
                ? "\"ሉሉአት አልሸርቅ የተቋቋመው ለሁሉም ኢትዮጵያዊ ሰራተኛ ህልም እውን ለማድረግ ነው — ለደህንነቱ፣ ለክብሩ እና ለቤተሰቡ የተሻለ ህይወት። ይህ ቁርጠኝነቴ ነበር፣ ይህ አሁንም ቁርጠኝነቴ ነው።\""
                : locale === "om"
                ? "\"Luluat Alsharq hojjataa Itoophiyaa hundaaf abjuu dhugoomsuu — nageenyaaf, ulfinaaf fi maatiif jireenya gaariif — kaayyoo qabatee hundeeffame. Kun waadaa koo ture, kun ammaayyuu waadaa kooti.\""
                : "\"Luluat Alsharq was founded to make the dream a reality for every Ethiopian worker — safety, dignity, and a better life for their family. That was my commitment then, and it remains my commitment now.\""}
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-brand
                              flex items-center justify-center
                              text-dark-900 font-black text-lg shadow-brand">
                LG
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-base">
                  {locale === "am"
                    ? "ወ/ሮ ሉላ ግዳይ አምባዬ"
                    : locale === "om"
                    ? "Adde Lula Geday Amebaye"
                    : "Mrs. Lula Geday Amebaye"}
                </p>
                <p className="text-brand text-sm">{t("about.manager_title")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          08 — CONTACT STRIP
      ════════════════════════════════════════════════ */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Phone */}
            <a href={`tel:${COMPANY.phone1}`}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group glass-brand border border-brand/20
                           rounded-2xl p-6 flex items-center gap-4
                           cursor-pointer hover:border-brand/40
                           transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/20
                                border border-brand/30 flex items-center
                                justify-center flex-shrink-0">
                  <Phone size={22} className="text-brand" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                    {t("contact.phone")}
                  </p>
                  <p className="text-white font-bold text-sm group-hover:text-brand
                                transition-colors">
                    {COMPANY.phone1}
                  </p>
                  <p className="text-white/60 text-xs">{COMPANY.phone2}</p>
                </div>
              </motion.div>
            </a>

            {/* Email */}
            <a href={`mailto:${COMPANY.email}`}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group glass border border-white/8
                           rounded-2xl p-6 flex items-center gap-4
                           cursor-pointer hover:border-brand/25
                           transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/15
                                border border-blue-500/30 flex items-center
                                justify-center flex-shrink-0">
                  <Mail size={22} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                    {t("contact.email")}
                  </p>
                  <p className="text-white font-bold text-sm group-hover:text-brand
                                transition-colors break-all">
                    {COMPANY.email}
                  </p>
                </div>
              </motion.div>
            </a>

            {/* Address */}
            <Link href={`/${locale}/contact`}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group glass border border-white/8
                           rounded-2xl p-6 flex items-center gap-4
                           cursor-pointer hover:border-brand/25
                           transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/15
                                border border-purple-500/30 flex items-center
                                justify-center flex-shrink-0">
                  <MapPin size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                    {t("contact.address")}
                  </p>
                  <p className="text-white font-bold text-sm group-hover:text-brand
                                transition-colors">
                    Kera Sufi Tower, 3rd Floor
                  </p>
                  <p className="text-white/60 text-xs">Office No. 305, Addis Ababa</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          09 — FINAL CTA
      ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-dark-800 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px]
                        bg-brand/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px]
                        bg-brand/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-16
                        text-center">
          <FadeIn>
            <Badge dot animate className="mb-6">
              {locale === "am"
                ? "ጉዞዎን ይጀምሩ"
                : locale === "om"
                ? "Imala Keessan Jalqabaa"
                : "Start Your Journey"}
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
                           text-white mb-6 leading-tight">
              {locale === "am"
                ? "ሕይወትዎን ለመቀየር"
                : locale === "om"
                ? "Jireenyakee Jijjiiruu"
                : "Ready to Change"}{" "}
              <span className="text-gradient">
                {locale === "am"
                  ? "ዝግጁ ነዎት?"
                  : locale === "om"
                  ? "Qophii Dha?"
                  : "Your Life?"}
              </span>
            </h2>

            <p className="text-white/55 text-lg max-w-2xl mx-auto mb-10">
              {locale === "am"
                ? "ሉሉአት አልሸርቅ ዓለም አቀፍ ስራ ፍለጋ ጉዞዎ ውስጥ አምኔ አጋርዎ ነን። ዛሬ ያመልክቱ።"
                : locale === "om"
                ? "Luluat Alsharq michuu amanamaa keessan imala hojii idil-addunyaa keessanitti. Har'a iyyadhaa."
                : "Luluat Alsharq is your trusted partner in your international employment journey. Apply today."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/apply`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2
                             px-10 py-4 rounded-2xl bg-gradient-brand
                             text-dark-900 font-bold text-lg
                             shadow-brand hover:shadow-brand-lg
                             transition-all duration-300 min-w-[220px]"
                >
                  {t("nav.apply")}
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href={`/${locale}/services`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2
                             px-10 py-4 rounded-2xl glass border border-white/15
                             text-white font-semibold text-lg
                             hover:border-brand/40 transition-all duration-300
                             min-w-[220px]"
                >
                  {t("services.title")}
                  <ChevronRight size={20} />
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
