"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations }  from "next-intl";
import { motion, AnimatePresence }     from "framer-motion";
import { gsap }                        from "gsap";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import {
  Phone, Mail, MapPin, Clock,
  Send, CheckCircle2, ArrowRight,
  MessageSquare, User, AtSign,
  ChevronRight, Sparkles,
  Globe, MessageCircle, Play,
  AlertCircle, Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Badge   from "@/components/ui/Badge";
import { COMPANY } from "@/lib/constants";
import { cn }      from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────
   TYPES
───────────────────────────────────── */
type FormState = "idle" | "loading" | "success" | "error";
type LocaleCode = "en" | "am" | "om";

interface FormData {
  name:    string;
  phone:   string;
  email:   string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?:    string;
  phone?:   string;
  email?:   string;
  subject?: string;
  message?: string;
}

/* ─────────────────────────────────────
   STATIC DATA
───────────────────────────────────── */
const OFFICE_HOURS = [
  { day: { en: "Monday – Friday",   am: "ሰኞ – አርብ",     om: "Wiixata – Jimaata"    }, time: "8:00 AM – 6:00 PM" },
  { day: { en: "Saturday",          am: "ቅዳሜ",           om: "Sanbata"               }, time: "9:00 AM – 3:00 PM" },
  { day: { en: "Sunday",            am: "እሁድ",           om: "Dilbata"               }, time: { en: "Closed", am: "ዝግ", om: "Cufaa" } },
];

const FAQ = [
  {
    q: { en: "How long does the application process take?",
         am: "የማመልከቻ ሂደቱ ምን ያህል ጊዜ ይወስዳል?",
         om: "Hojmaatni iyyannoo hangam fudhata?" },
    a: { en: "The full process from application to departure typically takes 4–8 weeks depending on visa processing and employer matching.",
         am: "ከማመልከቻ እስከ ጉዞ ያለው ሙሉ ሂደት በቪዛ ሂደት እና ቀጣሪ ማዛመድ ላይ ተመርኩዞ 4–8 ሳምንት ሊወስድ ይችላል።",
         om: "Hojmaatni guutuu iyyannaa hanga deemsa hojmaata viizaa fi walsimsiisuuf barbaachisu irratti hundaayuun torbe 4–8 fudhata." },
  },
  {
    q: { en: "Is the process 100% legal?",
         am: "ሂደቱ 100% ህጋዊ ነው?",
         om: "Hojmaatni sun 100% seeraa dha?" },
    a: { en: "Yes. We are fully licensed by the Addis Ababa City Administration Trade Bureau and operate under all relevant Ethiopian employment laws.",
         am: "አዎ። በአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ ሙሉ ፈቃድ ያለን ሲሆን ሁሉም ተዛማጅ የኢትዮጵያ የሥራ ሕጎች ስር እንሰራለን።",
         om: "Eeyyee. Biiroo Daldalaa Bulchiinsa Magaalaa Finfinneetiin hayyama guutuu qabna." },
  },
  {
    q: { en: "Are there any hidden fees?",
         am: "ምንም ድብቅ ክፍያ አለ?",
         om: "Kaffalti dhoksaa jiraa?" },
    a: { en: "Absolutely not. We operate with full transparency. All fees are disclosed upfront before any commitment.",
         am: "በፍፁም አይደለም። ሙሉ ግልፅነት ይዘን እንሰራለን። ሁሉም ክፍያዎች ቃል ኪዳን ከመግባት በፊት ይገለፃሉ።",
         om: "Gonkuma miti. Ifummaa guutuun hojjanna. Kaffalti hundi waadaa dura ibsama." },
  },
  {
    q: { en: "What documents do I need?",
         am: "ምን ዓይነት ሰነዶች ያስፈልጉኛል?",
         om: "Sanadoota maal barbaada?" },
    a: { en: "You need a valid Ethiopian passport, educational certificates, work experience letters, medical certificate, and police clearance. Our team will guide you through everything.",
         am: "ትክክለኛ የኢትዮጵያ ፓስፖርት፣ ትምህርታዊ ሰርተፍኬቶች፣ የሥራ ልምድ ደብዳቤዎች፣ የሕክምና ሰርተፍኬት እና የፖሊስ ማስጠንቀቂያ ያስፈልጋሉ።",
         om: "Paaspoortii Itoophiyaa sirrii, waraqaalee barnootaa, xalayaalee muuxannoo hojii, waraqaa ragaa fayyaa fi hayyama poolisii barbaadama." },
  },
  {
    q: { en: "Do you provide pre-departure training?",
         am: "ከጉዞ በፊት ስልጠና ይሰጣሉ?",
         om: "Leenjii dura deemsa ni kennituu?" },
    a: { en: "Yes. We provide comprehensive pre-departure training including language basics, cultural orientation, and job-specific skills training.",
         am: "አዎ። የቋንቋ መሰረታዊ ነገሮች፣ የባህል አቅጣጫ እና ሥራ-ልዩ ክህሎት ስልጠና ጨምሮ ሁሉን ያካተተ ከጉዞ በፊት ስልጠና ይሰጣል።",
         om: "Eeyyee. Hundee afaanii, qindaa'ina aadaa fi leenjii dandeettii hojii-addaa dabalatee leenjii qindaa'aa dura deemsa ni kennina." },
  },
];

const SOCIAL = [
  { icon: Globe,         href: "#", label: "Facebook",  color: "text-blue-400  bg-blue-500/10  border-blue-500/20"  },
  { icon: MessageCircle, href: "#", label: "Instagram", color: "text-pink-400  bg-pink-500/10  border-pink-500/20"  },
  { icon: Play,          href: "#", label: "YouTube",   color: "text-red-400   bg-red-500/10   border-red-500/20"   },
];

interface FieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  value: string;
  error?: string;
  locale: LocaleCode;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  as = "input",
  value,
  error,
  locale,
  onChange,
}: FieldProps) {
  const baseClx = cn(
    "w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5",
    "border text-white text-sm placeholder-white/30",
    "focus:outline-none transition-all duration-200",
    error
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-brand/50 focus:bg-brand/5"
  );

  return (
    <div>
      <label className="block text-white/60 text-xs font-semibold
                        uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className={cn(
            "absolute left-3.5 top-1/2 -translate-y-1/2",
            error ? "text-red-400" : "text-white/30"
          )}
          style={as === "textarea" ? { top: "1rem", transform: "none" } : {}}
        />
        {as === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={5}
            className={cn(baseClx, "pl-11 resize-none")}
          />
        ) : as === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={cn(baseClx, "bg-dark-700 appearance-none")}
          >
            <option value="">{placeholder}</option>
            <option value="job-inquiry">
              {locale === "am" ? "ስለ ሥራ ጥያቄ"
               : locale === "om" ? "Gaaffii Hojii"
               : "Job Inquiry"}
            </option>
            <option value="document-help">
              {locale === "am" ? "የሰነድ ጥያቄ"
               : locale === "om" ? "Gargaarsa Sanadaa"
               : "Document Help"}
            </option>
            <option value="visa-status">
              {locale === "am" ? "የቪዛ ሁኔታ"
               : locale === "om" ? "Haala Viizaa"
               : "Visa Status"}
            </option>
            <option value="complaint">
              {locale === "am" ? "ቅሬታ"
               : locale === "om" ? "Komii"
               : "Complaint"}
            </option>
            <option value="other">
              {locale === "am" ? "ሌላ"
               : locale === "om" ? "Kan Biroo"
               : "Other"}
            </option>
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseClx}
          />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5"
        >
          <AlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────
   COMPONENT
───────────────────────────────────── */
export default function ContactClient() {
  const t      = useTranslations();
  const locale = useLocale() as LocaleCode;

  const heroRef = useRef<HTMLDivElement>(null);

  const [formData,   setFormData]   = useState<FormData>({
    name: "", phone: "", email: "", subject: "", message: "",
  });
  const [errors,     setErrors]     = useState<FormErrors>({});
  const [formState,  setFormState]  = useState<FormState>("idle");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  /* ── GSAP hero ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-badge",    { y: -25, opacity: 0, duration: 0.5, delay: 0.1 });
      gsap.from(".contact-title",    { y:  50, opacity: 0, duration: 0.7, delay: 0.2 });
      gsap.from(".contact-subtitle", { y:  30, opacity: 0, duration: 0.5, delay: 0.35 });
      gsap.from(".contact-card",     {
        y: 30, opacity: 0, duration: 0.5,
        stagger: 0.12, delay: 0.5,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── GSAP scroll reveals ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-contact").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Validation ─── */
  function validate(): boolean {
    const errs: FormErrors = {};
    if (!formData.name.trim())
      errs.name    = locale === "am" ? "ስም ያስፈልጋል"
                   : locale === "om" ? "Maqaan barbaachisa"
                   : "Name is required";
    if (!formData.phone.trim())
      errs.phone   = locale === "am" ? "ስልክ ቁጥር ያስፈልጋል"
                   : locale === "om" ? "Lakkoobsi bilbilaa barbaachisa"
                   : "Phone is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      errs.email   = locale === "am" ? "ትክክለኛ ኢሜይል አስገቡ"
                   : locale === "om" ? "Imeelii sirrii galchi"
                   : "Enter a valid email";
    if (!formData.message.trim())
      errs.message = locale === "am" ? "መልዕክት ያስፈልጋል"
                   : locale === "om" ? "Ergaan barbaachisa"
                   : "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* ── Submit ─── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const dayLabel = (d: (typeof OFFICE_HOURS)[0]["day"]) =>
    locale === "am" ? d.am : locale === "om" ? d.om : d.en;

  const timeLabel = (
    t2: string | { en: string; am: string; om: string }
  ) =>
    typeof t2 === "string"
      ? t2
      : locale === "am" ? t2.am : locale === "om" ? t2.om : t2.en;

  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative py-24 lg:py-32 overflow-hidden
                   bg-gradient-to-b from-dark-800 to-dark-900"
      >
        {/* BG orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px]
                        bg-brand/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px]
                        bg-brand/4 rounded-full blur-[80px] pointer-events-none" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="contact-badge mb-5">
              <Badge dot animate>{t("contact.badge")}</Badge>
            </div>
            <h1 className="contact-title text-5xl sm:text-6xl lg:text-7xl
                           font-black text-white mb-5 leading-tight">
              {t("contact.title")}
              <br />
              <span className="text-gradient">
                {locale === "am" ? "ዝግጁ ነን"
                 : locale === "om" ? "Qophii Jirra"
                 : "We're Ready"}
              </span>
            </h1>
            <p className="contact-subtitle text-white/55 text-lg max-w-xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Quick contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phone 1 */}
            <a href={`tel:${COMPANY.phone1}`}>
              <motion.div
                className="contact-card group glass-brand border border-brand/20
                           rounded-2xl p-5 text-center cursor-pointer
                           hover:border-brand/40 hover:shadow-brand-sm
                           transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand/20 border
                                border-brand/30 flex items-center justify-center
                                mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Phone size={20} className="text-brand" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  {t("contact.phone")} 1
                </p>
                <p className="text-white font-bold text-sm group-hover:text-brand
                              transition-colors">
                  {COMPANY.phone1}
                </p>
              </motion.div>
            </a>

            {/* Phone 2 */}
            <a href={`tel:${COMPANY.phone2}`}>
              <motion.div
                className="contact-card group glass border border-white/8
                           rounded-2xl p-5 text-center cursor-pointer
                           hover:border-brand/25 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/15
                                border border-blue-500/30 flex items-center
                                justify-center mx-auto mb-3
                                group-hover:scale-110 transition-transform">
                  <Phone size={20} className="text-blue-400" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  {t("contact.phone")} 2
                </p>
                <p className="text-white font-bold text-sm group-hover:text-brand
                              transition-colors">
                  {COMPANY.phone2}
                </p>
              </motion.div>
            </a>

            {/* Email */}
            <a href={`mailto:${COMPANY.email}`}>
              <motion.div
                className="contact-card group glass border border-white/8
                           rounded-2xl p-5 text-center cursor-pointer
                           hover:border-brand/25 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/15
                                border border-purple-500/30 flex items-center
                                justify-center mx-auto mb-3
                                group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-purple-400" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  {t("contact.email")}
                </p>
                <p className="text-white font-bold text-xs group-hover:text-brand
                              transition-colors break-all">
                  {COMPANY.email}
                </p>
              </motion.div>
            </a>

            {/* Address */}
            <motion.div
              className="contact-card group glass border border-white/8
                         rounded-2xl p-5 text-center cursor-pointer
                         hover:border-brand/25 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15
                              border border-amber-500/30 flex items-center
                              justify-center mx-auto mb-3
                              group-hover:scale-110 transition-transform">
                <MapPin size={20} className="text-amber-400" />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                {t("contact.address")}
              </p>
              <p className="text-white font-bold text-xs group-hover:text-brand
                            transition-colors leading-snug">
                Kera Sufi Tower, 3F, Office 305
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MAIN — FORM + INFO
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ── LEFT · Contact Form (3/5) ─────────── */}
            <div className="lg:col-span-3 reveal-contact">
              <div className="glass-dark border border-white/8 rounded-3xl
                              p-8 sm:p-10 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-40 h-40
                                bg-brand/5 rounded-full blur-[60px]
                                pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-brand/20
                                    border border-brand/30 flex items-center
                                    justify-center">
                      <MessageSquare size={18} className="text-brand" />
                    </div>
                    <h2 className="text-white font-black text-2xl">
                      {t("contact.title")}
                    </h2>
                  </div>
                  <p className="text-white/45 text-sm mb-8 ml-[52px]">
                    {locale === "am"
                      ? "ሁሉንም ሜዳዎቹን ይሙሉ — ወዲያው እናገኝዎታለን"
                      : locale === "om"
                      ? "Dirreewwan hunda guutaa — saffisaan nu quunnamna"
                      : "Fill in all fields — we'll get back to you quickly"}
                  </p>

                  <AnimatePresence mode="wait">
                    {formState === "success" ? (
                      /* Success state */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-14"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                          className="w-20 h-20 rounded-full bg-brand/20
                                     border border-brand/30 flex items-center
                                     justify-center mx-auto mb-6"
                        >
                          <CheckCircle2 size={40} className="text-brand" />
                        </motion.div>
                        <h3 className="text-white font-black text-2xl mb-3">
                          {locale === "am"
                            ? "ተልኳል!"
                            : locale === "om"
                            ? "Ergame!"
                            : "Message Sent!"}
                        </h3>
                        <p className="text-white/55 mb-6 max-w-xs mx-auto">
                          {t("contact.form_success")}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setFormState("idle")}
                          className="px-6 py-2.5 rounded-xl border border-brand/40
                                     text-brand text-sm hover:bg-brand/10
                                     transition-colors"
                        >
                          {locale === "am" ? "ሌላ ይላኩ"
                           : locale === "om" ? "Kan Biroo Ergi"
                           : "Send Another"}
                        </motion.button>
                      </motion.div>
                    ) : (
                      /* Form */
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        {/* Row: Name + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Field
                            label={t("contact.form_name")}
                            name="name"
                            placeholder={
                              locale === "am" ? "ሙሉ ስምዎ"
                              : locale === "om" ? "Maqaa guutuu keessan"
                              : "Your full name"
                            }
                            icon={User}
                            value={formData.name}
                            error={errors.name}
                            locale={locale}
                            onChange={handleChange}
                            required
                          />
                          <Field
                            label={t("contact.form_phone")}
                            name="phone"
                            type="tel"
                            placeholder="+251 9xx xxx xxx"
                            icon={Phone}
                            value={formData.phone}
                            error={errors.phone}
                            locale={locale}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* Email */}
                        <Field
                          label={t("contact.form_email")}
                          name="email"
                          type="email"
                          placeholder="example@email.com"
                          icon={AtSign}
                          value={formData.email}
                          error={errors.email}
                          locale={locale}
                          onChange={handleChange}
                        />

                        {/* Subject */}
                        <Field
                          label={
                            locale === "am" ? "ርዕሰ ጉዳይ"
                            : locale === "om" ? "Mata Duree"
                            : "Subject"
                          }
                          name="subject"
                          placeholder={
                            locale === "am" ? "ጥያቄዎን ይምረጡ..."
                            : locale === "om" ? "Gaaffii keessan filaa..."
                            : "Select your inquiry..."
                          }
                          icon={MessageSquare}
                          as="select"
                          value={formData.subject}
                          error={errors.subject}
                          locale={locale}
                          onChange={handleChange}
                        />

                        {/* Message */}
                        <Field
                          label={t("contact.form_message")}
                          name="message"
                          placeholder={
                            locale === "am"
                              ? "መልዕክትዎን ይጻፉ..."
                              : locale === "om"
                              ? "Ergaa keessan barreessaa..."
                              : "Write your message here..."
                          }
                          icon={MessageSquare}
                          value={formData.message}
                          error={errors.message}
                          locale={locale}
                          onChange={handleChange}
                          required
                          as="textarea"
                        />

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={formState === "loading"}
                          className="w-full flex items-center justify-center
                                     gap-3 py-4 rounded-xl bg-gradient-brand
                                     text-dark-900 font-bold text-base
                                     shadow-brand hover:shadow-brand-lg
                                     transition-all duration-300
                                     disabled:opacity-70"
                        >
                          {formState === "loading" ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              {locale === "am" ? "እየተላከ..."
                               : locale === "om" ? "Ergamaa jira..."
                               : "Sending..."}
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              {t("contact.form_submit")}
                            </>
                          )}
                        </motion.button>

                        <p className="text-white/30 text-xs text-center">
                          {locale === "am"
                            ? "ያስገቡት ማንኛውም መረጃ ሚስጥራዊ ነው"
                            : locale === "om"
                            ? "Odeeffannoo galchitan kamiyyuu dhokataa dha"
                            : "All information submitted is kept confidential"}
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── RIGHT · Info (2/5) ───────────────── */}
            <div className="lg:col-span-2 space-y-5 reveal-contact">

              {/* Office hours */}
              <div className="glass border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-brand/15
                                  border border-brand/25 flex items-center
                                  justify-center">
                    <Clock size={16} className="text-brand" />
                  </div>
                  <h3 className="text-white font-bold text-base">
                    {locale === "am" ? "የቢሮ ሰዓቶች"
                     : locale === "om" ? "Saatii Biiroo"
                     : "Office Hours"}
                  </h3>
                </div>
                <div className="space-y-3">
                  {OFFICE_HOURS.map((row) => (
                    <div
                      key={row.day.en}
                      className="flex justify-between items-center
                                 py-2 border-b border-white/5 last:border-0"
                    >
                      {(() => {
                        const label = timeLabel(row.time);
                        const closedLabel =
                          locale === "am" ? "ዝግ" : locale === "om" ? "Cufaa" : "Closed";

                        return (
                          <>
                      <span className="text-white/60 text-sm">
                        {dayLabel(row.day)}
                      </span>
                      <span className={cn(
                        "text-sm font-semibold",
                        label === closedLabel ? "text-red-400" : "text-brand"
                      )}>
                        {label}
                      </span>
                          </>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Full address */}
              <div className="glass border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15
                                  border border-amber-500/25 flex items-center
                                  justify-center">
                    <MapPin size={16} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-base">
                    {t("contact.address")}
                  </h3>
                </div>
                <div className="space-y-2 text-white/60 text-sm leading-relaxed">
                  <p className="text-white font-semibold">
                    {locale === "am"
                      ? "ሉሉአት አልሸርቅ ኤጀንሲ"
                      : locale === "om"
                      ? "Ejensii Luluat Alsharq"
                      : "Luluat Alsharq Agency"}
                  </p>
                  <p>{t("contact.address_value")}</p>
                  <p className="pt-2">
                    <span className="text-brand font-medium">
                      {locale === "am" ? "ስልክ: "
                       : locale === "om" ? "Bilbila: "
                       : "Tel: "}
                    </span>
                    {COMPANY.phone1} / {COMPANY.phone2}
                  </p>
                  <p>
                    <span className="text-brand font-medium">Email: </span>
                    {COMPANY.email}
                  </p>
                  <p>
                    <span className="text-brand font-medium">TIN: </span>
                    {COMPANY.tin}
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="glass border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-bold text-base mb-4">
                  {t("footer.follow")}
                </h3>
                <div className="flex gap-3">
                  {SOCIAL.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      whileHover={{ scale: 1.12, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex flex-col items-center gap-1.5
                                  py-3 rounded-xl border transition-colors
                                  ${color}`}
                    >
                      <Icon size={20} />
                      <span className="text-xs font-medium opacity-80">
                        {label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div className="glass-brand border border-brand/25 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/20
                                  border border-brand/30 flex items-center
                                  justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={16} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">
                      {locale === "am" ? "ፈጣን ምላሽ ዋስትና"
                       : locale === "om" ? "Waadaa Deebii Saffisaa"
                       : "Fast Response Guarantee"}
                    </p>
                    <p className="text-white/55 text-xs leading-relaxed">
                      {locale === "am"
                        ? "ሁሉም ጥያቄዎች ውስጥ 24 ሰዓት ምላሽ ይሰጣሉ። ለአፋጣኝ ጉዳዮች ቀጥታ ይደውሉ።"
                        : locale === "om"
                        ? "Gaaffii hunda sa'aatii 24 keessatti ni deebifna. Dhimmoota hatattamaatiif kallattiin bilbilaa."
                        : "All inquiries are responded to within 24 hours. For urgent matters, call directly."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MAP PLACEHOLDER
      ══════════════════════════════════════════════ */}
      <section className="py-8 lg:py-12 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-contact">
            <h2 className="text-2xl font-black text-white mb-6">
              {locale === "am" ? "አድራሻችን ያግኙን"
               : locale === "om" ? "Nu Argadhaa"
               : "Find Our Office"}
            </h2>
            <div className="relative rounded-3xl overflow-hidden border
                            border-white/10 h-72 sm:h-96
                            bg-dark-800 flex items-center justify-center">
              {/* Map placeholder */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand/20
                                border border-brand/40 flex items-center
                                justify-center">
                  <MapPin size={30} className="text-brand" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-base">
                    Kera Sufi Tower, 3rd Floor
                  </p>
                  <p className="text-white/50 text-sm">
                    Office No. 305, Nefas Silk-Lafto, Addis Ababa
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kera+Sufi+Tower+Addis+Ababa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3
                               text-brand text-sm hover:underline"
                  >
                    {locale === "am" ? "Google Maps ላይ ይክፈቱ"
                     : locale === "om" ? "Google Maps irratti bani"
                     : "Open in Google Maps"}
                    <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="reveal-contact text-center mb-12">
            <Badge dot className="mb-4">
              {locale === "am" ? "ተደጋጋሚ ጥያቄዎች"
               : locale === "om" ? "Gaaffii Irra Deddeebi'uu"
               : "FAQ"}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {locale === "am" ? "የሚጠየቁ ጥያቄዎች"
               : locale === "om" ? "Gaaffilee Yeroo Hunda Gaafatamu"
               : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="reveal-contact space-y-3">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass border border-white/8 rounded-2xl overflow-hidden
                           hover:border-brand/25 transition-colors duration-300"
              >
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === i ? null : i)
                  }
                  className="w-full flex items-center justify-between
                             p-5 text-left"
                >
                  <span className="text-white font-semibold text-sm
                                   pr-4 leading-relaxed">
                    {locale === "am" ? item.q.am
                     : locale === "om" ? item.q.om
                     : item.q.en}
                  </span>
                  <motion.div
                    animate={{ rotate: activeAccordion === i ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight
                      size={18}
                      className={cn(
                        "transition-colors",
                        activeAccordion === i ? "text-brand" : "text-white/30"
                      )}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="w-full h-px bg-brand/15 mb-4" />
                        <p className="text-white/60 text-sm leading-relaxed">
                          {locale === "am" ? item.a.am
                           : locale === "om" ? item.a.om
                           : item.a.en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
