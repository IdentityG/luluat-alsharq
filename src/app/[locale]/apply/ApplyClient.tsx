"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations }  from "next-intl";
import Link                            from "next/link";
import { motion, AnimatePresence }     from "framer-motion";
import { gsap }                        from "gsap";
import {
  User, Phone, Mail, MapPin,
  Briefcase, GraduationCap, Globe2,
  CheckCircle2, ArrowRight, ArrowLeft,
  Loader2, AlertCircle, FileText,
  Sparkles, Star, Shield,
  Upload,
  Home, UtensilsCrossed, HardHat,
  HeartPulse, Car,
} from "lucide-react";
import Badge   from "@/components/ui/Badge";
import { COMPANY } from "@/lib/constants";
import { cn }      from "@/lib/utils";

/* ─────────────────────────────────────
   TYPES
───────────────────────────────────── */
interface ApplyFormData {
  /* Step 1 */
  fullName:    string;
  age:         string;
  gender:      string;
  phone:       string;
  email:       string;
  city:        string;
  /* Step 2 */
  education:   string;
  experience:  string;
  languages:   string[];
  skills:      string;
  /* Step 3 */
  destination: string;
  jobType:     string;
  availability:string;
  salary:      string;
  /* Step 4 */
  passportReady: string;
  medicalReady:  string;
  message:       string;
  agreeTerms:    boolean;
}

type Step = 1 | 2 | 3 | 4;
type FormState = "idle" | "loading" | "success";
type LocaleCode = "en" | "am" | "om";
type LocalizedLabel = { en: string; am: string; om: string };
type SelectOption = { value: string; label: LocalizedLabel };

/* ─────────────────────────────────────
   STATIC DATA
───────────────────────────────────── */
const DESTINATIONS = [
  { value: "dubai",   label: { en: "Dubai, UAE",     am: "ዱባይ፣ ዩኤኢ",       om: "Dubaayi, UAE"       }, flag: "🇦🇪" },
  { value: "saudi",   label: { en: "Saudi Arabia",   am: "ሳዑዲ አረቢያ",        om: "Saa'udii Arabiyaa"  }, flag: "🇸🇦" },
  { value: "qatar",   label: { en: "Qatar",          am: "ቃጣር",              om: "Qaxar"              }, flag: "🇶🇦" },
  { value: "kuwait",  label: { en: "Kuwait",         am: "ኩዌት",             om: "Kuwayt"             }, flag: "🇰🇼" },
  { value: "bahrain", label: { en: "Bahrain",        am: "ባህሬን",             om: "Baahireyn"          }, flag: "🇧🇭" },
];

const JOB_TYPES = [
  { value: "domestic",     icon: Home,              label: { en: "Domestic Worker",     am: "የቤት ሰራተኛ",              om: "Hojjataa Mana"              } },
  { value: "hospitality",  icon: UtensilsCrossed,   label: { en: "Hospitality Staff",   am: "የማስተናገጃ ሰራተኛ",          om: "Hojjataa Keessummeessaa"    } },
  { value: "construction", icon: HardHat,           label: { en: "Construction Worker", am: "የግንባታ ሰራተኛ",            om: "Hojjataa Ijaarsaa"          } },
  { value: "healthcare",   icon: HeartPulse,        label: { en: "Healthcare Worker",   am: "የጤና ሰራተኛ",              om: "Hojjataa Fayyaa"            } },
  { value: "driver",       icon: Car,               label: { en: "Professional Driver", am: "ሙያዊ ሹፌር",               om: "Konkolaachisaa Ogummaa"     } },
  { value: "security",     icon: Shield,            label: { en: "Security Personnel",  am: "የደህንነት ሰራተኛ",           om: "Hojjataa Nageenyaa"         } },
];

const LANGUAGES_LIST = [
  { value: "arabic",  label: { en: "Arabic",   am: "አረብኛ",      om: "Afaan Arabaa"  } },
  { value: "english", label: { en: "English",  am: "እንግሊዝኛ",   om: "Afaan Inglizii" } },
  { value: "amharic", label: { en: "Amharic",  am: "አማርኛ",      om: "Afaan Amaaraa" } },
  { value: "oromo",   label: { en: "Afaan Oromo", am: "ኦሮምኛ",  om: "Afaan Oromoo"  } },
];

const EDUCATION_OPTIONS = [
  { value: "primary",   label: { en: "Primary School",    am: "የመጀመሪያ ደረጃ ትምህርት",  om: "Mana Barumsaa Bu'uuraa"   } },
  { value: "secondary", label: { en: "Secondary School",  am: "ሁለተኛ ደረጃ ትምህርት",   om: "Mana Barumsaa Ol'aanaa"   } },
  { value: "diploma",   label: { en: "Diploma",           am: "ዲፕሎማ",               om: "Diipiloomaa"              } },
  { value: "degree",    label: { en: "Bachelor's Degree", am: "የመጀመሪያ ዲግሪ",        om: "Digirii Jalqabaa"         } },
  { value: "masters",   label: { en: "Masters / Above",   am: "ማስተርስ / ከዚያ በላይ",   om: "Maastars / Ol'aantii"     } },
];

