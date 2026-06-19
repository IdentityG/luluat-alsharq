export const COMPANY = {
  name:        "Luluat Alsharq",
  fullName:    "Luluat Alsharq Foreign Employment Agent PLC",
  nameAm:      "ሉሉአት አልሸርቅ በውጭ ሀገር ስራና ሰራተኛ አገናኝ ኃ/የ/የግ/ማህበር",
  phone1:      "+251912646492",
  phone2:      "+251922118272",
  email:       "alsharqluluat3@gmail.com",
  address:     "Kera Sufi Tower, 3rd Floor, Office No. 305, Addis Ababa",
  tin:         "0086099722",
  license:     "NL/AA/2/0029419/2015",
  established: "2015",
  manager:     "Mrs. Lula Geday Amebaye",
} as const;

export const STATS = [
  { value: 5000,  suffix: "+", label_key: "hero.stats_workers" },
  { value: 5,     suffix: "+", label_key: "hero.stats_countries" },
  { value: 9,     suffix: "+", label_key: "hero.stats_years" },
  { value: 98,    suffix: "%", label_key: "hero.stats_success" },
] as const;

export const DESTINATIONS = [
  { id: "dubai",   flag: "🇦🇪", country: "UAE",          color: "#00732F" },
  { id: "saudi",   flag: "🇸🇦", country: "Saudi Arabia", color: "#006C35" },
  { id: "qatar",   flag: "🇶🇦", country: "Qatar",        color: "#8D1B3D" },
  { id: "kuwait",  flag: "🇰🇼", country: "Kuwait",       color: "#007A3D" },
  { id: "bahrain", flag: "🇧🇭", country: "Bahrain",      color: "#CE1126" },
] as const;

export const NAV_LINKS = [
  { href: "/",            key: "nav.home" },
  { href: "/services",   key: "nav.services" },
  { href: "/process",    key: "nav.process" },
  { href: "/destinations", key: "nav.destinations" },
  { href: "/about",      key: "nav.about" },
  { href: "/contact",    key: "nav.contact" },
] as const;