import {
  Home, UtensilsCrossed, HardHat,
  HeartPulse, Car, Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceKey =
  | "domestic"
  | "hospitality"
  | "construction"
  | "healthcare"
  | "drivers"
  | "security";

export interface ServiceData {
  slug:        ServiceKey;
  icon:        LucideIcon;
  gradient:    string;
  iconColor:   string;
  borderColor: string;
  shadowColor: string;
  image:       string;
  galleryImages: string[];
  requirements: {
    en: string[];
    am: string[];
    om: string[];
  };
  responsibilities: {
    en: string[];
    am: string[];
    om: string[];
  };
  benefits: {
    en: string[];
    am: string[];
    om: string[];
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  destinations: string[];
  openings: number;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug:        "domestic",
    icon:        Home,
    gradient:    "from-emerald-500/15 to-emerald-500/5",
    iconColor:   "text-emerald-400",
    borderColor: "border-emerald-500/20",
    shadowColor: "rgba(16,185,129,0.15)",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff212fec0be?w=600&q=80",
    ],
    requirements: {
      en: [
        "Age 21–45 years",
        "Good physical health",
        "Basic Arabic or English communication",
        "Experience in housekeeping preferred",
        "Valid Ethiopian passport",
        "Clean criminal record",
      ],
      am: [
        "ዕድሜ ከ21–45 ዓመት",
        "ጥሩ አካላዊ ጤና",
        "መሰረታዊ የአረብኛ ወይም እንግሊዝኛ ግንኙነት",
        "የቤት ሥራ ልምድ ቢኖር ይመረጣል",
        "ትክክለኛ የኢትዮጵያ ፓስፖርት",
        "ንጹህ የወንጀል መዝገብ",
      ],
      om: [
        "Umrii 21–45",
        "Fayyaa qaamaa gaarii",
        "Afaan Arabaa ykn Inglizii bu'uraa",
        "Muuxannoo hojii mana qabaachu ni filatama",
        "Paaspoortii Itoophiyaa sirrii",
        "Gabaasa yakka qulqulluu",
      ],
    },
    responsibilities: {
      en: [
        "House cleaning and organization",
        "Cooking and meal preparation",
        "Laundry and ironing",
        "Childcare and elderly care",
        "Grocery shopping assistance",
        "Running household errands",
      ],
      am: [
        "ቤት ማፅዳት እና ማደራጀት",
        "ምግብ ማብሰል እና ማዘጋጀት",
        "ልብስ ማጠብ እና ማሸት",
        "የሕፃናት እና አዛውንቶች እንክብካቤ",
        "ሸቀጥ ለመግዛት ድጋፍ",
        "የቤት ሥራዎችን ማስፈጸም",
      ],
      om: [
        "Mana qulqulleessuu fi qindeessuu",
        "Nyaata bilcheessuu fi qopheessuu",
        "Uffata dhiquu fi miiduu",
        "Daa'imman fi jaarsolii kunuunsuu",
        "Gabaa bitachuuf gargaaruu",
        "Hojii mana raawwachuu",
      ],
    },
    benefits: {
      en: [
        "Monthly salary $300–$500 USD",
        "Free accommodation provided",
        "Free meals included",
        "Medical insurance covered",
        "Annual paid leave",
        "Return flight ticket",
      ],
      am: [
        "ወርሃዊ ደሞዝ $300–$500 ዶላር",
        "ነፃ መኖሪያ ቤት ይሰጣል",
        "ምግብ ተካቷል",
        "የሕክምና ኢንሹራንስ ተሸፍኗል",
        "ዓመታዊ ክፍያ ያለው ፈቃድ",
        "የመመለሻ አውሮፕላን ትኬት",
      ],
      om: [
        "Mindaa ji'a $300–$500 USD",
        "Mana jireenyaa bilisaa ni kennama",
        "Nyaata bilisaa dabalatee",
        "Inshuuraansii fayyaa haguugame",
        "Boqonnaa kaffaltii waggaa",
        "Tikeettii xiyyaaraa deebi'uu",
      ],
    },
    salary:       { min: 300,  max: 500,  currency: "USD" },
    destinations: ["Dubai, UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
    openings:     120,
  },
  {
    slug:        "hospitality",
    icon:        UtensilsCrossed,
    gradient:    "from-orange-500/15 to-orange-500/5",
    iconColor:   "text-orange-400",
    borderColor: "border-orange-500/20",
    shadowColor: "rgba(249,115,22,0.15)",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    ],
    requirements: {
      en: [
        "Age 20–40 years",
        "Hospitality experience preferred",
        "English communication skills",
        "Professional appearance",
        "Valid Ethiopian passport",
        "Food handling certification a plus",
      ],
      am: [
        "ዕድሜ ከ20–40 ዓመት",
        "የማስተናገጃ ልምድ ቢኖር ይመረጣል",
        "የእንግሊዝኛ ግንኙነት ችሎታ",
        "ሙያዊ መልክ",
        "ትክክለኛ የኢትዮጵያ ፓስፖርት",
        "የምግብ አያያዝ ሰርተፍኬት ቢኖር ይጠቅማል",
      ],
      om: [
        "Umrii 20–40",
        "Muuxannoo keessummeessaa ni filatama",
        "Dandeettii dubbii Inglizii",
        "Mul'ata ogummaa",
        "Paaspoortii Itoophiyaa sirrii",
        "Waraqaa ragaa nyaata qabachuu faayidaa qaba",
      ],
    },
    responsibilities: {
      en: [
        "Guest check-in and check-out",
        "Room service and cleaning",
        "Restaurant table service",
        "Concierge assistance",
        "Event setup and coordination",
        "Customer satisfaction management",
      ],
      am: [
        "እንግዶች ቼክ-ኢን እና ቼክ-አውት",
        "የክፍል አገልግሎት እና ማፅዳት",
        "የምግብ ቤት ጠረጴዛ አገልግሎት",
        "የኮንሲርጅ ድጋፍ",
        "የክስተት ማዘጋጀት እና ቅንጅት",
        "የደንበኛ እርካታ አስተዳደር",
      ],
      om: [
        "Keessummoota seensisuu fi baasuu",
        "Tajaajila kutaa fi qulqulleessuu",
        "Tajaajila gabatee mana nyaataa",
        "Gargaarsa konsiirjii",
        "Qophii fi qindeessa taateewwanii",
        "Bulchiinsa gammachuu maamilaa",
      ],
    },
    benefits: {
      en: [
        "Monthly salary $400–$700 USD",
        "Accommodation provided",
        "Meals during shifts",
        "Medical insurance",
        "Tips and service charges",
        "Career growth opportunities",
      ],
      am: [
        "ወርሃዊ ደሞዝ $400–$700 ዶላር",
        "መኖሪያ ቤት ይሰጣል",
        "በሺፍት ወቅት ምግብ",
        "የሕክምና ኢንሹራንስ",
        "ጉርሻ እና የአገልግሎት ክፍያ",
        "የሙያ እድገት ዕድሎች",
      ],
      om: [
        "Mindaa ji'a $400–$700 USD",
        "Mana jireenyaa ni kennama",
        "Nyaata yeroo shiftii",
        "Inshuuraansii fayyaa",
        "Tiippii fi kaffaltii tajaajilaa",
        "Carraalee guddina hojii",
      ],
    },
    salary:       { min: 400,  max: 700,  currency: "USD" },
    destinations: ["Dubai, UAE", "Qatar", "Bahrain"],
    openings:     85,
  },
  {
    slug:        "construction",
    icon:        HardHat,
    gradient:    "from-yellow-500/15 to-yellow-500/5",
    iconColor:   "text-yellow-400",
    borderColor: "border-yellow-500/20",
    shadowColor: "rgba(234,179,8,0.15)",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
      "https://images.unsplash.com/photo-1590430415550-8c0af170c9e0?w=600&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    ],
    requirements: {
      en: [
        "Age 22–45 years",
        "Physical fitness required",
        "Prior construction experience",
        "Ability to work in hot climate",
        "Valid Ethiopian passport",
        "Safety training certificate preferred",
      ],
      am: [
        "ዕድሜ ከ22–45 ዓመት",
        "አካላዊ ብቃት ያስፈልጋል",
        "ቀዳሚ የግንባታ ልምድ",
        "በሞቃት አካባቢ የመሥራት ችሎታ",
        "ትክክለኛ የኢትዮጵያ ፓስፖርት",
        "የደህንነት ስልጠና ሰርተፍኬት ቢኖር ይመረጣል",
      ],
      om: [
        "Umrii 22–45",
        "Dandeettii qaamaa barbaachisa",
        "Muuxannoo ijaarsa dursaa",
        "Naannoo ho'aa keessatti hojjachuu danda'uu",
        "Paaspoortii Itoophiyaa sirrii",
        "Waraqaa ragaa leenjii nageenyaa ni filatama",
      ],
    },
    responsibilities: {
      en: [
        "General construction labor",
        "Scaffolding and formwork",
        "Concrete mixing and pouring",
        "Material handling and transport",
        "Site cleaning and maintenance",
        "Following safety protocols",
      ],
      am: [
        "አጠቃላይ የግንባታ ሥራ",
        "ምሰሶ እና ቅርፅ ሥራ",
        "ኮንክሪት ማቀላቀል እና ማፍሰስ",
        "ቁሳቁስ አያያዝ እና ትራንስፖርት",
        "ቦታ ማፅዳት እና ጥገና",
        "የደህንነት ፕሮቶኮሎችን መከተል",
      ],
      om: [
        "Hojii ijaarsa waliigalaa",
        "Scaffold fi formwork",
        "Konkiriitii makuu fi naquu",
        "Meeshaalee qabachuu fi geejjibuu",
        "Bakka qulqulleessuu fi kunuunsuu",
        "Protokoolota nageenyaa hordofuu",
      ],
    },
    benefits: {
      en: [
        "Monthly salary $500–$900 USD",
        "Free accommodation in labor camp",
        "Meals provided",
        "Medical insurance",
        "Overtime pay available",
        "Return air ticket",
      ],
      am: [
        "ወርሃዊ ደሞዝ $500–$900 ዶላር",
        "ነፃ መኖሪያ በሠራተኛ ካምፕ",
        "ምግብ ይሰጣል",
        "የሕክምና ኢንሹራንስ",
        "ትርፍ ሰዓት ክፍያ አለ",
        "የመመለሻ አውሮፕላን ትኬት",
      ],
      om: [
        "Mindaa ji'a $500–$900 USD",
        "Mana jireenyaa bilisaa kemp hojjattootaa",
        "Nyaata ni kennama",
        "Inshuuraansii fayyaa",
        "Kaffalti yeroo dabalataatu jira",
        "Tikeettii xiyyaaraa deebi'uu",
      ],
    },
    salary:       { min: 500,  max: 900,  currency: "USD" },
    destinations: ["Dubai, UAE", "Saudi Arabia", "Qatar"],
    openings:     200,
  },
  {
    slug:        "healthcare",
    icon:        HeartPulse,
    gradient:    "from-red-500/15 to-red-500/5",
    iconColor:   "text-red-400",
    borderColor: "border-red-500/20",
    shadowColor: "rgba(239,68,68,0.15)",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=600&q=80",
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
    ],
    requirements: {
      en: [
        "Nursing or healthcare diploma/degree",
        "Age 22–40 years",
        "Minimum 2 years clinical experience",
        "English proficiency required",
        "Valid Ethiopian passport",
        "Professional license/registration",
      ],
      am: [
        "የነርስ ወይም የጤና ዲፕሎማ/ዲግሪ",
        "ዕድሜ ከ22–40 ዓመት",
        "ቢያንስ 2 ዓመት የክሊኒካዊ ልምድ",
        "የእንግሊዝኛ ብቃት ያስፈልጋል",
        "ትክክለኛ የኢትዮጵያ ፓስፖርት",
        "ሙያዊ ፍቃድ/ምዝገባ",
      ],
      om: [
        "Diipiloomaa/digirii naarsummaa ykn fayyaa",
        "Umrii 22–40",
        "Muuxannoo klinikaa waggaa 2 xiqqaatii",
        "Dandeettii Inglizii barbaachisa",
        "Paaspoortii Itoophiyaa sirrii",
        "Hayyama/galmeessa ogummaa",
      ],
    },
    responsibilities: {
      en: [
        "Patient care and monitoring",
        "Medication administration",
        "Vital signs recording",
        "Doctor assistance during rounds",
        "Medical record documentation",
        "Patient family communication",
      ],
      am: [
        "የታካሚ እንክብካቤ እና ክትትል",
        "መድሃኒት አስተዳደር",
        "ወሳኝ ምልክቶች መዝገብ",
        "ዙርያ ወቅት ዶክተርን ድጋፍ",
        "የሕክምና መዝገብ ሰነዶች",
        "ከታካሚ ቤተሰብ ጋር ግንኙነት",
      ],
      om: [
        "Kunuunsa fi to'annoo dhukkubsataa",
        "Bulchiinsa qorichaa",
        "Galmeessa mallattoolee murteessoo",
        "Gargaarsa dokteraa yeroo naannoo",
        "Sanadoota gabaasa fayyaa",
        "Quunnamtii maatii dhukkubsataa",
      ],
    },
    benefits: {
      en: [
        "Monthly salary $600–$1200 USD",
        "Free accommodation",
        "Full medical insurance",
        "Annual leave with pay",
        "Professional development",
        "Return flight included",
      ],
      am: [
        "ወርሃዊ ደሞዝ $600–$1200 ዶላር",
        "ነፃ መኖሪያ ቤት",
        "ሙሉ የሕክምና ኢንሹራንስ",
        "ዓመታዊ ክፍያ ያለው ፈቃድ",
        "ሙያዊ እድገት",
        "የመመለሻ አውሮፕላን ተካቷል",
      ],
      om: [
        "Mindaa ji'a $600–$1200 USD",
        "Mana jireenyaa bilisaa",
        "Inshuuraansii fayyaa guutuu",
        "Boqonnaa kaffaltii waggaa",
        "Guddina ogummaa",
        "Xiyyaaraa deebi'uu dabalatee",
      ],
    },
    salary:       { min: 600,  max: 1200, currency: "USD" },
    destinations: ["Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
    openings:     45,
  },
  {
    slug:        "drivers",
    icon:        Car,
    gradient:    "from-blue-500/15 to-blue-500/5",
    iconColor:   "text-blue-400",
    borderColor: "border-blue-500/20",
    shadowColor: "rgba(59,130,246,0.15)",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
    ],
    requirements: {
      en: [
        "Valid driver's license (2+ years)",
        "Age 25–45 years",
        "Clean driving record",
        "Basic English communication",
        "Valid Ethiopian passport",
        "Knowledge of GPS navigation",
      ],
      am: [
        "ትክክለኛ የሾፌር ፍቃድ (2+ ዓመት)",
        "ዕድሜ ከ25–45 ዓመት",
        "ንጹህ የሥራ ዝርዝር",
        "መሰረታዊ የእንግሊዝኛ ግንኙነት",
        "ትክክለኛ የኢትዮጵያ ፓስፖርት",
        "የ GPS ናቪጌሽን እውቀት",
      ],
      om: [
        "Hayyama konkolaachisuu sirrii (waggaa 2+)",
        "Umrii 25–45",
        "Gabaasa konkolaachisuu qulqulluu",
        "Dubbii Inglizii bu'uraa",
        "Paaspoortii Itoophiyaa sirrii",
        "Beekumsa navigeeshina GPS",
      ],
    },
    responsibilities: {
      en: [
        "Family transportation",
        "Airport pick-up and drop-off",
        "Vehicle maintenance and cleaning",
        "School runs for children",
        "Grocery and errand runs",
        "Safe and timely driving",
      ],
      am: [
        "የቤተሰብ ትራንስፖርት",
        "የአውሮፕላን ማረፊያ አስተቃቅሎ",
        "የተሽከርካሪ ጥገና እና ማፅዳት",
        "ለልጆች ትምህርት ቤት ሩጫ",
        "ሸቀጥ እና ቁም ነገር ሩጫ",
        "ደህንነቱ የተጠበቀ እና ወቅታዊ ሽርሽር",
      ],
      om: [
        "Geejjiba maatii",
        "Fudhachuu fi gadhiisuu buufata xiyyaaraa",
        "Kunuunsa fi qulqulleessa gareejii",
        "Ijoollee mana barumsaa geessuu",
        "Gabaa fi ergaa deemuu",
        "Konkolaachisuu nagaa fi yeroo",
      ],
    },
    benefits: {
      en: [
        "Monthly salary $400–$650 USD",
        "Free accommodation",
        "Meals provided",
        "Medical insurance",
        "Vehicle fuel covered",
        "Return flight ticket",
      ],
      am: [
        "ወርሃዊ ደሞዝ $400–$650 ዶላር",
        "ነፃ መኖሪያ ቤት",
        "ምግብ ይሰጣል",
        "የሕክምና ኢንሹራንስ",
        "የተሽከርካሪ ነዳጅ ተሸፍኗል",
        "የመመለሻ አውሮፕላን ትኬት",
      ],
      om: [
        "Mindaa ji'a $400–$650 USD",
        "Mana jireenyaa bilisaa",
        "Nyaata ni kennama",
        "Inshuuraansii fayyaa",
        "Aannisaa gareejii haguugame",
        "Tikeettii xiyyaaraa deebi'uu",
      ],
    },
    salary:       { min: 400,  max: 650,  currency: "USD" },
    destinations: ["Dubai, UAE", "Saudi Arabia", "Kuwait"],
    openings:     60,
  },
  {
    slug:        "security",
    icon:        Shield,
    gradient:    "from-purple-500/15 to-purple-500/5",
    iconColor:   "text-purple-400",
    borderColor: "border-purple-500/20",
    shadowColor: "rgba(168,85,247,0.15)",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
      "https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=600&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    ],
    requirements: {
      en: [
        "Age 22–40 years",
        "Good physical condition",
        "Military or police background preferred",
        "Security training certificate",
        "Valid Ethiopian passport",
        "Clean criminal record required",
      ],
      am: [
        "ዕድሜ ከ22–40 ዓመት",
        "ጥሩ አካላዊ ሁኔታ",
        "ወታደራዊ ወይም ፖሊስ ዳራ ቢኖር ይመረጣል",
        "የደህንነት ስልጠና ሰርተፍኬት",
        "ትክክለኛ የኢትዮጵያ ፓስፖርት",
        "ንጹህ የወንጀል መዝገብ ያስፈልጋል",
      ],
      om: [
        "Umrii 22–40",
        "Haala qaamaa gaarii",
        "Seenaa waraanaa ykn poolisii ni filatama",
        "Waraqaa ragaa leenjii nageenyaa",
        "Paaspoortii Itoophiyaa sirrii",
        "Gabaasa yakka qulqulluu barbaachisa",
      ],
    },
    responsibilities: {
      en: [
        "Access control and monitoring",
        "CCTV surveillance",
        "Patrol of premises",
        "Incident reporting",
        "Visitor management",
        "Emergency response",
      ],
      am: [
        "የመግቢያ ቁጥጥር እና ክትትል",
        "የ CCTV ቁጥጥር",
        "የቦታ ጥበቃ",
        "የአደጋ ሪፖርት",
        "የጎብኚ አስተዳደር",
        "የአደጋ ጊዜ ምላሽ",
      ],
      om: [
        "Too'annoo fi hordoffii seensaa",
        "Hordoffii CCTV",
        "Naannoo tiksuu",
        "Gabaasa dhimma",
        "Bulchiinsa daawwataa",
        "Deebii yeroo hatattamaa",
      ],
    },
    benefits: {
      en: [
        "Monthly salary $450–$750 USD",
        "Free accommodation",
        "Uniform provided",
        "Medical insurance",
        "Shift allowances",
        "Return flight ticket",
      ],
      am: [
        "ወርሃዊ ደሞዝ $450–$750 ዶላር",
        "ነፃ መኖሪያ ቤት",
        "ዩኒፎርም ይሰጣል",
        "የሕክምና ኢንሹራንስ",
        "የሺፍት አበል",
        "የመመለሻ አውሮፕላን ትኬት",
      ],
      om: [
        "Mindaa ji'a $450–$750 USD",
        "Mana jireenyaa bilisaa",
        "Uffata waajjiraa ni kennama",
        "Inshuuraansii fayyaa",
        "Gargaarsa shiftii",
        "Tikeettii xiyyaaraa deebi'uu",
      ],
    },
    salary:       { min: 450,  max: 750,  currency: "USD" },
    destinations: ["Dubai, UAE", "Saudi Arabia", "Qatar", "Kuwait"],
    openings:     75,
  },
];

