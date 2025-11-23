// src/App.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Home, LayoutGrid, Users, Phone, Loader2, Menu, X, Globe, DollarSign, Clock, Zap, Target } from "lucide-react";
import { clsx } from "clsx";

// --- INLINE TRANSLATIONS (To fix import errors) ---

const en = {
  nav_home: "Home",
  nav_about: "About Us",
  nav_services: "Services",
  nav_projects: "Projects",
  nav_contact: "Contact",
  account_login: "Log in",
  logout: "Sign out",
  get_quote: "Get a Quote",
  btn_services: "View Services",
  btn_projects: "Our Portfolio",
  btn_contact: "Start Your Project",
  hero_h1_1: "Modern Design",
  hero_h1_2: "Meets Expert Craftsmanship",
  hero_copy: "We specialize in premium residential and commercial renovations across Athens and the Greek islands. Quality is our blueprint.",
  section_services_title: "Our Core Services",
  section_services_sub: "From concept to completion, we handle every detail of your transformation.",
  service_1_title: "Full Home Renovations",
  service_1_desc: "Complete overhaul of apartments, houses, and villas. Structural changes, new layouts, and high-end finishes.",
  service_2_title: "Kitchen & Bath Renewal",
  service_2_desc: "Modern and functional spaces using premium materials, smart storage, and energy-efficient installations.",
  service_3_title: "Architectural Consulting",
  service_3_desc: "Design planning, 3D visualization, permit management, and sourcing unique, sustainable materials.",
  service_4_title: "Commercial Spaces",
  service_4_desc: "Bespoke renovations for offices, retail stores, and hotels designed for maximum utility and aesthetic appeal.",
  why_title: "The Anagel Difference",
  why_sub: "Quality control, transparent timelines, and guaranteed results.",
  why_1_h: "Transparent Quotes",
  why_1_p: "No hidden costs. Detailed breakdown of labor and materials before we start.",
  why_2_h: "Guaranteed Timeline",
  why_2_p: "We stick to the schedule. Every project milestone is legally binding.",
  why_3_h: "Expert Team",
  why_3_p: "Our certified engineers, architects, and foremen ensure the highest standards.",
  process_title: "Our Renovation Roadmap",
  process_sub: "A clear, structured process ensures your vision becomes a reality, on time and on budget.",
  process_1_h: "1. Consultation & Design",
  process_1_p: "Initial meeting, site assessment, needs analysis, and 3D concept development.",
  process_2_h: "2. Execution & Build",
  process_2_p: "Permit acquisition, structural work, utilities installation, and continuous site supervision.",
  process_3_h: "3. Finishing & Handover",
  process_3_p: "Installation of finishes, final quality checks, professional cleaning, and delivery of warranties.",
  contact_title: "Ready to Transform Your Space?",
  contact_sub: "Tell us about your project and we'll schedule a complimentary consultation.",
  form_name: "Name",
  form_email: "Email",
  form_phone: "Phone (Optional)",
  form_project_type: "Project Type",
  form_message: "Tell us about your renovation goals...",
  form_submit: "Send Inquiry",
  footer_address: "Address: 123 Construction Ave, Athens, Greece",
  footer_copyright: "© 2024 Anagel Renovations. All rights reserved.",
  footer_privacy: "Privacy Policy",
  footer_terms: "Terms of Service",
};

