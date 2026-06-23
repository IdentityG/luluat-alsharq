export type DestinationKey =
  | "dubai"
  | "saudi"
  | "qatar"
  | "kuwait"
  | "bahrain";

export interface DestinationData {
  slug: DestinationKey;
  flag: string;
  country: string;
  city: string;
  timezone: string;
  currency: string;
  language: string;
  climate: string;
  heroImage: string;
  galleryImages: string[];
  color: string;
  accentColor: string;
  gradient: string;
  borderColor: string;
  shadowColor: string;
  totalJobs: number;
  avgSalary: { min: number; max: number };
  label: {
    en: string;
    am: string;
    om: string;
  };
  tagline: {
    en: string;
    am: string;
    om: string;
  };
  description: {
    en: string;
    am: string;
    om: string;
  };
  highlights: {
    en: string[];
    am: string[];
    om: string[];
  };
  jobCategories: {
    name: { en: string; am: string; om: string };
    openings: number;
    salary: { min: number; max: number };
    icon: string;
  }[];
  requirements: {
    en: string[];
    am: string[];
    om: string[];
  };
  livingInfo: {
    en: { label: string; value: string }[];
    am: { label: string; value: string }[];
    om: { label: string; value: string }[];
  };
  workerTestimonial: {
    name: string;
    avatar: string;
    duration: string;
    text: { en: string; am: string; om: string };
    rating: number;
  };
}