const EXPERIENCE_OPTIONS = [
  { value: "none",    label: { en: "No Experience",    am: "ልምድ የለም",     om: "Muuxannoo Hin Qabu"   } },
  { value: "1year",   label: { en: "Less than 1 year", am: "ከ1 ዓመት በታች", om: "Waggaa 1 Gadii"       } },
  { value: "1-3",     label: { en: "1 – 3 years",      am: "1 – 3 ዓመታት",  om: "Waggaa 1 – 3"         } },
  { value: "3-5",     label: { en: "3 – 5 years",      am: "3 – 5 ዓመታት",  om: "Waggaa 3 – 5"         } },
  { value: "5plus",   label: { en: "5+ years",         am: "5+ ዓመታት",     om: "Waggaa 5+"            } },
];

const AVAILABILITY_OPTIONS = [
  { value: "immediate", label: { en: "Immediately",        am: "ወዲያው",              om: "Amma Danda'ama"         } },
  { value: "1month",    label: { en: "Within 1 month",     am: "በ1 ወር ውስጥ",        om: "Ji'a 1 Keessatti"       } },
  { value: "3months",   label: { en: "Within 3 months",    am: "በ3 ወር ውስጥ",        om: "Ji'a 3 Keessatti"       } },
  { value: "6months",   label: { en: "Within 6 months",    am: "በ6 ወር ውስጥ",        om: "Ji'a 6 Keessatti"       } },
];

/* ─────────────────────────────────────
   STEP CONFIG
───────────────────────────────────── */
const STEPS = [
  {
    id: 1 as Step,
    icon: User,
    label: { en: "Personal Info",  am: "የግል መረጃ",       om: "Odeeffannoo Dhuunfaa" },
    color: "text-brand      bg-brand/15      border-brand/30",
  },
  {
    id: 2 as Step,
    icon: GraduationCap,
    label: { en: "Qualifications", am: "ብቃቶች",          om: "Dandeettiwwan"        },
    color: "text-blue-400   bg-blue-500/15   border-blue-500/30",
  },
  {
    id: 3 as Step,
    icon: Globe2,
    label: { en: "Preferences",    am: "ምርጫዎች",         om: "Filannoolee"          },
    color: "text-purple-400 bg-purple-500/15 border-purple-500/30",
  },
  {
    id: 4 as Step,
    icon: FileText,
    label: { en: "Final Details",  am: "የመጨረሻ ዝርዝሮች",  om: "Bal'ina Dhumaa"       },
    color: "text-amber-400  bg-amber-500/15  border-amber-500/30",
  },
];

interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  hasErr: boolean;
  locale: LocaleCode;
  onChange: (value: string) => void;
}

function InputField({
  label,
  value,
  type = "text",
  placeholder,
  required,
  hasErr,
  locale,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-semibold
                        uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3.5 rounded-xl bg-white/5",
          "border text-white text-sm placeholder-white/30",
          "focus:outline-none transition-all duration-200",
          hasErr
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-brand/50 focus:bg-brand/5"
        )}
      />
      {hasErr && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
          <AlertCircle size={11} />
          {locale === "am" ? "ይህ መስክ ያስፈልጋል"
           : locale === "om" ? "Dirreen kun barbaachisa"
           : "This field is required"}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  hasErr: boolean;
  locale: LocaleCode;
  getLabel: (obj: LocalizedLabel) => string;
  onChange: (value: string) => void;
}