const el = {
  nav_home: "Αρχική",
  nav_about: "Σχετικά",
  nav_services: "Υπηρεσίες",
  nav_projects: "Έργα",
  nav_contact: "Επικοινωνία",
  account_login: "Σύνδεση",
  logout: "Αποσύνδεση",
  get_quote: "Ζητήστε Προσφορά",
  btn_services: "Δείτε Υπηρεσίες",
  btn_projects: "Το Portfolio μας",
  btn_contact: "Ξεκινήστε το Έργο σας",
  hero_h1_1: "Μοντέρνος Σχεδιασμός",
  hero_h1_2: "Συναντά την Εξειδικευμένη Τεχνογνωσία",
  hero_copy: "Ειδικευόμαστε σε premium ανακαινίσεις κατοικιών και επαγγελματικών χώρων σε όλη την Αθήνα και τα νησιά. Η ποιότητα είναι ο οδηγός μας.",
  section_services_title: "Οι Βασικές Υπηρεσίες μας",
  section_services_sub: "Από τη σύλληψη έως την ολοκλήρωση, αναλαμβάνουμε κάθε λεπτομέρεια του μετασχηματισμού σας.",
  service_1_title: "Ολικές Ανακαινίσεις",
  service_1_desc: "Πλήρης αναμόρφωση διαμερισμάτων, μονοκατοικιών και βιλών. Δομικές αλλαγές, νέες διαρρυθμίσεις και high-end υλικά.",
  service_2_title: "Ανανέωση Κουζίνας & Μπάνιου",
  service_2_desc: "Μοντέρνοι και λειτουργικοί χώροι με χρήση premium υλικών, έξυπνες αποθηκευτικές λύσεις και ενεργειακά αποδοτικές εγκαταστάσεις.",
  service_3_title: "Αρχιτεκτονική Συμβουλευτική",
  service_3_desc: "Σχεδιασμός, 3D απεικόνιση, διαχείριση αδειών και προμήθεια μοναδικών, βιώσιμων υλικών.",
  service_4_title: "Επαγγελματικοί Χώροι",
  service_4_desc: "Ειδικές ανακαινίσεις για γραφεία, καταστήματα λιανικής και ξενοδοχεία, σχεδιασμένες για μέγιστη χρηστικότητα και αισθητική.",
  why_title: "Η Διαφορά της Anagel",
  why_sub: "Έλεγχος ποιότητας, διαφανή χρονοδιαγράμματα και εγγυημένα αποτελέσματα.",
  why_1_h: "Διαφανείς Προσφορές",
  why_1_p: "Χωρίς κρυφά κόστη. Λεπτομερής ανάλυση εργασιών και υλικών πριν την έναρξη.",
  why_2_h: "Εγγυημένο Χρονοδιάγραμμα",
  why_2_p: "Τηρούμε το πρόγραμμα. Κάθε ορόσημο έργου είναι νομικά δεσμευτικό.",
  why_3_h: "Εξειδικευμένη Ομάδα",
  why_3_p: "Οι πιστοποιημένοι μηχανικοί, αρχιτέκτονες και εργοδηγοί μας εξασφαλίζουν τα υψηλότερα πρότυπα.",
  process_title: "Ο Οδικός μας Χάρτης Ανακαίνισης",
  process_sub: "Μια σαφής, δομημένη διαδικασία διασφαλίζει ότι το όραμά σας γίνεται πραγματικότητα, εντός χρονοδιαγράμματος και προϋπολογισμού.",
  process_1_h: "1. Συμβουλευτική & Σχεδιασμός",
  process_1_p: "Αρχική συνάντηση, επιτόπια αξιολόγηση, ανάλυση αναγκών και ανάπτυξη 3D concept.",
  process_2_h: "2. Εκτέλεση & Κατασκευή",
  process_2_p: "Έκδοση αδειών, δομικές εργασίες, εγκατάσταση δικτύων και συνεχής επίβλεψη έργου.",
  process_3_h: "3. Ολοκλήρωση & Παράδοση",
  process_3_p: "Εγκατάσταση τελικών υλικών, τελικοί έλεγχοι ποιότητας, επαγγελματικός καθαρισμός και παράδοση εγγυήσεων.",
  contact_title: "Έτοιμοι να Μεταμορφώσετε τον Χώρο σας;",
  contact_sub: "Πείτε μας για το έργο σας και θα κανονίσουμε μια δωρεάν συμβουλευτική συνεδρία.",
  form_name: "Όνομα",
  form_email: "Email",
  form_phone: "Τηλέφωνο (Προαιρετικό)",
  form_project_type: "Τύπος Έργου",
  form_message: "Περιγράψτε μας τους στόχους της ανακαίνισής σας...",
  form_submit: "Αποστολή Ερωτήματος",
  footer_address: "Διεύθυνση: 123 Οδός Κατασκευών, Αθήνα, Ελλάδα",
  footer_copyright: "© 2024 Anagel Renovations. Με επιφύλαξη παντός δικαιώματος.",
  footer_privacy: "Πολιτική Απορρήτου",
  footer_terms: "Όροι Χρήσης",
};

// -------------------------------------------------

type Lang = "en" | "el";
type Dict = typeof en;

export const dictionaries: Record<Lang, Dict> = { en, el };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string, fallback?: string) => any };
const I18nContext = createContext<Ctx | null>(null);