export const DESTINATIONS_DATA: DestinationData[] = [
  /* ─────────────── DUBAI ─────────────── */
  {
    slug: "dubai",
    flag: "🇦🇪",
    country: "United Arab Emirates",
    city: "Dubai",
    timezone: "GMT+4",
    currency: "AED (Dirham)",
    language: "Arabic / English",
    climate: "Hot & Sunny",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=600&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&q=80",
      "https://images.unsplash.com/photo-1548813395-e5f86a0b4d3f?w=600&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    ],
    color: "text-emerald-400",
    accentColor: "#34d399",
    gradient: "from-emerald-500/15 to-emerald-500/5",
    borderColor: "border-emerald-500/25",
    shadowColor: "rgba(52,211,153,0.15)",
    totalJobs: 5000,
    avgSalary: { min: 300, max: 1200 },
    label: {
      en: "Dubai, UAE",
      am: "ዱባይ፣ ዩኤኢ",
      om: "Dubaayi, UAE",
    },
    tagline: {
      en: "The City of Gold & Opportunity",
      am: "የወርቅ እና ዕድሎች ከተማ",
      om: "Magaalaa Warqee fi Carraalee",
    },
    description: {
      en: "Dubai is the crown jewel of the Gulf region — a modern metropolis that welcomes thousands of Ethiopian workers every year. From luxury hotels to construction megaprojects, Dubai offers unmatched career opportunities with excellent salaries and world-class living standards.",
      am: "ዱባይ የባህረሰላጤ አካባቢ ዘውድ ጌጥ ነው — ዘመናዊ ሜትሮፖሊስ ሲሆን በየዓመቱ ሺዎች ኢትዮጵያዊ ሰራተኞችን ይቀበላል። ከቅንጦት ሆቴሎች እስከ ግዙፍ የግንባታ ፕሮጀክቶች፣ ዱባይ በጥሩ ደሞዝ እና ዓለም ደረጃ የኑሮ ሁኔታ ሊወዳደር የማይችል የሙያ ዕድሎችን ያቀርባል።",
      om: "Dubaayi ganda Gulf keessatti mootii dhaaltuu — magaalaa ammayyaa kuma hedduu hojjattoota Itoophiyaa waggaa waggaan simatu dha. Hootelota mi'eessaa hanga pirojektii ijaarsa gurguddaatti, Dubaayi carraalee hojii mindaa gaarii fi sadarkaa jireenyaa idil-addunyaa waliin dhiheessa.",
    },
    highlights: {
      en: [
        "Tax-free income — keep more of what you earn",
        "World-class infrastructure and modern facilities",
        "Strong Ethiopian community and support network",
        "Safe, clean, and well-organized city",
        "Excellent healthcare and education system",
        "Year-round sunshine and vibrant lifestyle",
      ],
      am: [
        "ከቀረጥ ነፃ ገቢ — ከሚያገኙት ተጨማሪ ይቀበሉ",
        "ዓለም ደረጃ መሠረተ ልማት እና ዘመናዊ መገልገያዎች",
        "ጠንካራ የኢትዮጵያ ማህበረሰብ እና የድጋፍ አውታር",
        "ደህንነቱ የተጠበቀ፣ ንጹህ እና ጥሩ የተደራጀ ከተማ",
        "ምርጥ የጤና እና ትምህርት ስርዓት",
        "ዓሙዲ ፀሐይ እና ሕያው የኑሮ ስልት",
      ],
      om: [
        "Galii gibiraa bilisaa — waan argattan caala qabadhaa",
        "Infiraastirakcheraa idil-addunyaa fi meeshaalee ammayyaa",
        "Hawaasa Itoophiyaa jabaa fi network deeggarsa",
        "Magaalaa nagaa, qulqulluu fi qindeeffama gaarii",
        "Sirna fayyaa fi barnootaa olaanaa",
        "Aduu waggaa guutuu fi jireenya ho'aa",
      ],
    },
    jobCategories: [
      { name: { en: "Domestic Workers", am: "የቤት ሰራተኞች", om: "Hojjattoota Mana" }, openings: 2000, salary: { min: 300, max: 500 }, icon: "🏠" },
      { name: { en: "Hospitality Staff", am: "የማስተናገጃ ሰራተኞች", om: "Hojjattoota Keessummeessaa" }, openings: 1000, salary: { min: 400, max: 800 }, icon: "🍽️" },
      { name: { en: "Construction Workers", am: "የግንባታ ሰራተኞች", om: "Hojjattoota Ijaarsaa" }, openings: 1200, salary: { min: 500, max: 900 }, icon: "🏗️" },
      { name: { en: "Professional Drivers", am: "ሙያዊ ሹፌሮች", om: "Konkolaachistoota Ogeeyyii" }, openings: 400, salary: { min: 400, max: 700 }, icon: "🚗" },
      { name: { en: "Security Guards", am: "የደህንነት ጠባቂዎች", om: "Tiksitoota Nageenyaa" }, openings: 400, salary: { min: 450, max: 700 }, icon: "🛡️" },
    ],
    requirements: {
      en: [
        "Valid Ethiopian passport (6+ months validity)",
        "Age 21–45 years (varies by job category)",
        "Good physical health — medical certificate required",
        "Clean criminal background check",
        "Basic Arabic or English communication",
        "Relevant work experience (preferred for most positions)",
      ],
      am: [
        "ትክክለኛ የኢትዮጵያ ፓስፖርት (6+ ወር ዕድሜ)",
        "ዕድሜ 21–45 (እንደ ሥራ ምድብ ይለያያል)",
        "ጥሩ አካላዊ ጤና — የሕክምና ሰርተፍኬት ያስፈልጋል",
        "ንጹህ የወንጀል ዳራ ምርመራ",
        "መሰረታዊ የአረብኛ ወይም እንግሊዝኛ ግንኙነት",
        "ተዛማጅ የሥራ ልምድ (ለአብዛኛዎቹ ቦታዎች ቢኖር ይመረጣል)",
      ],
      om: [
        "Paaspoortii Itoophiyaa sirrii (ji'a 6+ dura)",
        "Umrii 21–45 (gosa hojiitiin gargar ta'a)",
        "Fayyaa qaamaa gaarii — waraqaa ragaa fayyaa barbaachisa",
        "Mirkaneessa duudhaa yakka qulqulluu",
        "Dubbii Arabaa ykn Inglizii bu'uraa",
        "Muuxannoo hojii walqabatu (bakkeewwan hedduuf ni filatama)",
      ],
    },
    livingInfo: {
      en: [
        { label: "Currency", value: "AED (1 AED ≈ 32 ETB)" },
        { label: "Language", value: "Arabic / English" },
        { label: "Time Zone", value: "GMT+4 (1hr ahead of EAT)" },
        { label: "Climate", value: "Hot & dry (25–45°C)" },
        { label: "Accommodation", value: "Usually provided by employer" },
        { label: "Food", value: "Ethiopian restaurants available" },
        { label: "Safety", value: "Very safe, low crime rate" },
        { label: "Transport", value: "Metro, buses, taxis" },
      ],
      am: [
        { label: "ምንዛሬ", value: "AED (1 AED ≈ 32 ብር)" },
        { label: "ቋንቋ", value: "አረብኛ / እንግሊዝኛ" },
        { label: "ሰዓት ዞን", value: "GMT+4" },
        { label: "ወቅት", value: "ሞቃት እና ደረቅ (25–45°C)" },
        { label: "መኖሪያ", value: "ብዙ ጊዜ ቀጣሪ ይሰጣል" },
        { label: "ምግብ", value: "የኢትዮጵያ ምግብ ቤቶች አሉ" },
        { label: "ደህንነት", value: "በጣም ደህንነቱ የተጠበቀ" },
        { label: "ትራንስፖርት", value: "ሜትሮ፣ አውቶቡስ፣ ታክሲ" },
      ],
      om: [
        { label: "Maallaqaa", value: "AED (1 AED ≈ ETB 32)" },
        { label: "Afaan", value: "Arabaa / Inglizii" },
        { label: "Zoom Yeroo", value: "GMT+4" },
        { label: "Qilleensa", value: "Ho'aa fi gogaa (25–45°C)" },
        { label: "Mana Jireenyaa", value: "Hedduun qaxarsiisaan ni kenna" },
        { label: "Nyaata", value: "Mana nyaataa Itoophiyaa jira" },
        { label: "Nageenyaa", value: "Nagaa baay'ee, yakki gad" },
        { label: "Geejjiba", value: "Metro, konkolaataa, taaksii" },
      ],
    },
    workerTestimonial: {
      name: "Almaz Bekele",
      avatar: "AB",
      duration: "2 years in Dubai",
      text: {
        en: "Coming to Dubai through Luluat Alsharq was the best decision of my life. I now earn 5x more than I did back home and send money to my family every month. The agency handled everything professionally.",
        am: "በሉሉአት አልሸርቅ ወደ ዱባይ መምጣት የሕይወቴ ምርጥ ውሳኔ ነበር። አሁን ከቤት ቤት ዘመን 5 እጥፍ ያህል አገኛለሁ እና ቤተሰቦቼን በወር ገቢ ድጋፍ አደርጋለሁ። ኤጀንሲው ሁሉን ሙያዊ በሆነ መንገድ ያስተናገደ ነበር።",
        om: "Luluat Alsharq dhaaf Dubaayitti dhufuun murteewwan jireenyakoo keessaa kan gaariidha. Amma manaa daran XN 5 guddaa argadha fi maatii kootiif ji'a ji'an galii erga. Ejensiin hunda ogummaadhaan bulche.",
      },
      rating: 5,
    },
  },

  /* ─────────────── SAUDI ─────────────── */
  {
    slug: "saudi",
    flag: "🇸🇦",
    country: "Saudi Arabia",
    city: "Riyadh / Jeddah",
    timezone: "GMT+3",
    currency: "SAR (Riyal)",
    language: "Arabic",
    climate: "Very Hot & Arid",
    heroImage:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&q=80",
      "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?w=600&q=80",
      "https://images.unsplash.com/photo-1590736969596-9d0ed4e00aba?w=600&q=80",
      "https://images.unsplash.com/photo-1605289355680-75fb41239154?w=600&q=80",
    ],
    color: "text-green-400",
    accentColor: "#4ade80",
    gradient: "from-green-500/15 to-green-500/5",
    borderColor: "border-green-500/25",
    shadowColor: "rgba(74,222,128,0.15)",
    totalJobs: 3000,
    avgSalary: { min: 350, max: 1100 },
    label: {
      en: "Saudi Arabia",
      am: "ሳዑዲ አረቢያ",
      om: "Saa'udii Arabiyaa",
    },
    tagline: {
      en: "Vision 2030 — A Nation of Opportunity",
      am: "ራዕይ 2030 — ዕድሎች ሀገር",
      om: "Mul'ata 2030 — Biyya Carraalee",
    },
    description: {
      en: "Saudi Arabia is undergoing a massive transformation under Vision 2030, creating hundreds of thousands of new jobs across all sectors. The Kingdom is one of Ethiopia's top employer destinations with competitive salaries and strong legal protections for workers.",
      am: "ሳዑዲ አረቢያ ከራዕይ 2030 ስር ግዙፍ ለውጥ ታደርጋለች፣ ይህም ሁሉም ዘርፎች ላይ በሺዎች የሚቆጠሩ አዲስ ሥራዎችን ፈጥሯል። ሀገረ መንግስቱ ተወዳዳሪ ደሞዝ እና ጠንካራ ለሰራተኞች ህጋዊ ጥበቃ ባለው ከኢትዮጵያ ቀዳሚ ቀጣሪ መድረሻዎች አንዱ ነው።",
      om: "Saa'udii Arabiyaan Mul'ata 2030 jalatti jijjiirama guddaa keessa jira, gosa hojii hunda keessatti hojii kuma heddutti guddaa haaraa uuma. Mootummaan hojii mindaa dorgomsiisaa fi eegumsa seeraa cimaa hojjatootaaf qabuu waliin bakkeewwan qaxarsuu guddaa Itoophiyaa keessaa isa tokko.",
    },
    highlights: {
      en: [
        "Largest economy in the Arab world",
        "Massive Vision 2030 infrastructure projects",
        "Tax-free income for foreign workers",
        "Strong legal framework protecting workers",
        "Large and growing Ethiopian worker community",
        "Modern cities with all amenities",
      ],
      am: [
        "በዓረቡ ዓለም ትልቁ ኢኮኖሚ",
        "ግዙፍ ራዕይ 2030 የመሠረተ ልማት ፕሮጀክቶች",
        "ለውጭ ሰራተኞች ከቀረጥ ነፃ ገቢ",
        "ሰራተኞችን ለሚጠብቅ ጠንካራ ህጋዊ ማዕቀፍ",
        "ትልቅ እና እያደገ ያለ የኢትዮጵያ ሰራተኛ ማህበረሰብ",
        "ሁሉም ምቾቶች ያሉት ዘመናዊ ከተሞች",
      ],
      om: [
        "Dinagdee guddaa biyya Arabaa keessatti",
        "Pirojektii infiraastirakcheraa Mul'ata 2030 gurguddaa",
        "Galii gibiraa bilisaa hojjattoota alaallaaf",
        "Sirna seeraa jabaa hojjattoota eegu",
        "Hawaasa hojjataa Itoophiyaa guddaa fi guddata",
        "Magaalota ammayyaa meeshaalee hunda qaban",
      ],
    },
    jobCategories: [
      { name: { en: "Domestic Workers", am: "የቤት ሰራተኞች", om: "Hojjattoota Mana" }, openings: 1200, salary: { min: 350, max: 500 }, icon: "🏠" },
      { name: { en: "Construction Workers", am: "የግንባታ ሰራተኞች", om: "Hojjattoota Ijaarsaa" }, openings: 900, salary: { min: 500, max: 950 }, icon: "🏗️" },
      { name: { en: "Healthcare Workers", am: "የጤና ሰራተኞች", om: "Hojjattoota Fayyaa" }, openings: 400, salary: { min: 700, max: 1100 }, icon: "🏥" },
      { name: { en: "Professional Drivers", am: "ሙያዊ ሹፌሮች", om: "Konkolaachistoota Ogeeyyii" }, openings: 300, salary: { min: 400, max: 650 }, icon: "🚗" },
      { name: { en: "Security Guards", am: "የደህንነት ጠባቂዎች", om: "Tiksitoota Nageenyaa" }, openings: 200, salary: { min: 450, max: 700 }, icon: "🛡️" },
    ],
    requirements: {
      en: [
        "Valid Ethiopian passport (6+ months)",
        "Age 21–45 years",
        "Medical fitness certificate",
        "Clean criminal record",
        "Basic Arabic language skills preferred",
        "Experience letters for skilled positions",
      ],
      am: [
        "ትክክለኛ የኢትዮጵያ ፓስፖርት (6+ ወር)",
        "ዕድሜ 21–45 ዓመት",
        "የሕክምና ብቃት ሰርተፍኬት",
        "ንጹህ የወንጀል መዝገብ",
        "መሰረታዊ የአረብኛ ቋንቋ ክህሎቶች ቢኖር ይመረጣል",
        "ለሙያዊ ቦታዎች የልምድ ደብዳቤዎች",
      ],
      om: [
        "Paaspoortii Itoophiyaa sirrii (ji'a 6+)",
        "Umrii 21–45",
        "Waraqaa ragaa dandeettii fayyaa",
        "Gabaasa yakka qulqulluu",
        "Dandeettii afaan Arabaa bu'uraa ni filatama",
        "Xalayaalee muuxannoo bakkeewwan ogummaa irratti",
      ],
    },
    livingInfo: {
      en: [
        { label: "Currency", value: "SAR (1 SAR ≈ 28 ETB)" },
        { label: "Language", value: "Arabic (English spoken)" },
        { label: "Time Zone", value: "GMT+3" },
        { label: "Climate", value: "Very hot (30–50°C)" },
        { label: "Accommodation", value: "Provided by employer" },
        { label: "Food", value: "Halal food widely available" },
        { label: "Safety", value: "Strict laws, very safe" },
        { label: "Religion", value: "Islamic customs — respect required" },
      ],
      am: [
        { label: "ምንዛሬ", value: "SAR (1 SAR ≈ 28 ብር)" },
        { label: "ቋንቋ", value: "አረብኛ (እንግሊዝኛ ይነገራል)" },
        { label: "ሰዓት ዞን", value: "GMT+3" },
        { label: "ወቅት", value: "በጣም ሞቃት (30–50°C)" },
        { label: "መኖሪያ", value: "ቀጣሪ ይሰጣል" },
        { label: "ምግብ", value: "ሃላል ምግብ ሰፊ ነው" },
        { label: "ደህንነት", value: "ጥብቅ ህጎች፣ ደህንነቱ ተጠብቋል" },
        { label: "ሃይማኖት", value: "የእስልምና ባህሎች — ክብር ያስፈልጋል" },
      ],
      om: [
        { label: "Maallaqaa", value: "SAR (1 SAR ≈ ETB 28)" },
        { label: "Afaan", value: "Arabaa (Ingliziin dubbatama)" },
        { label: "Zoom Yeroo", value: "GMT+3" },
        { label: "Qilleensa", value: "Ho'aa baay'ee (30–50°C)" },
        { label: "Mana Jireenyaa", value: "Qaxarsiisaan ni kenna" },
        { label: "Nyaata", value: "Nyaata halaala bal'inaan jira" },
        { label: "Nageenyaa", value: "Seerota cimaa, nagaa baay'ee" },
        { label: "Amantii", value: "Aadaa Islaamaa — kabajni barbaachisa" },
      ],
    },
    workerTestimonial: {
      name: "Tadesse Haile",
      avatar: "TH",
      duration: "3 years in Saudi Arabia",
      text: {
        en: "Saudi Arabia gave me the financial stability I always dreamed of. Luluat Alsharq prepared me well before departure and I felt supported throughout my journey. I now own a home back in Addis!",
        am: "ሳዑዲ አረቢያ ሁሌም የህልሜ የነበረውን ፋይናንሺያዊ መረጋጋት ሰጠኝ። ሉሉአት አልሸርቅ ከጉዞ በፊት በደንብ አዘጋጀኝ እና ጉዞዬ ሙሉ ድጋፍ ተሰምቶኛል። አሁን አዲስ አበባ ቤት አለኝ!",
        om: "Saa'udii Arabiyaan tasgabbii faayinaansii yeroo hundaa abjadhu naaf kenne. Luluat Alsharq dura deemsa dura naaf qopheesse fi imala koo guutuu deeggarsa na taasise. Amma Finfinnee mana qaba!",
      },
      rating: 5,
    },
  },

  /* ─────────────── QATAR ─────────────── */
  {
    slug: "qatar",
    flag: "🇶🇦",
    country: "Qatar",
    city: "Doha",
    timezone: "GMT+3",
    currency: "QAR (Riyal)",
    language: "Arabic / English",
    climate: "Hot & Humid",
    heroImage:
      "/images/destinations/qatar.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=600&q=80",
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=600&q=80",
      "https://images.unsplash.com/photo-1554233083-cc26ef52f71e?w=600&q=80",
      "https://images.unsplash.com/photo-1570727188633-b3a8ad8cd3db?w=600&q=80",
    ],
    color: "text-purple-400",
    accentColor: "#c084fc",
    gradient: "from-purple-500/15 to-purple-500/5",
    borderColor: "border-purple-500/25",
    shadowColor: "rgba(192,132,252,0.15)",
    totalJobs: 2000,
    avgSalary: { min: 400, max: 1300 },
    label: {
      en: "Qatar",
      am: "ቃጣር",
      om: "Qaxar",
    },
    tagline: {
      en: "Pearl of the Gulf — World-Class Opportunity",
      om: "Qinxaalee Gulf — Carraa Idil-Addunyaa",
      am: "የባህረሰላጤ ዕንቁ — ዓለም ደረጃ ዕድል",
    },
    description: {
      en: "Qatar, the richest country per capita in the world, offers exceptional employment opportunities for Ethiopian workers. With massive infrastructure investments and a booming economy, Qatar's job market is diverse, well-paying, and growing rapidly.",
      am: "ቃጣር፣ በነፍስ ወከፍ ሀብት ዓለም ቀዳሚ ሀገር፣ ለኢትዮጵያ ሰራተኞች ልዩ የሥራ ዕድሎችን ይሰጣል። ግዙፍ የመሠረተ ልማት ኢንቨስትሜንቶች እና ፈጣን ኢኮኖሚ ጋር፣ ቃጣር የሥራ ገበያ የተለያዩ፣ ጥሩ ደሞዝ ያለው እና ፈጣን የሚያድግ ነው።",
      om: "Qaxar, biyyi addunyaatti hojjataa tokkoo tokkoon duroomina guddaa qabu, hojjattoota Itoophiyaatiif carraalee hojii addaa dhiheessa. Maallaqni infiraastirakcheraa guddaa fi dinagdee saffisaan guddate waliin, gabaan hojii Qaxar garagaraa, mindaa gaarii fi saffisaan guddata.",
    },
    highlights: {
      en: [
        "Highest GDP per capita in the world",
        "World Cup legacy — upgraded infrastructure",
        "Tax-free salaries and benefits",
        "Modern, safe, and multicultural city",
        "Excellent healthcare system",
        "Strong worker protection laws",
      ],
      am: [
        "ዓለም ቀዳሚ ከፍተኛ ነፍስ ወከፍ GDP",
        "የዓለም ኩፓ ቅርስ — ያሻሻለ መሠረተ ልማት",
        "ከቀረጥ ነፃ ደሞዝ እና ጥቅሞች",
        "ዘመናዊ፣ ደህንነቱ የተጠበቀ እና ባለብዙ ባህሎች ከተማ",
        "ምርጥ የጤና ስርዓት",
        "ጠንካራ የሰራተኛ ጥበቃ ህጎች",
      ],
      om: [
        "GDP hojjataa tokkoo addunyaatti olaanaa",
        "Dhaaltuu Kubbaa Addunyaa — infiraastirakcheraa fooyya'e",
        "Mindaa fi faayidaa gibiraa bilisaa",
        "Magaalaa ammayyaa, nagaa fi aadaa hedduu",
        "Sirna fayyaa olaanaa",
        "Seerota eegumsa hojjataa jabaa",
      ],
    },
    jobCategories: [
      { name: { en: "Hospitality Staff", am: "የማስተናገጃ ሰራተኞች", om: "Hojjattoota Keessummeessaa" }, openings: 700, salary: { min: 500, max: 900 }, icon: "🍽️" },
      { name: { en: "Domestic Workers", am: "የቤት ሰራተኞች", om: "Hojjattoota Mana" }, openings: 600, salary: { min: 400, max: 600 }, icon: "🏠" },
      { name: { en: "Healthcare Workers", am: "የጤና ሰራተኞች", om: "Hojjattoota Fayyaa" }, openings: 350, salary: { min: 800, max: 1300 }, icon: "🏥" },
      { name: { en: "Construction Workers", am: "የግንባታ ሰራተኞች", om: "Hojjattoota Ijaarsaa" }, openings: 250, salary: { min: 550, max: 950 }, icon: "🏗️" },
      { name: { en: "Security Guards", am: "የደህንነት ጠባቂዎች", om: "Tiksitoota Nageenyaa" }, openings: 100, salary: { min: 500, max: 750 }, icon: "🛡️" },
    ],
    requirements: {
      en: [
        "Valid Ethiopian passport (6+ months)",
        "Age 21–45 years",
        "Medical fitness certificate",
        "Police clearance certificate",
        "English or Arabic communication skills",
        "Relevant qualification certificates",
      ],
      am: [
        "ትክክለኛ ፓስፖርት (6+ ወር)",
        "ዕድሜ 21–45",
        "የሕክምና ብቃት ሰርተፍኬት",
        "የፖሊስ ማጽዳት ሰርተፍኬት",
        "የእንግሊዝኛ ወይም አረብኛ ግንኙነት ክህሎቶች",
        "ተዛማጅ የብቃት ሰርተፍኬቶች",
      ],
      om: [
        "Paaspoortii sirrii (ji'a 6+)",
        "Umrii 21–45",
        "Waraqaa ragaa dandeettii fayyaa",
        "Waraqaa ragaa qulqulleessa poolisii",
        "Dandeettii dubbii Inglizii ykn Arabaa",
        "Waraqaalee ragaa dandeettii walqabatu",
      ],
    },
    livingInfo: {
      en: [
        { label: "Currency", value: "QAR (1 QAR ≈ 30 ETB)" },
        { label: "Language", value: "Arabic / English" },
        { label: "Time Zone", value: "GMT+3" },
        { label: "Climate", value: "Hot & humid (28–48°C)" },
        { label: "Accommodation", value: "Employer-provided usually" },
        { label: "Healthcare", value: "World-class free healthcare" },
        { label: "Safety", value: "One of the safest in world" },
        { label: "Community", value: "Large African expat community" },
      ],
      am: [
        { label: "ምንዛሬ", value: "QAR (1 QAR ≈ 30 ብር)" },
        { label: "ቋንቋ", value: "አረብኛ / እንግሊዝኛ" },
        { label: "ሰዓት ዞን", value: "GMT+3" },
        { label: "ወቅት", value: "ሞቃት እና እርጥብ (28–48°C)" },
        { label: "መኖሪያ", value: "ብዙ ጊዜ ቀጣሪ ይሰጣል" },
        { label: "ጤና", value: "ዓለም ደረጃ ነፃ ጤናB" },
        { label: "ደህንነት", value: "ዓለም ቀዳሚ ደህንነቱ ተጠብቋል" },
        { label: "ማህበረሰብ", value: "ትልቅ የአፍሪካ ምናባዊ ማህበረሰብ" },
      ],
      om: [
        { label: "Maallaqaa", value: "QAR (1 QAR ≈ ETB 30)" },
        { label: "Afaan", value: "Arabaa / Inglizii" },
        { label: "Zoom Yeroo", value: "GMT+3" },
        { label: "Qilleensa", value: "Ho'aa fi jiidha (28–48°C)" },
        { label: "Mana Jireenyaa", value: "Hedduun qaxarsiisaan kenna" },
        { label: "Fayyaa", value: "Fayyaa bilisaa idil-addunyaa" },
        { label: "Nageenyaa", value: "Nagaa addunyaatti olaanaa" },
        { label: "Hawaasa", value: "Hawaasa biyyoota Afrikaa guddaa" },
      ],
    },
    workerTestimonial: {
      name: "Selamawit Girma",
      avatar: "SG",
      duration: "18 months in Qatar",
      text: {
        en: "Qatar is incredibly modern and safe. I work at a 5-star hotel in Doha and my salary is triple what I earned before. Luluat Alsharq arranged everything perfectly — I had zero problems.",
        am: "ቃጣር አስደናቂ ዘመናዊ እና ደህንነቱ የተጠበቀ ነው። ዶሃ ውስጥ 5 ኮከብ ሆቴል ውስጥ እሰራለሁ እና ደሞዜ ቀደም ካገኘሁት ሶስት እጥፍ ነው። ሉሉአት አልሸርቅ ሁሉን ፍፁም አዘጋጀ — ምንም ችግር አልነበረኝም።",
        om: "Qaxar ammayyaa fi nagaa baay'ee dha. Doohaa keessatti hootelaa 5 urjii irratti hojjadha fi mindaan koo duri daran XN 3 guddaa. Luluat Alsharq hunda sirriitti qopheesse — rakkoo tokkollee hin qabne.",
      },
      rating: 5,
    },
  },

  /* ─────────────── KUWAIT ─────────────── */
  {
    slug: "kuwait",
    flag: "🇰🇼",
    country: "Kuwait",
    city: "Kuwait City",
    timezone: "GMT+3",
    currency: "KWD (Dinar)",
    language: "Arabic / English",
    climate: "Hot & Arid",
    heroImage:
      "/images/destinations/kuawit.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1565073624497-7144969d0db5?w=600&q=80",
      "https://images.unsplash.com/photo-1572456284542-f8e31f3a9fa0?w=600&q=80",
      "https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&q=80",
      "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?w=600&q=80",
    ],
    color: "text-amber-400",
    accentColor: "#fbbf24",
    gradient: "from-amber-500/15 to-amber-500/5",
    borderColor: "border-amber-500/25",
    shadowColor: "rgba(251,191,36,0.15)",
    totalJobs: 1500,
    avgSalary: { min: 350, max: 1000 },
    label: {
      en: "Kuwait",
      am: "ኩዌት",
      om: "Kuwayt",
    },
    tagline: {
      en: "Gulf Prosperity — Steady & Rewarding Work",
      am: "የባህረሰላጤ ብልፅግና — ተከታታይ እና ሚሽ ሥራ",
      om: "Badhaadhinni Gulf — Hojii Tasgabbaa'aa fi Madaaltuu",
    },
    description: {
      en: "Kuwait is one of the wealthiest nations in the world with one of the highest living standards. Known for its stable economy and generous employer packages, Kuwait is a reliable destination for Ethiopian workers seeking steady, well-compensated employment.",
      am: "ኩዌት ከፍተኛ ኑሮ ደረጃ ካላቸው ሀገሮች ጋር ዓለምን ቀዳሚ ሀብት ካላቸው ሀገሮች አንዱ ነው። ለተከታታይ ኢኮኖሚ እና ለልበ ለጋ የቀጣሪ ጥቅሎቹ የሚታወቅ ሲሆን ኩዌት ለምታፈልጉ የሥራ ኢትዮጵያ ሰራተኞች ተከታታይ ጥሩ ክፍያ ያለው ሥራ ምቹ መድረሻ ነው።",
      om: "Kuwayt biyyoota sadarkaa jireenyaa olaanaa qaban waliin addunyaatti biyyoota duroomina guddaa qaban keessaa isa tokko. Dinagdee tasgabbaa'aa fi marsaalee qaxarsiisaa oolmaadhaaf beekamtii qabaatuun, Kuwayt bakka dhugaa hojii tasgabbaa'aa fi mindaa gaarii barbaadan hojjattoota Itoophiyaatiif dha.",
    },
    highlights: {
      en: [
        "World's highest income per capita",
        "Extremely stable political environment",
        "Tax-free income and generous benefits",
        "Excellent healthcare and social services",
        "Strong Ethiopian worker community",
        "Short working hours with good rest days",
      ],
      am: [
        "ዓለም ቀዳሚ ነፍስ ወከፍ ገቢ",
        "እጅግ ተከታታይ የፖለቲካ አካባቢ",
        "ከቀረጥ ነፃ ገቢ እና ልበ ለጋ ጥቅሞች",
        "ምርጥ የጤና እና ማህበራዊ አገልግሎቶች",
        "ጠንካራ የኢትዮጵያ ሰራተኛ ማህበረሰብ",
        "ጥሩ ቀናት እረፍት ያለው አጭር የሥራ ሰዓቶች",
      ],
      om: [
        "Galii hojjataa tokkoo addunyaatti olaanaa",
        "Naannoo siyaasaa tasgabbaa'aa baay'ee",
        "Galii gibiraa bilisaa fi faayidaa oolmaa",
        "Tajaajila fayyaa fi hawaasaa olaanaa",
        "Hawaasa hojjataa Itoophiyaa jabaa",
        "Sa'aatii hojii gabaabaa fi guyyaawwan boqonnaa gaarii",
      ],
    },
    jobCategories: [
      { name: { en: "Domestic Workers", am: "የቤት ሰራተኞች", om: "Hojjattoota Mana" }, openings: 700, salary: { min: 350, max: 550 }, icon: "🏠" },
      { name: { en: "Professional Drivers", am: "ሙያዊ ሹፌሮች", om: "Konkolaachistoota Ogeeyyii" }, openings: 350, salary: { min: 400, max: 650 }, icon: "🚗" },
      { name: { en: "Security Guards", am: "የደህንነት ጠባቂዎች", om: "Tiksitoota Nageenyaa" }, openings: 250, salary: { min: 450, max: 700 }, icon: "🛡️" },
      { name: { en: "Healthcare Workers", am: "የጤና ሰራተኞች", om: "Hojjattoota Fayyaa" }, openings: 200, salary: { min: 700, max: 1000 }, icon: "🏥" },
    ],
    requirements: {
      en: [
        "Valid Ethiopian passport (6+ months)",
        "Age 21–45 years",
        "Medical fitness certificate",
        "Police clearance from Ethiopia",
        "Work experience preferred",
        "Good physical health and appearance",
      ],
      am: [
        "ትክክለኛ ፓስፖርት (6+ ወር)",
        "ዕድሜ 21–45",
        "የሕክምና ብቃት ሰርተፍኬት",
        "ከኢትዮጵያ የፖሊስ ማጽዳት",
        "የሥራ ልምድ ቢኖር ይመረጣል",
        "ጥሩ አካላዊ ጤና እና መልክ",
      ],
      om: [
        "Paaspoortii sirrii (ji'a 6+)",
        "Umrii 21–45",
        "Waraqaa ragaa dandeettii fayyaa",
        "Qulqulleessa poolisii Itoophiyaa irraa",
        "Muuxannoo hojii ni filatama",
        "Fayyaa qaamaa fi mul'ata gaarii",
      ],
    },
    livingInfo: {
      en: [
        { label: "Currency", value: "KWD (1 KWD ≈ 350 ETB)" },
        { label: "Language", value: "Arabic / English" },
        { label: "Time Zone", value: "GMT+3" },
        { label: "Climate", value: "Extremely hot (30–50°C)" },
        { label: "Accommodation", value: "Fully provided by employer" },
        { label: "Food", value: "Diverse food options" },
        { label: "Safety", value: "Very safe, strict laws" },
        { label: "Benefits", value: "Annual leave, return ticket" },
      ],
      am: [
        { label: "ምንዛሬ", value: "KWD (1 KWD ≈ 350 ብር)" },
        { label: "ቋንቋ", value: "አረብኛ / እንግሊዝኛ" },
        { label: "ሰዓት ዞን", value: "GMT+3" },
        { label: "ወቅት", value: "እጅግ ሞቃት (30–50°C)" },
        { label: "መኖሪያ", value: "ቀጣሪ ሙሉ ይሰጣል" },
        { label: "ምግብ", value: "የተለያዩ የምግብ አማራጮች" },
        { label: "ደህንነት", value: "ጥብቅ ህጎች፣ ደህንነቱ ተጠብቋል" },
        { label: "ጥቅሞች", value: "ዓመታዊ ፈቃድ፣ የመመለሻ ትኬት" },
      ],
      om: [
        { label: "Maallaqaa", value: "KWD (1 KWD ≈ ETB 350)" },
        { label: "Afaan", value: "Arabaa / Inglizii" },
        { label: "Zoom Yeroo", value: "GMT+3" },
        { label: "Qilleensa", value: "Ho'aa baay'ee (30–50°C)" },
        { label: "Mana Jireenyaa", value: "Qaxarsiisaan guutuun kenna" },
        { label: "Nyaata", value: "Filannoolee nyaataa garagaraa" },
        { label: "Nageenyaa", value: "Seerota cimaa, nagaa baay'ee" },
        { label: "Faayidaa", value: "Boqonnaa waggaa, tikeettii deebi'uu" },
      ],
    },
    workerTestimonial: {
      name: "Biruk Mengistu",
      avatar: "BM",
      duration: "2.5 years in Kuwait",
      text: {
        en: "Kuwait is stable and the employers are very generous. I've been working as a driver for a wealthy family and they treat me very well. The Luluat Alsharq team guided me through every document.",
        am: "ኩዌት ተከታታይ ነው እና ቀጣሪዎቹ በጣም ልበ ለጋ ናቸው። ለሀብታም ቤተሰብ ሾፌር ሆኜ እሰራለሁ እና በጣም ጥሩ ያስተናግዱኛል። ሉሉአት አልሸርቅ ቡድን በሁሉም ሰነድ ምዕራፍ ምክር ሰጥቶኛል።",
        om: "Kuwayt tasgabbaa'aa fi qaxarsiistoonni oolmaa baay'ee dha. Maatii dureessa tokkootiif konkolaachisaa ta'ee hojjadha fi baay'ee gaariitti na keessummeessu. Gareen Luluat Alsharq sanadoota hunda keessatti na qajeelche.",
      },
      rating: 5,
    },
  },

  /* ─────────────── BAHRAIN ─────────────── */
];