function SelectField({
  label,
  value,
  options,
  placeholder,
  required,
  hasErr,
  locale,
  getLabel,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-semibold
                        uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-3.5 rounded-xl bg-dark-700",
          "border text-white text-sm",
          "focus:outline-none transition-all duration-200 appearance-none",
          hasErr
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-brand/50"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {getLabel(opt.label)}
          </option>
        ))}
      </select>
      {hasErr && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
          <AlertCircle size={11} />
          {locale === "am" ? "ይህ መስክ ያስፈልጋል"
           : locale === "om" ? "Dirreen kun barbaachisa"
           : "This field is required"}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────
   COMPONENT
───────────────────────────────────── */
export default function ApplyClient() {
  const t      = useTranslations();
  const locale = useLocale() as LocaleCode;

  const heroRef  = useRef<HTMLDivElement>(null);
  const [step,       setStep]       = useState<Step>(1);
  const [formState,  setFormState]  = useState<FormState>("idle");
  const [errors,     setErrors]     = useState<Partial<ApplyFormData>>({});

  const [formData, setFormData] = useState<ApplyFormData>({
    fullName: "", age: "", gender: "", phone: "",
    email: "", city: "", education: "", experience: "",
    languages: [], skills: "", destination: "",
    jobType: "", availability: "", salary: "",
    passportReady: "", medicalReady: "", message: "",
    agreeTerms: false,
  });

  /* ── GSAP hero ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".apply-badge",    { y: -20, opacity: 0, duration: 0.5, delay: 0.1 });
      gsap.from(".apply-title",    { y:  40, opacity: 0, duration: 0.6, delay: 0.2 });
      gsap.from(".apply-subtitle", { y:  25, opacity: 0, duration: 0.5, delay: 0.35 });
      gsap.from(".apply-step",     { y:  20, opacity: 0, duration: 0.4,
                                     stagger: 0.08, delay: 0.45 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── Helpers ─── */
  function update<K extends keyof ApplyFormData>(
    key: K, val: ApplyFormData[K]
  ) {
    setFormData((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function toggleLanguage(lang: string) {
    setFormData((p) => ({
      ...p,
      languages: p.languages.includes(lang)
        ? p.languages.filter((l) => l !== lang)
        : [...p.languages, lang],
    }));
  }

  function getLabel(
    obj: { en: string; am: string; om: string }
  ) {
    return locale === "am" ? obj.am : locale === "om" ? obj.om : obj.en;
  }

  /* ── Validation per step ─── */
  function validateStep(): boolean {
    const errs: Partial<ApplyFormData> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = "required";
      if (!formData.age.trim())      errs.age      = "required";
      if (!formData.phone.trim())    errs.phone    = "required";
      if (!formData.gender)          errs.gender   = "required";
    }
    if (step === 2) {
      if (!formData.education)  errs.education  = "required";
      if (!formData.experience) errs.experience = "required";
    }
    if (step === 3) {
      if (!formData.destination) errs.destination = "required";
      if (!formData.jobType)     errs.jobType     = "required";
    }
    if (step === 4) {
      if (!formData.agreeTerms) errs.agreeTerms = false;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, 4) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 2200));
    setFormState("success");
  }

  /* ── STEP CONTENT ─── */
  const stepContent: Record<Step, React.ReactNode> = {
    /* ──────────── Step 1 · Personal ──────────── */
    1: (
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label={t("apply.name")}
            value={formData.fullName}
            placeholder={locale === "am" ? "ሙሉ ስምዎ" : locale === "om" ? "Maqaa guutuu keessan" : "Your full name"}
            hasErr={!!errors.fullName}
            locale={locale}
            onChange={(value) => update("fullName", value)}
            required
          />
          <InputField
            label={t("apply.age")}
            value={formData.age}
            type="number"
            placeholder={locale === "am" ? "ዕድሜዎ" : locale === "om" ? "Umrii keessan" : "Your age"}
            hasErr={!!errors.age}
            locale={locale}
            onChange={(value) => update("age", value)}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {locale === "am" ? "ፆታ" : locale === "om" ? "Saala" : "Gender"}
            <span className="text-brand ml-0.5">*</span>
          </label>
          <div className="flex gap-3">
            {[
              { value: "female", label: { en: "Female", am: "ሴት", om: "Dubartii" } },
              { value: "male",   label: { en: "Male",   am: "남",   om: "Dhiira"  } },
            ].map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => update("gender", g.value)}
                className={cn(
                  "flex-1 py-3 rounded-xl border text-sm font-semibold",
                  "transition-all duration-200",
                  formData.gender === g.value
                    ? "bg-brand/15 border-brand/50 text-brand"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/25"
                )}
              >
                {getLabel(g.label)}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
              <AlertCircle size={11} />
              {locale === "am" ? "ፆታ ይምረጡ" : locale === "om" ? "Saala filadhu" : "Select gender"}
            </p>
          )}
        </div>

        <InputField
          label={t("apply.phone")}
          value={formData.phone}
          type="tel"
          placeholder="+251 9xx xxx xxx" required
          hasErr={!!errors.phone}
          locale={locale}
          onChange={(value) => update("phone", value)}
        />
        <InputField
          label={t("contact.form_email")}
          value={formData.email}
          type="email"
          placeholder="example@email.com"
          hasErr={!!errors.email}
          locale={locale}
          onChange={(value) => update("email", value)}
        />
        <InputField
          label={locale === "am" ? "ከተማ" : locale === "om" ? "Magaalaa" : "City / Region"}
          value={formData.city}
          placeholder={
            locale === "am" ? "አዲስ አበባ ወይም ሌላ ከተማ"
            : locale === "om" ? "Finfinnee ykn magaalaa biraa"
            : "Addis Ababa or other city"
          }
          hasErr={!!errors.city}
          locale={locale}
          onChange={(value) => update("city", value)}
        />
      </div>
    ),

    /* ──────────── Step 2 · Qualifications ─────── */
    2: (
      <div className="space-y-5">
        <SelectField
          label={t("apply.education")}
          value={formData.education}
          options={EDUCATION_OPTIONS}
          placeholder={
            locale === "am" ? "የትምህርት ደረጃ ይምረጡ"
            : locale === "om" ? "Sadarkaa barnootaa filaa"
            : "Select education level"
          }
          hasErr={!!errors.education}
          locale={locale}
          getLabel={getLabel}
          onChange={(value) => update("education", value)}
          required
        />

        <SelectField
          label={t("apply.experience")}
          value={formData.experience}
          options={EXPERIENCE_OPTIONS}
          placeholder={
            locale === "am" ? "የሥራ ልምድ ይምረጡ"
            : locale === "om" ? "Muuxannoo hojii filaa"
            : "Select work experience"
          }
          hasErr={!!errors.experience}
          locale={locale}
          getLabel={getLabel}
          onChange={(value) => update("experience", value)}
          required
        />

        {/* Languages */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {locale === "am" ? "ቋንቋዎች"
             : locale === "om" ? "Afaanota"
             : "Languages Known"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES_LIST.map((lang) => {
              const selected = formData.languages.includes(lang.value);
              return (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => toggleLanguage(lang.value)}
                  className={cn(
                    "py-3 px-4 rounded-xl border text-sm font-medium",
                    "transition-all duration-200 text-left flex items-center gap-2",
                    selected
                      ? "bg-brand/15 border-brand/50 text-brand"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-white/25"
                  )}
                >
                  {selected
                    ? <CheckCircle2 size={14} className="text-brand flex-shrink-0" />
                    : <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />
                  }
                  {getLabel(lang.label)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills textarea */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-1.5">
            {locale === "am" ? "ልዩ ክህሎቶች (አማራጭ)"
             : locale === "om" ? "Dandeettii Addaa (Filannooa)"
             : "Special Skills (Optional)"}
          </label>
          <textarea
            value={formData.skills}
            onChange={(e) => update("skills", e.target.value)}
            placeholder={
              locale === "am"
                ? "ምሳሌ: ምግብ ማብሰል፣ ሕፃናት ማስተማር፣ ኮምፒዩተር..."
                : locale === "om"
                ? "Fkn: Nyaata bilcheessuu, daa'imman barsiisuu, Kompiutera..."
                : "e.g. Cooking, Childcare, Computer skills..."
            }
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5
                       border border-white/10 text-white text-sm
                       placeholder-white/30 resize-none
                       focus:border-brand/50 focus:outline-none
                       transition-all duration-200"
          />
        </div>
      </div>
    ),

    /* ──────────── Step 3 · Preferences ─────────── */
    3: (
      <div className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {t("apply.destination")}
            <span className="text-brand ml-0.5">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DESTINATIONS.map((d) => {
              const selected = formData.destination === d.value;
              return (
                <motion.button
                  key={d.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => update("destination", d.value)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border",
                    "transition-all duration-200 text-left",
                    selected
                      ? "bg-brand/15 border-brand/50 shadow-brand-sm"
                      : "bg-white/5 border-white/10 hover:border-white/25"
                  )}
                >
                  <span className="text-2xl">{d.flag}</span>
                  <span className={cn(
                    "font-semibold text-sm",
                    selected ? "text-brand" : "text-white/70"
                  )}>
                    {getLabel(d.label)}
                  </span>
                  {selected && (
                    <CheckCircle2
                      size={16}
                      className="text-brand ml-auto flex-shrink-0"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          {errors.destination && (
            <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2">
              <AlertCircle size={11} />
              {locale === "am" ? "መድረሻ ይምረጡ"
               : locale === "om" ? "Bakka filaa"
               : "Please select a destination"}
            </p>
          )}
        </div>

        {/* Job type */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {t("apply.job_type")}
            <span className="text-brand ml-0.5">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {JOB_TYPES.map((job) => {
              const Icon     = job.icon;
              const selected = formData.jobType === job.value;
              return (
                <motion.button
                  key={job.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => update("jobType", job.value)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border",
                    "transition-all duration-200 text-left",
                    selected
                      ? "bg-brand/15 border-brand/50 shadow-brand-sm"
                      : "bg-white/5 border-white/10 hover:border-white/25"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    "border flex-shrink-0",
                    selected
                      ? "bg-brand/20 border-brand/40 text-brand"
                      : "bg-white/5 border-white/15 text-white/50"
                  )}>
                    <Icon size={18} />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm",
                    selected ? "text-brand" : "text-white/70"
                  )}>
                    {getLabel(job.label)}
                  </span>
                  {selected && (
                    <CheckCircle2
                      size={16}
                      className="text-brand ml-auto flex-shrink-0"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          {errors.jobType && (
            <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2">
              <AlertCircle size={11} />
              {locale === "am" ? "የሥራ ዓይነት ይምረጡ"
               : locale === "om" ? "Gosa hojii filaa"
               : "Please select a job type"}
            </p>
          )}
        </div>

        <SelectField
          label={locale === "am" ? "ተገኝነት" : locale === "om" ? "Argamummaa" : "Availability"}
          value={formData.availability}
          options={AVAILABILITY_OPTIONS}
          placeholder={
            locale === "am" ? "መቼ ዝግጁ ነዎት?"
            : locale === "om" ? "Yoom qophii dha?"
            : "When are you available?"
          }
          hasErr={!!errors.availability}
          locale={locale}
          getLabel={getLabel}
          onChange={(value) => update("availability", value)}
        />

        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-1.5">
            {locale === "am" ? "የሚጠበቅ ወርሃዊ ደሞዝ (USD)"
             : locale === "om" ? "Mindaa Ji'aa Eegamu (USD)"
             : "Expected Monthly Salary (USD)"}
          </label>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => update("salary", e.target.value)}
            placeholder={
              locale === "am" ? "ምሳሌ: 400"
              : locale === "om" ? "Fkn: 400"
              : "e.g. 400"
            }
            className="w-full px-4 py-3.5 rounded-xl bg-white/5
                       border border-white/10 text-white text-sm
                       placeholder-white/30
                       focus:border-brand/50 focus:outline-none
                       transition-all duration-200"
          />
        </div>
      </div>
    ),

    /* ──────────── Step 4 · Final Details ──────── */
    4: (
      <div className="space-y-5">
        {/* Passport */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {locale === "am" ? "ፓስፖርት ዝግጁ ነው?"
             : locale === "om" ? "Paaspoortiin Qophaa'eera?"
             : "Is your passport ready?"}
          </label>
          <div className="flex gap-3">
            {[
              { value: "yes",  label: { en: "Yes", am: "አዎ",  om: "Eeyyee" } },
              { value: "no",   label: { en: "No",  am: "አይደለም", om: "Miti" } },
              { value: "soon", label: { en: "Getting Soon", am: "ቅርቡን", om: "Dafan" } },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("passportReady", opt.value)}
                className={cn(
                  "flex-1 py-3 rounded-xl border text-sm font-medium",
                  "transition-all duration-200",
                  formData.passportReady === opt.value
                    ? "bg-brand/15 border-brand/50 text-brand"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/25"
                )}
              >
                {getLabel(opt.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Medical */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {locale === "am" ? "የሕክምና ምርመራ ሰርተፍኬት ዝግጁ ነው?"
             : locale === "om" ? "Waraqaa Ragaa Fayyaa Qophaa'eera?"
             : "Is your medical certificate ready?"}
          </label>
          <div className="flex gap-3">
            {[
              { value: "yes",  label: { en: "Yes", am: "አዎ",  om: "Eeyyee" } },
              { value: "no",   label: { en: "No",  am: "አይደለም", om: "Miti" } },
              { value: "soon", label: { en: "Getting Soon", am: "ቅርቡን", om: "Dafan" } },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("medicalReady", opt.value)}
                className={cn(
                  "flex-1 py-3 rounded-xl border text-sm font-medium",
                  "transition-all duration-200",
                  formData.medicalReady === opt.value
                    ? "bg-brand/15 border-brand/50 text-brand"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/25"
                )}
              >
                {getLabel(opt.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Document upload placeholder */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-2">
            {locale === "am" ? "ሰነዶች ይጫኑ (አማራጭ)"
             : locale === "om" ? "Sanadoota Fe'i (Filannooa)"
             : "Upload Documents (Optional)"}
          </label>
          <div className="border-2 border-dashed border-white/15
                          rounded-2xl p-8 text-center
                          hover:border-brand/40 transition-colors
                          cursor-pointer group">
            <Upload
              size={28}
              className="mx-auto text-white/25 group-hover:text-brand/50
                         transition-colors mb-3"
            />
            <p className="text-white/40 text-sm">
              {locale === "am"
                ? "ፓስፖርት፣ ትምህርታዊ ሰርተፍኬቶችን ይጫኑ"
                : locale === "om"
                ? "Paaspoortii, waraqaalee barnootaa fe'i"
                : "Upload passport, educational certificates"}
            </p>
            <p className="text-white/25 text-xs mt-1">
              PDF, JPG, PNG — max 5MB
            </p>
          </div>
        </div>

        {/* Additional message */}
        <div>
          <label className="block text-white/60 text-xs font-semibold
                            uppercase tracking-wide mb-1.5">
            {locale === "am" ? "ተጨማሪ መልዕክት (አማራጭ)"
             : locale === "om" ? "Ergaa Dabalataaa (Filannooa)"
             : "Additional Message (Optional)"}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={
              locale === "am"
                ? "ሌላ ማካፈል የፈለጉት ነገር ካለ..."
                : locale === "om"
                ? "Waan dabalataa qooduuf barbaaddan yoo jiraate..."
                : "Anything else you'd like us to know..."
            }
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5
                       border border-white/10 text-white text-sm
                       placeholder-white/30 resize-none
                       focus:border-brand/50 focus:outline-none
                       transition-all duration-200"
          />
        </div>

        {/* Summary preview */}
        {(formData.fullName || formData.destination || formData.jobType) && (
          <div className="glass-brand border border-brand/20 rounded-2xl p-5">
            <p className="text-brand text-xs font-bold uppercase
                          tracking-widest mb-3">
              {locale === "am" ? "ማቅረቢያ ማጠቃለያ"
               : locale === "om" ? "Cuunfaa Dhiyeessituu"
               : "Application Summary"}
            </p>
            <div className="space-y-2 text-sm">
              {formData.fullName && (
                <div className="flex justify-between">
                  <span className="text-white/50">{t("apply.name")}</span>
                  <span className="text-white font-medium">{formData.fullName}</span>
                </div>
              )}
              {formData.destination && (
                <div className="flex justify-between">
                  <span className="text-white/50">{t("apply.destination")}</span>
                  <span className="text-white font-medium">
                    {getLabel(
                      DESTINATIONS.find((d) => d.value === formData.destination)
                        ?.label ?? { en: "", am: "", om: "" }
                    )}
                  </span>
                </div>
              )}
              {formData.jobType && (
                <div className="flex justify-between">
                  <span className="text-white/50">{t("apply.job_type")}</span>
                  <span className="text-white font-medium">
                    {getLabel(
                      JOB_TYPES.find((j) => j.value === formData.jobType)
                        ?.label ?? { en: "", am: "", om: "" }
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => update("agreeTerms", !formData.agreeTerms)}
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center",
                "border-2 flex-shrink-0 mt-0.5 transition-all duration-200",
                formData.agreeTerms
                  ? "bg-brand border-brand"
                  : "border-white/25 bg-transparent group-hover:border-brand/50"
              )}
            >
              {formData.agreeTerms && (
                <CheckCircle2 size={12} className="text-dark-900" />
              )}
            </div>
            <span className="text-white/60 text-sm leading-relaxed">
              {locale === "am"
                ? "ሁሉም የቀረቡ መረጃዎች ትክክለኛ መሆናቸውን አረጋግጣለሁ። ሉሉአት አልሸርቅ ለምዝገባ ዓላማ ያቀረቡትን መረጃ ሊጠቀምበት ይችላል።"
                : locale === "om"
                ? "Odeeffannoon dhiyaate hundi sirrii ta'uu isaa mirkaneessa. Luluat Alsharq odeeffannoo kana galmee irratti fayyadamuu danda'a."
                : "I confirm all submitted information is accurate. Luluat Alsharq may use this information for registration purposes."}
            </span>
          </label>
          {errors.agreeTerms !== undefined && !formData.agreeTerms && (
            <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5 ml-8">
              <AlertCircle size={11} />
              {locale === "am" ? "ይስማሙ"
               : locale === "om" ? "Waliigaluu"
               : "Please agree to continue"}
            </p>
          )}
        </div>
      </div>
    ),
  };

  /* ── Current step config ─── */
  const currentStepConfig = STEPS.find((s) => s.id === step)!;
  const StepIcon          = currentStepConfig.icon;

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative py-20 lg:py-28 overflow-hidden
                   bg-gradient-to-b from-dark-800 to-dark-900"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px]
                        bg-brand/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px]
                        bg-brand/4 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(107,255,60,1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(107,255,60,1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <div className="space-y-6">
              <div className="apply-badge">
                <Badge dot animate>{t("apply.badge")}</Badge>
              </div>
              <h1 className="apply-title text-5xl sm:text-6xl font-black
                             text-white leading-tight">
                {t("apply.title")}
                <br />
                <span className="text-gradient">
                  {locale === "am" ? "ወደ ዓለም አቀፍ ሥራ"
                   : locale === "om" ? "Hojii Idil-Addunyaatti"
                   : "For International Work"}
                </span>
              </h1>
              <p className="apply-subtitle text-white/55 text-lg leading-relaxed max-w-lg">
                {t("apply.subtitle")}
              </p>

              {/* Benefits */}
              <div className="space-y-2.5">
                {[
                  { en: "Free initial consultation",           am: "ነፃ የቅድሚያ ምክር",            om: "Gorsa jalqabaa bilisaa"              },
                  { en: "100% legal and transparent process",  am: "100% ህጋዊ እና ግልፅ ሂደት",    om: "Hojmaata 100% seeraa fi ifaa"        },
                  { en: "Response within 48 hours",           am: "በ48 ሰዓት ውስጥ ምላሽ",         om: "Sa'aatii 48 keessatti deebii"        },
                  { en: "Pre-departure training included",     am: "ከጉዞ በፊት ስልጠና ተካቷል",      om: "Leenjii dura deemsa dabalatee"       },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex items-center gap-2.5 text-white/70 text-sm"
                  >
                    <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                    {locale === "am" ? b.am : locale === "om" ? b.om : b.en}
                  </motion.div>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { v: "2,000+", l: { en: "Placed Workers",   am: "የተቀጠሩ ሰራተኞች",   om: "Hojjattoota Ramadaman" } },
                  { v: "98%",    l: { en: "Success Rate",     am: "የስኬት ምጣኔ",       om: "Sadarkaa Milkaa'inaa"  } },
                  { v: "48h",    l: { en: "Response Time",    am: "የምላሽ ጊዜ",        om: "Yeroo Deebii"          } },
                ].map((s, i) => (
                  <div key={i}
                    className="apply-step glass-brand border border-brand/20
                               rounded-xl px-4 py-2.5 text-center">
                    <p className="text-xl font-black text-gradient">{s.v}</p>
                    <p className="text-white/40 text-xs">{getLabel(s.l)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right · Social proof */}
            <div className="hidden lg:flex flex-col gap-4">
              {/* Recent applications */}
              <div className="glass border border-white/8 rounded-2xl p-5">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                  {locale === "am" ? "የቅርብ ጊዜ ማቅረቢያዎች"
                   : locale === "om" ? "Iyyannoo Dhiyoo"
                   : "Recent Applications"}
                </p>
                <div className="space-y-3">
                  {[
                    { name: "Almaz B.", dest: "Dubai, UAE",     job: "Domestic",    time: "2m ago"  },
                    { name: "Tadesse H.", dest: "Saudi Arabia", job: "Construction", time: "15m ago" },
                    { name: "Selamawit G.", dest: "Qatar",      job: "Hospitality",  time: "1h ago"  },
                  ].map((app, i) => (
                    <div key={i}
                      className="flex items-center gap-3 py-2
                                 border-b border-white/5 last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-gradient-brand
                                      flex items-center justify-center
                                      text-dark-900 font-bold text-xs flex-shrink-0">
                        {app.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">
                          {app.name}
                        </p>
                        <p className="text-white/40 text-xs truncate">
                          {app.job} · {app.dest}
                        </p>
                      </div>
                      <span className="text-brand text-[10px] font-medium flex-shrink-0">
                        {app.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial snippet */}
              <div className="glass-brand border border-brand/20 rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14}
                      className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic mb-4">
                  {locale === "am"
                    ? "\"ሉሉአት አልሸርቅ ሕይወቴን ቀይሮታል። ሂደቱ ሁሉ ቀላልና ህጋዊ ነበር። ሁሉም ዝርዝር ለሁሉም ሰው ምቾት ታሳቢ ተደርጎ ነው።\""
                    : locale === "om"
                    ? "\"Luluat Alsharq jireenyakoo jijjiire. Hojmaatni hundi salphaa fi seeraa ture.\""
                    : "\"Luluat Alsharq changed my life. The whole process was simple and legal. I highly recommend them!\""}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-brand
                                  flex items-center justify-center
                                  text-dark-900 font-bold text-xs">
                    AB
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Almaz Bekele</p>
                    <p className="text-brand text-xs">Now in Dubai, UAE</p>
                  </div>
                </div>
              </div>

              {/* Contact strip */}
              <div className="glass border border-white/8 rounded-2xl p-4
                              flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/15
                                border border-brand/30 flex items-center
                                justify-center flex-shrink-0">
                  <Phone size={16} className="text-brand" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">
                    {locale === "am" ? "ጥያቄ አለዎት?"
                     : locale === "om" ? "Gaaffii qabduu?"
                     : "Have questions?"}
                  </p>
                  <a href={`tel:${COMPANY.phone1}`}
                    className="text-white font-bold text-sm hover:text-brand
                               transition-colors">
                    {COMPANY.phone1}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MULTI-STEP FORM
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatePresence mode="wait">
            {formState === "success" ? (

              /* ── SUCCESS STATE ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-brand/20
                             border border-brand/30 flex items-center
                             justify-center mx-auto mb-8"
                >
                  <CheckCircle2 size={50} className="text-brand" />
                </motion.div>

                <Badge dot animate className="mb-6">
                  {locale === "am" ? "ስኬታማ ማቅረቢያ"
                   : locale === "om" ? "Iyyannoo Milkaa'aa"
                   : "Application Submitted!"}
                </Badge>

                <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                  {locale === "am" ? "እንኳን ደስ አለዎት!"
                   : locale === "om" ? "Baga Gammaddan!"
                   : "Congratulations!"}
                </h2>

                <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
                  {t("apply.success")}
                </p>

                {/* What happens next */}
                <div className="max-w-md mx-auto glass-brand border
                                border-brand/25 rounded-2xl p-6 mb-8 text-left">
                  <p className="text-brand text-xs font-bold uppercase
                                tracking-widest mb-4">
                    {locale === "am" ? "ቀጥሎ ምን ይሆናል?"
                     : locale === "om" ? "Itti Aanee Maal Ta'a?"
                     : "What Happens Next?"}
                  </p>
                  {[
                    { n: "01", en: "We review your application within 24 hours",       am: "ማቅረቢያዎን በ24 ሰዓት ውስጥ እንገምግማለን",         om: "Sa'aatii 24 keessatti iyyannoo keessan ni ilaalla"        },
                    { n: "02", en: "Our team contacts you for a consultation",          am: "ቡድናችን ለምክክር ያነጋግርዎታል",              om: "Gareen keenya marii irratti isin quunnamuuf bilbila"      },
                    { n: "03", en: "We match you with suitable employers",              am: "ከተስማሚ ቀጣሪዎች ጋር እናዛምድዎ",            om: "Qaxarsiisota mijatoo waliin isin walsimsiisuuf"           },
                    { n: "04", en: "Begin the documentation and visa process",          am: "የሰነዶች እና የቪዛ ሂደት ይጀምሩ",            om: "Hojmaata sanadaa fi viizaa jalqabaa"                      },
                  ].map((item, i) => (
                    <div key={i}
                      className="flex gap-3 py-2.5 border-b border-white/5 last:border-0">
                      <span className="text-brand font-black text-sm flex-shrink-0">
                        {item.n}
                      </span>
                      <p className="text-white/65 text-sm">
                        {locale === "am" ? item.am : locale === "om" ? item.om : item.en}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/${locale}`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl
                                 bg-gradient-brand text-dark-900 font-bold
                                 shadow-brand hover:shadow-brand-lg
                                 transition-all duration-300"
                    >
                      {locale === "am" ? "ወደ ቤት ተመለስ"
                       : locale === "om" ? "Manatti Deebi'i"
                       : "Back to Home"}
                      <ArrowRight size={17} />
                    </motion.button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl
                                 glass border border-white/15 text-white font-semibold
                                 hover:border-brand/40 transition-all duration-300"
                    >
                      {t("nav.contact")}
                      <Phone size={16} className="text-brand" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

            ) : (

              /* ── FORM STATE ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Progress bar */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white/50 text-sm">
                      {locale === "am"
                        ? `ደረጃ ${step} ከ ${STEPS.length}`
                        : locale === "om"
                        ? `Tarkaanfii ${step} kan ${STEPS.length}`
                        : `Step ${step} of ${STEPS.length}`}
                    </p>
                    <p className="text-brand font-bold text-sm">
                      {Math.round(progress)}%
                    </p>
                  </div>
                  {/* Progress track */}
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="h-full bg-gradient-brand rounded-full"
                    />
                  </div>

                  {/* Step indicators */}
                  <div className="flex justify-between mt-4">
                    {STEPS.map((s) => {
                      const SIcon    = s.icon;
                      const done     = s.id < step;
                      const active   = s.id === step;
                      return (
                        <div key={s.id}
                          className="flex flex-col items-center gap-1.5">
                          <motion.div
                            animate={{
                              scale: active ? 1.15 : 1,
                            }}
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center",
                              "justify-center border transition-all duration-300",
                              done   ? "bg-brand border-brand shadow-brand-sm" :
                              active ? `${s.color}` :
                                       "bg-white/5 border-white/10 text-white/30"
                            )}
                          >
                            {done
                              ? <CheckCircle2 size={18} className="text-dark-900" />
                              : <SIcon size={18}
                                  className={active ? "" : "opacity-50"} />
                            }
                          </motion.div>
                          <span className={cn(
                            "text-[10px] font-medium hidden sm:block",
                            active ? "text-brand" : done ? "text-brand/60" : "text-white/30"
                          )}>
                            {getLabel(s.label)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form card */}
                <div className="glass-dark border border-white/8 rounded-3xl
                                p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40
                                  bg-brand/4 rounded-full blur-[60px]
                                  pointer-events-none" />

                  <div className="relative z-10">
                    {/* Step header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center",
                        "justify-center border flex-shrink-0",
                        currentStepConfig.color
                      )}>
                        <StepIcon size={24} />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase
                                      tracking-widest mb-0.5">
                          {locale === "am"
                            ? `ደረጃ ${step}`
                            : locale === "om"
                            ? `Tarkaanfii ${step}`
                            : `Step ${step}`}
                        </p>
                        <h2 className="text-white font-black text-2xl">
                          {getLabel(currentStepConfig.label)}
                        </h2>
                      </div>
                    </div>

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                      >
                        <form onSubmit={handleSubmit}>
                          {stepContent[step]}

                          {/* Navigation buttons */}
                          <div className="flex gap-3 mt-8 pt-6
                                          border-t border-white/8">
                            {step > 1 && (
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={prevStep}
                                className="flex items-center gap-2 px-6 py-3.5
                                           rounded-xl glass border border-white/15
                                           text-white font-semibold text-sm
                                           hover:border-brand/40 transition-all"
                              >
                                <ArrowLeft size={16} />
                                {locale === "am" ? "ተመለስ"
                                 : locale === "om" ? "Deebi'i"
                                 : "Back"}
                              </motion.button>
                            )}

                            {step < 4 ? (
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={nextStep}
                                className="flex-1 flex items-center justify-center
                                           gap-2 py-3.5 rounded-xl bg-gradient-brand
                                           text-dark-900 font-bold text-sm
                                           shadow-brand hover:shadow-brand-lg
                                           transition-all duration-300"
                              >
                                {locale === "am" ? "ቀጣይ"
                                 : locale === "om" ? "Itti Aanaa"
                                 : "Next"}
                                <ArrowRight size={16} />
                              </motion.button>
                            ) : (
                              <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={formState === "loading"}
                                className="flex-1 flex items-center justify-center
                                           gap-2 py-3.5 rounded-xl bg-gradient-brand
                                           text-dark-900 font-bold text-sm
                                           shadow-brand hover:shadow-brand-lg
                                           transition-all duration-300
                                           disabled:opacity-70"
                              >
                                {formState === "loading" ? (
                                  <>
                                    <Loader2 size={18} className="animate-spin" />
                                    {locale === "am" ? "እየተላከ..."
                                     : locale === "om" ? "Ergamaa jira..."
                                     : "Submitting..."}
                                  </>
                                ) : (
                                  <>
                                    {t("apply.submit")}
                                    <ArrowRight size={16} />
                                  </>
                                )}
                              </motion.button>
                            )}
                          </div>
                        </form>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2
                                mt-5 text-white/30 text-xs">
                  <Shield size={13} className="text-brand/50" />
                  {locale === "am"
                    ? "ማቅረቢያዎ ደህንነቱ ተጠብቆ ይቀመጣል — ምንም ድብቅ ክፍያ የለም"
                    : locale === "om"
                    ? "Iyyannoon keessan nagaan eegama — kaffalti dhoksaa hin jiru"
                    : "Your application is securely stored — no hidden fees ever"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