export const SERVICE_LABELS: Record<
  ServiceKey,
  { en: string; am: string; om: string }
> = {
  domestic: {
    en: "Domestic Workers",
    am: "የቤት ውስጥ ሰራተኞች",
    om: "Hojjattoota Mana",
  },
  hospitality: {
    en: "Hospitality Staff",
    am: "የማስተናገጃ ሠራተኞች",
    om: "Hojjattoota Keessummeessaa",
  },
  construction: {
    en: "Construction Workers",
    am: "የግንባታ ሰራተኞች",
    om: "Hojjattoota Ijaarsaa",
  },
  healthcare: {
    en: "Healthcare Workers",
    am: "የጤና ሰራተኞች",
    om: "Hojjattoota Fayyaa",
  },
  drivers: {
    en: "Professional Drivers",
    am: "ሙያዊ ሹፌሮች",
    om: "Konkolaachistoota Ogeeyyii",
  },
  security: {
    en: "Security Personnel",
    am: "የደህንነት ሰራተኞች",
    om: "Hojjattoota Nageenyaa",
  },
};

export const SERVICE_DESC: Record<
  ServiceKey,
  { en: string; am: string; om: string }
> = {
  domestic: {
    en: "Housemaids, cleaners, and caregivers for families abroad.",
    am: "ለውጭ ሀገር ቤተሰቦች የቤት ሰራተኞች፣ አጽጂዎች እና ተንከባካቢዎች።",
    om: "Hojjattoota mana, qulqulleessitootaa fi kunuunsitootaa maatiwwaniif alaa.",
  },
  hospitality: {
    en: "Hotel and restaurant workers for top Gulf establishments.",
    am: "ለምርጥ የባህረሰላጤ ሆቴሎች እና ምግብ ቤቶች ሰራተኞች።",
    om: "Hojjattoota hootelaa fi mana nyaataa dhaabbilee Gulf guddaa.",
  },
  construction: {
    en: "Skilled laborers for major construction projects.",
    am: "ለዋና ዋና የግንባታ ፕሮጀክቶች ክህሎት ያላቸው ሰራተኞች።",
    om: "Hojjattoota dandeettii pirojektoota ijaarsa gurguddaatiif.",
  },
  healthcare: {
    en: "Nurses and medical support staff for Gulf hospitals.",
    am: "ለባህረሰላጤ ሆስፒታሎች ነርሶች እና የሕክምና ረዳት ሰራተኞች።",
    om: "Naarsootaa fi hojjattoota gargaarsaa fayyaa hospitaalota Gulf.",
  },
  drivers: {
    en: "Licensed drivers for families and companies abroad.",
    am: "ለውጭ ሀገር ቤተሰቦች እና ኩባንያዎች ፍቃድ ያላቸው ሹፌሮች።",
    om: "Konkolaachistoota hayyama qaban maatiwwaniif fi dhaabbilee alaa.",
  },
  security: {
    en: "Trained guards for commercial and residential use.",
    am: "ለንግድ እና መኖሪያ ቤቶች የሰለጠኑ ጠባቂዎች።",
    om: "Tiksitoota leenjifaman fayyadama daldalaaf fi mana jireenyaatiif.",
  },
};