function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    return stored === "el" || stored === "en" ? stored : (location.pathname.startsWith("/el") ? "el" : "en");
  });

  useEffect(() => { try { localStorage.setItem("lang", lang); } catch {} }, [lang]);
  const setLang = (l: Lang) => setLangState(l);

  const t = useMemo(
    () => (key: string, fallback?: string) => {
      const obj = dictionaries[lang] as any;
      return key.split(".").reduce((acc, k) => (acc?.[k] ?? undefined), obj) ?? (fallback ?? key);
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
// ------------------------------------------------------------------

// --- Utilities ---
function useHashRoute() {
  const get = () => window.location.hash || "#home";
  const [route, setRoute] = useState<string>(get);
  useEffect(() => {
    const on = () => setRoute(get());
    window.addEventListener("hashchange", on, { passive: true });
    window.addEventListener("pageshow", on, { passive: true });
    return () => {
      window.removeEventListener("hashchange", on as any);
      window.removeEventListener("pageshow", on as any);
    };
  }, []);
  return route;
}

function goContact(q?: Record<string, string | number | undefined>) {
  let hash = "#contact";
  if (q && Object.keys(q).length) {
    const params = new URLSearchParams(q as Record<string, string>).toString();
    hash += `?${params}`;
  }
  window.location.hash = hash;
}

// --- Common Components ---

const Button = ({ children, primary = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) => (
  <button
    {...props}
    className={clsx(
      "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform shadow-lg",
      primary
        ? "bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98] shadow-blue-500/50"
        : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 active:scale-[0.99] dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600",
      props.className
    )}
  >
    {children}
  </button>
);

const Section = ({ titleKey, subKey, children, className = "" }: { titleKey: string; subKey: string; children: React.ReactNode; className?: string }) => {
  const { t } = useI18n();
  return (
    <section id={titleKey.split('_')[0]} className={clsx("py-20 md:py-32 overflow-hidden", className)}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {t(titleKey)}
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t(subKey)}
          </p>
        </motion.div>
        {children}
      </div>
    </section>
  );
};

// --- Header Component ---

const SiteHeader = () => {
  const { t, lang, setLang } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const route = useHashRoute();

  const navItems = [
    { key: "nav_home", hash: "#home" },
    { key: "nav_services", hash: "#services" },
    { key: "nav_projects", hash: "#projects" },
    { key: "nav_about", hash: "#about" },
  ];

  const handleLinkClick = (hash: string) => {
    setIsMenuOpen(false);
    window.location.hash = hash;
  };

  const currentLang = lang === 'en' ? 'EN' : 'EL';
  const otherLang = lang === 'en' ? 'el' : 'en';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm dark:bg-slate-950/95 border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold text-blue-700 dark:text-blue-400 tracking-wider">
          ANAGEL
          <span className="text-slate-500 dark:text-slate-300 text-sm font-normal ml-1">Renovations</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map(item => (
            <a key={item.key} href={item.hash} onClick={() => handleLinkClick(item.hash)}
              className={clsx(
                "text-lg font-medium transition-colors hover:text-blue-700 dark:hover:text-blue-400",
                route.startsWith(item.hash) ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Right side CTAs and Lang Switch */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLang(otherLang as Lang)}
            className="text-sm font-semibold p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${otherLang.toUpperCase()}`}
          >
            <Globe className="w-5 h-5 inline-block mr-1 text-slate-500" />
            {currentLang}
          </button>
          
          <a href="#contact">
            <Button primary className="hidden sm:inline-flex">{t("get_quote")}</Button>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-xl"
        >
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map(item => (
              <a key={item.key} href={item.hash} onClick={() => handleLinkClick(item.hash)}
                className="py-2 px-3 text-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              >
                {t(item.key)}
              </a>
            ))}
             <a href="#contact" className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button primary className="w-full justify-center">{t("get_quote")}</Button>
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// --- Custom Components ---

const RenovationVisual = ({ className }: { className?: string }) => {
  // Simple, abstract visual representing construction and design.
  const baseColor = "#1d4ed8"; // Blue-700
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 10 }}
        className={clsx("relative w-full aspect-square max-w-md mx-auto", className)}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background blueprint grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#60a5fa33" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" rx="8"/>

        {/* Abstract structure elements */}
        <motion.rect 
            x="10" y="40" width="30" height="50" rx="4" fill={`${baseColor}20`} stroke={baseColor} strokeWidth="1"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.rect 
            x="45" y="55" width="45" height="35" rx="4" fill={`${baseColor}40`} stroke={baseColor} strokeWidth="1"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
        />
        
        {/* Crane Hook/Moving Element (Dynamic) */}
        <motion.line
            x1="50" y1="10" x2="50" y2="30" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round"
            animate={{ y1: [10, 15, 10], y2: [30, 35, 30] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect 
            x="48" y="30" width="4" height="4" rx="1" fill="#fcd34d"
            animate={{ y: [30, 35, 30] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Design/Pencil Icon */}
        <circle cx="85" cy="15" r="10" fill="white" stroke={baseColor} strokeWidth="1" />
        <path d="M80 17 L85 13 L90 17 L85 21 Z" fill={baseColor} />

      </svg>
    </motion.div>
  );
};


// --- Section Components ---

const HomeSection = () => {
  const { t } = useI18n();
  return (
    <section id="home" className="pt-16 md:pt-24 pb-20 md:pb-32 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
              {t("hero_h1_1")}
              <br className="hidden sm:inline" />
              <span className="text-blue-700 dark:text-blue-400"> {t("hero_h1_2")}</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-xl lg:max-w-none mx-auto lg:mx-0">
              {t("hero_copy")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <a href="#contact">
                <Button primary className="w-full sm:w-auto">{t("btn_contact")} <ArrowRight className="w-5 h-5 ml-2" /></Button>
              </a>
              <a href="#services">
                <Button className="w-full sm:w-auto">{t("btn_services")}</Button>
              </a>
            </div>
          </motion.div>

          <RenovationVisual className="mt-12 lg:mt-0" />
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { t } = useI18n();
  const services = [
    { titleKey: "service_1_title", descKey: "service_1_desc", icon: Home },
    { titleKey: "service_2_title", descKey: "service_2_desc", icon: LayoutGrid },
    { titleKey: "service_3_title", descKey: "service_3_desc", icon: Users },
    { titleKey: "service_4_title", descKey: "service_4_desc", icon: Target },
  ];

  return (
    <Section titleKey="section_services_title" subKey="section_services_sub" className="bg-white dark:bg-slate-950">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {services.map((service, index) => (
          <motion.div
            key={service.titleKey}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-shadow"
          >
            <service.icon className="w-10 h-10 text-blue-700 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{t(service.titleKey)}</h3>
            <p className="text-slate-600 dark:text-slate-400">{t(service.descKey)}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const ProcessSection = () => {
  const { t } = useI18n();
  const steps = [
    { id: 1, titleKey: "process_1_h", descKey: "process_1_p" },
    { id: 2, titleKey: "process_2_h", descKey: "process_2_p" },
    { id: 3, titleKey: "process_3_h", descKey: "process_3_p" },
  ];

  return (
    <Section titleKey="process_title" subKey="process_sub" className="bg-slate-50 dark:bg-slate-900">
      <div className="relative flex flex-col md:flex-row justify-between items-start mt-16">
        {/* Timeline Line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-900 hidden md:block"></div>
        
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={clsx(
              "relative w-full md:w-1/3 p-6 md:p-12",
              index % 2 === 0 ? "md:text-right md:pr-20" : "md:text-left md:pl-20"
            )}
          >
            {/* Step Icon/Number */}
            <div className={clsx(
                "absolute -left-1 md:top-12 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white z-10",
                "bg-blue-700 dark:bg-blue-500",
                index % 2 === 0 ? "md:right-1 md:left-auto" : ""
            )}>
                {step.id}
            </div>

            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white mt-10 md:mt-0">{t(step.titleKey)}</h3>
            <p className="text-slate-600 dark:text-slate-400">{t(step.descKey)}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const WhySection = () => {
    const { t } = useI18n();
    const features = [
        { titleKey: "why_1_h", descKey: "why_1_p", icon: DollarSign },
        { titleKey: "why_2_h", descKey: "why_2_p", icon: Clock },
        { titleKey: "why_3_h", descKey: "why_3_p", icon: Zap },
    ];

    return (
        <Section titleKey="why_title" subKey="why_sub" className="bg-white dark:bg-slate-950">
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.titleKey}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl border-t-4 border-blue-600 dark:border-blue-500 text-center"
                    >
                        <feature.icon className="w-12 h-12 text-blue-700 dark:text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t(feature.titleKey)}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{t(feature.descKey)}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};


const ContactSection = () => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Simple form submission handler (does not actually call Vercel API, only mocks success)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setTimeout(() => {
        setLoading(false);
        // In a real Vercel app, you would fetch('/api/contact', ...) here
        setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
        >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {t("contact_title")}
            </h2>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {t("contact_sub")}
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-12 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('form_name')}</label>
                        <input type="text" id="name" required className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('form_email')}</label>
                        <input type="email" id="email" required className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('form_phone')}</label>
                        <input type="tel" id="phone" className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="project_type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('form_project_type')}</label>
                        <select id="project_type" required className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                            <option value="">-- Select --</option>
                            <option value="home">{t('service_1_title')}</option>
                            <option value="kitchen_bath">{t('service_2_title')}</option>
                            <option value="commercial">{t('service_4_title')}</option>
                            <option value="consulting">{t('service_3_title')}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('form_message')}</label>
                    <textarea id="message" rows={4} required className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"></textarea>
                </div>
                
                <Button type="submit" primary disabled={loading || status === 'success'} className="w-full justify-center">
                    {loading ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {t('form_submit')}</>
                    ) : status === 'success' ? (
                        <><Check className="w-5 h-5 mr-2" /> Inquiry Sent!</>
                    ) : (
                        t('form_submit')
                    )}
                </Button>
                {status === 'error' && (
                    <p className="text-sm text-center text-red-500">
                        There was an error sending your message. Please try again or call us.
                    </p>
                )}
            </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
    const { t } = useI18n();
    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-white/80 border-t border-blue-700/50 pt-16 pb-8">
            <div className="container mx-auto px-4 max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-10">
                <div className="col-span-2 md:col-span-2">
                    <a href="#home" className="text-3xl font-bold text-blue-400 tracking-wider">
                        ANAGEL
                        <span className="text-slate-300 text-sm font-normal ml-1">Renovations</span>
                    </a>
                    <p className="mt-4 text-slate-400 max-w-xs">{t('hero_copy')}</p>
                </div>

                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><a href="#services" className="hover:text-blue-400 transition-colors">{t('nav_services')}</a></li>
                        <li><a href="#projects" className="hover:text-blue-400 transition-colors">{t('nav_projects')}</a></li>
                        <li><a href="#about" className="hover:text-blue-400 transition-colors">{t('nav_about')}</a></li>
                        <li><a href="#contact" className="hover:text-blue-400 transition-colors">{t('nav_contact')}</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Legal</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer_privacy')}</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer_terms')}</a></li>
                    </ul>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <h4 className="text-xl font-semibold mb-4 text-white">Contact</h4>
                    <p className="text-slate-400">
                        {t('footer_address')}
                    </p>
                    <p className="mt-2 text-blue-400 font-semibold">
                        <Phone className="inline-block w-4 h-4 mr-2" />+30 210 XXX XXXX
                    </p>
                </div>
            </div>
            
            <div className="mt-16 border-t border-slate-700/50 pt-6 text-center">
                <p className="text-sm text-slate-500">{t('footer_copyright')}</p>
            </div>
        </footer>
    );
};

// --- Main App Route Switcher ---

export default function App() {
  // Use I18nProvider to wrap the entire app to enable internationalization
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

function AppContent() {
  const route = useHashRoute();

  // Project Page Placeholder (Single, static page)
  if (route === "#projects") {
    return (
      <>
        <SiteHeader />
        <Section 
            titleKey="nav_projects" 
            subKey="A selection of our best residential and commercial work." 
            className="min-h-screen pt-24 md:pt-32"
        >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="aspect-video bg-blue-700/20 flex items-center justify-center text-slate-600 dark:text-slate-300">
                            <Home className="w-12 h-12" />
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-lg">Project {i + 1} Title</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Athens, {i % 2 === 0 ? "Residential" : "Commercial"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
        <ContactSection />
        <Footer />
      </>
    );
  }
  
  // About Page Placeholder (Single, static page)
  if (route === "#about") {
    const { t } = useI18n();
    return (
      <>
        <SiteHeader />
        <Section 
            titleKey="nav_about" 
            subKey="Building dreams with honesty, expertise, and precision." 
            className="min-h-screen pt-24 md:pt-32"
        >
             <div className="grid md:grid-cols-2 gap-12 mt-12">
                <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300">
                    <p>
                        Anagel was founded on the principle that the renovation process should be as seamless and stress-free as the finished product is beautiful. We are a team of licensed Greek engineers, architects, and experienced foremen dedicated to delivering premium quality on every project.
                    </p>
                    <p>
                        Our mission is to combine the timeless aesthetic of Greek design with modern functionality and sustainable building practices. We handle all planning, permitting, and execution, ensuring full compliance and transparency from day one.
                    </p>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/50 rounded-xl shadow-inner border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Our Values</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start"><Check className="w-5 h-5 text-blue-700 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" /> Precision in Craftsmanship</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-blue-700 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" /> Transparency in Cost</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-blue-700 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" /> Commitment to Timeline</li>
                    </ul>
                </div>
             </div>
        </Section>
        <ContactSection />
        <Footer />
      </>
    );
  }

  // Main Landing Page
  return (
    <>
      <SiteHeader />
      <main>
        <HomeSection />
        <WhySection />
        <ServicesSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
