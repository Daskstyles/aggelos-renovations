import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Home,
  LayoutList,
  Briefcase,
  Phone,
  Zap,
  Send,
  Globe,
} from "lucide-react";

// ---------- Types & i18n ----------

type Lang = "el" | "en";

const Colors = {
  Primary: "text-brand-dark",
  Accent: "bg-brand-accent hover:bg-brand-accentDark",
  AccentText: "text-white",
  Background: "bg-brand-bg",
  Card: "bg-brand-card/95 backdrop-blur",
  Border: "border-gray-200",
};

const translations = {
  el: {
    // Navigation
    nav_home: "Αρχική",
    nav_portfolio: "Έργα",
    nav_services: "Υπηρεσίες",
    nav_about: "Σχετικά",
    nav_contact: "Επικοινωνία",
    btn_quote: "Ζητήστε Προσφορά",

    // Home Page
    hero_h1: "Το Όραμά Σας. Η Κατασκευή Μας.",
    hero_h2: "Κατασκευές, Ανακαινίσεις & Μελέτη Εσωτερικών Χώρων.",
    hero_copy:
      "Ολοκληρωμένες λύσεις από την αρχική ιδέα έως την παράδοση του κλειδιού, με την υπογραφή του Αγγέλου Μισιρλάκη.",

    services_title: "Ολοκληρωμένες Υπηρεσίες",
    services_sub:
      "Καλύπτουμε κάθε ανάγκη του έργου σας με συνέπεια και ποιότητα.",
    service_1_title: "Κατασκευή",
    service_1_desc:
      "Νέες κτιριακές εγκαταστάσεις, επεκτάσεις και δομικές βελτιώσεις με σύγχρονες τεχνικές.",
    service_2_title: "Ανακαίνιση",
    service_2_desc:
      "Ολική ή μερική αναδιαμόρφωση κατοικιών και επαγγελματικών χώρων, με έμφαση στην ενεργειακή αναβάθμιση.",
    service_3_title: "Interior Design",
    service_3_desc:
      "Λειτουργική και αισθητική μελέτη του χώρου σας, επιλογή υλικών και επίπλων, διακόσμηση.",

    portfolio_title: "Επιλεγμένα Έργα",
    portfolio_sub:
      "Δείτε την ποιότητα της δουλειάς μας σε πραγματικές εφαρμογές.",

    cta_title: "Ξεκινήστε το Επόμενο Έργο Σας",
    cta_copy:
      "Επικοινωνήστε μαζί μας για μια δωρεάν μελέτη και προσφορά χωρίς δεσμεύσεις.",

    // Contact Page
    contact_info: "Στοιχεία Επικοινωνίας",
    contact_form_title: "Στείλτε μας το αίτημά σας",
    contact_name: "Όνομα",
    contact_email: "Email",
    contact_phone: "Τηλέφωνο",
    contact_project_type: "Τύπος Έργου",
    contact_message: "Περιγραφή Έργου",
    contact_submit: "Αποστολή Αιτήματος",
    contact_success:
      "Το αίτημά σας εστάλη επιτυχώς. Θα επικοινωνήσουμε μαζί σας σύντομα.",
    contact_types: {
      new: "Νέα Κατασκευή",
      reno: "Ολική Ανακαίνιση",
      design: "Interior Design",
      other: "Άλλο",
    },
    contact_select_default: "Επιλέξτε Τύπο",

    // Footer / About
    footer_copy:
      "© 2024 Aggelos Misirlakis. Με την εμπειρία και την αξιοπιστία της ποιότητας.",
    created_by: "Created by B.U Prime",
    view_project: "Προβολή Έργου",
    learn_more: "Μάθετε Περισσότερα",
    view_all_projects: "Δείτε Όλα τα Έργα",
    about_title: "Η Φιλοσοφία μας",
    about_text:
      "Στην Aggelos Misirlakis, πιστεύουμε ότι η κατασκευή είναι τέχνη και επιστήμη. Κάθε έργο αντιμετωπίζεται ως μοναδική πρόκληση, με στόχο όχι μόνο την τήρηση των προδιαγραφών αλλά την υπέρβαση των προσδοκιών.",
    about_quote:
      '"Το καλύτερο έργο είναι αυτό που αντέχει στον χρόνο, τόσο δομικά όσο και αισθητικά." - Άγγελος Μισιρλάκης',
  },
  en: {
    // Navigation
    nav_home: "Home",
    nav_portfolio: "Projects",
    nav_services: "Services",
    nav_about: "About",
    nav_contact: "Contact",
    btn_quote: "Get a Quote",

    // Home Page
    hero_h1: "Your Vision. Our Construction.",
    hero_h2: "Construction, Renovation & Interior Design.",
    hero_copy:
      "Comprehensive solutions from initial concept to turnkey delivery, signed by Aggelos Misirlakis.",

    services_title: "Comprehensive Services",
    services_sub:
      "Covering every need of your project with consistency and quality.",
    service_1_title: "Construction",
    service_1_desc:
      "New building facilities, extensions, and structural improvements using modern techniques.",
    service_2_title: "Renovation",
    service_2_desc:
      "Total or partial remodeling of residential and commercial spaces, focusing on energy upgrades.",
    service_3_title: "Interior Design",
    service_3_desc:
      "Functional and aesthetic study of your space, material and furniture selection, decoration.",

    portfolio_title: "Featured Projects",
    portfolio_sub: "See the quality of our work in real-world applications.",

    cta_title: "Start Your Next Project",
    cta_copy: "Contact us for a free study and quote without commitments.",

    // Contact Page
    contact_info: "Contact Information",
    contact_form_title: "Send us your request",
    contact_name: "Name",
    contact_email: "Email",
    contact_phone: "Phone",
    contact_project_type: "Project Type",
    contact_message: "Project Description",
    contact_submit: "Send Request",
    contact_success:
      "Your request was sent successfully. We will contact you shortly.",
    contact_types: {
      new: "New Construction",
      reno: "Full Renovation",
      design: "Interior Design",
      other: "Other",
    },
    contact_select_default: "Select Type",

    // Footer / About
    footer_copy:
      "© 2024 Aggelos Misirlakis. With experience and reliability of quality.",
    created_by: "Created by B.U Prime",
    view_project: "View Project",
    learn_more: "Learn More",
    view_all_projects: "View All Projects",
    about_title: "Our Philosophy",
    about_text:
      "At Aggelos Misirlakis, we believe construction is both art and science. Each project is treated as a unique challenge, aiming not only to meet specifications but to exceed expectations.",
    about_quote:
      '"The best project is one that stands the test of time, both structurally and aesthetically." - Aggelos Misirlakis',
  },
};

const projectsData = [
  {
    id: "a1",
    category: "Residential",
    image:
      "https://placehold.co/800x600/b79471/ffffff?text=Villa+P",
  },
  {
    id: "a2",
    category: "Commercial",
    image:
      "https://placehold.co/800x600/b79471/ffffff?text=Office+E",
  },
  {
    id: "a3",
    category: "Interior",
    image:
      "https://placehold.co/800x600/b79471/ffffff?text=Loft",
  },
];

const projectTitles: Record<Lang, string[]> = {
  el: [
    "Luxury Villa P. (Νέα Κατασκευή)",
    "Office Space E. (Ανακαίνιση)",
    "Minimal Loft (Interior Design)",
  ],
  en: [
    "Luxury Villa P. (New Build)",
    "Office Space E. (Renovation)",
    "Minimal Loft (Interior Design)",
  ],
};

// ---------- Language Context ----------

type Translations = typeof translations;

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations[Lang];
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const useLang = (): LangContextValue => {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangContext.Provider");
  }
  return ctx;
};

const getInitialLang = (): Lang => {
  if (typeof window === "undefined") return "el";
  const stored = window.localStorage.getItem("site_lang");
  return stored === "en" || stored === "el" ? (stored as Lang) : "el";
};

// ---------- Hash Routing ----------

function useHashRoute() {
  const get = () => (typeof window === "undefined" ? "#home" : window.location.hash || "#home");
  const [route, setRoute] = useState<string>(get);

  useEffect(() => {
    if (typeof window === "undefined") return;
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

// ---------- Shared Components ----------

interface AccentButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  icon?: React.ElementType;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const AccentButton: React.FC<AccentButtonProps> = ({
  children,
  className = "",
  href,
  icon: Icon = Send,
  type = "button",
  onClick,
}) => {
  const baseClasses = `flex items-center justify-center px-8 py-3 font-semibold rounded-lg shadow-xl transition duration-300 transform active:scale-95 ${Colors.Accent} ${Colors.AccentText} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick as any}>
        {children}
        <Icon className="w-5 h-5 ml-2" />
      </a>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick as any}>
      {children}
      <Icon className="w-5 h-5 ml-2" />
    </button>
  );
};

// Header
const SiteHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  const navItems = [
    { name: t.nav_home, hash: "#home", icon: Home },
    { name: t.nav_portfolio, hash: "#portfolio", icon: LayoutList },
    { name: t.nav_services, hash: "#services", icon: Briefcase },
    { name: t.nav_contact, hash: "#contact", icon: Phone },
  ];

  const toggleLang = () => setLang(lang === "el" ? "en" : "el");

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 shadow-md ${Colors.Border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a
            href="#home"
            className={`text-2xl font-extrabold tracking-tight ${Colors.Primary}`}
          >
            Aggelos Misirlakis
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={item.hash}
                className={`text-sm font-medium transition duration-200 hover:text-[#b79471] ${Colors.Primary}`}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center text-sm font-semibold text-gray-600 hover:text-[#b79471] px-2"
            >
              <Globe className="w-4 h-4 mr-1" />
              {lang === "el" ? "EN" : "EL"}
            </button>
            <AccentButton
              href="#contact"
              className="ml-4 py-2 px-4 shadow-lg text-sm"
              icon={Zap}
            >
              {t.btn_quote}
            </AccentButton>
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden p-2 rounded-lg transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className={`w-6 h-6 ${Colors.Primary}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
        }}
        className={`md:hidden overflow-hidden ${Colors.Card} ${Colors.Border} border-t`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              onClick={() => setIsOpen(false)}
              className={`flex items-center p-3 rounded-lg transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${Colors.Primary}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
            </a>
          ))}
          <button
            onClick={() => {
              toggleLang();
              setIsOpen(false);
            }}
            className="flex items-center p-3 text-sm font-bold"
          >
            <Globe className="w-5 h-5 mr-3" />
            {lang === "el" ? "Switch to English" : "Αλλαγή σε Ελληνικά"}
          </button>
          <AccentButton
            href="#contact"
            className="mt-4 w-full text-center"
            icon={Zap}
          >
            {t.btn_quote}
          </AccentButton>
        </div>
      </motion.div>
    </header>
  );
};

const Footer: React.FC = () => {
  const { t } = useLang();
  return (
    <footer className={`${Colors.Background} border-t ${Colors.Border} mt-20`}>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.footer_copy}
            </p>
            <a
              href="https://buprime.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-[#b79471] mt-1 block transition-colors"
            >
              {t.created_by}
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="#portfolio"
              className="text-gray-500 hover:text-[#b79471] transition duration-200 text-sm"
            >
              {t.nav_portfolio}
            </a>
            <a
              href="#services"
              className="text-gray-500 hover:text-[#b79471] transition duration-200 text-sm"
            >
              {t.nav_services}
            </a>
            <a
              href="#contact"
              className="text-gray-500 hover:text-[#b79471] transition duration-200 text-sm"
            >
              {t.nav_contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ---------- Sections ----------

const HeroSection: React.FC = () => {
  const { t } = useLang();
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://placehold.co/1920x1080/4f5b66/ffffff?text=Premium+Construction)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg mb-4">
          {t.hero_h1}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light drop-shadow-md mb-8">
          {t.hero_h2}
        </p>
        <AccentButton
          href="#contact"
          className="text-lg px-10 py-4 shadow-2xl"
          icon={Zap}
        >
          {t.btn_quote}
        </AccentButton>
      </motion.div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  const { t } = useLang();
  return (
    <section id="services" className={`py-20 ${Colors.Background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-4xl font-bold mb-3 ${Colors.Primary}`}>
          {t.services_title}
        </h2>
        <p className="text-xl text-gray-500 mb-12">{t.services_sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 1 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${Colors.Card} border-t-4 border-[#b79471]`}
          >
            <Briefcase className="w-10 h-10 mb-4 text-[#b79471] mx-auto" />
            <h3 className={`text-2xl font-semibold mb-3 ${Colors.Primary}`}>
              {t.service_1_title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.service_1_desc}
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-[#b79471] dark:text-gray-300 dark:hover:text-[#b79471] text-sm font-medium"
            >
              {t.learn_more}
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>

          {/* 2 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${Colors.Card} border-t-4 border-[#b79471]`}
          >
            <Home className="w-10 h-10 mb-4 text-[#b79471] mx-auto" />
            <h3 className={`text-2xl font-semibold mb-3 ${Colors.Primary}`}>
              {t.service_2_title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.service_2_desc}
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-[#b79471] dark:text-gray-300 dark:hover:text-[#b79471] text-sm font-medium"
            >
              {t.learn_more}
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>

          {/* 3 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${Colors.Card} border-t-4 border-[#b79471]`}
          >
            <LayoutList className="w-10 h-10 mb-4 text-[#b79471] mx-auto" />
            <h3 className={`text-2xl font-semibold mb-3 ${Colors.Primary}`}>
              {t.service_3_title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.service_3_desc}
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-[#b79471] dark:text-gray-300 dark:hover:text-[#b79471] text-sm font-medium"
            >
              {t.learn_more}
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection: React.FC = () => {
  const { t, lang } = useLang();
  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-4xl font-bold mb-3 ${Colors.Primary}`}>
          {t.portfolio_title}
        </h2>
        <p className="text-xl text-gray-500 mb-12">{t.portfolio_sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <img
                src={project.image}
                alt={projectTitles[lang][index]}
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/800x600/4f5b66/ffffff?text=Project";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-medium uppercase text-[#b79471] mb-1 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#b79471] transition duration-300">
                    {projectTitles[lang][index]}
                  </h3>
                  <a
                    href={`#portfolio/${project.id}`}
                    className="mt-2 inline-flex items-center text-white/80 hover:text-white transition duration-300 text-sm font-medium"
                  >
                    {t.view_project}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <AccentButton
            href="#portfolio"
            className="text-lg px-10 py-4"
            icon={LayoutList}
          >
            {t.view_all_projects}
          </AccentButton>
        </div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "success" | "submitting">(
    "idle",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const { t } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className={`py-20 ${Colors.Background}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:pr-8">
          <h2 className={`text-4xl font-bold mb-4 ${Colors.Primary}`}>
            {t.cta_title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t.cta_copy}
          </p>

          <h3 className={`text-2xl font-semibold mb-3 ${Colors.Primary}`}>
            {t.contact_info}
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-[#b79471]" /> +30 210 XXXX XXX
            </p>
            <p className="flex items-center">
              <Send className="w-5 h-5 mr-3 text-[#b79471]" />
              info@misirlakis.gr
            </p>
            <p>Αθήνα, Ελλάδα</p>
          </div>
        </div>

        <div className={`p-8 rounded-xl shadow-2xl ${Colors.Card}`}>
          <h3 className={`text-2xl font-semibold mb-6 ${Colors.Primary}`}>
            {t.contact_form_title}
          </h3>

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-green-50 border border-green-200 text-green-700 rounded-lg"
            >
              <p className="font-semibold">{t.contact_success}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={t.contact_name}
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full p-3 ${Colors.Card} ${Colors.Border} rounded-lg focus:ring-[#b79471] focus:border-[#b79471] dark:text-white`}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder={t.contact_email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 ${Colors.Card} ${Colors.Border} rounded-lg focus:ring-[#b79471] focus:border-[#b79471] dark:text-white`}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.contact_phone}
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 ${Colors.Card} ${Colors.Border} rounded-lg focus:ring-[#b79471] focus:border-[#b79471] dark:text-white`}
                />
              </div>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className={`w-full p-3 ${Colors.Card} ${Colors.Border} rounded-lg focus:ring-[#b79471] focus:border-[#b79471] dark:text-white`}
              >
                <option value="" disabled>
                  {t.contact_select_default}
                </option>
                <option value="new">{t.contact_types.new}</option>
                <option value="reno">{t.contact_types.reno}</option>
                <option value="design">{t.contact_types.design}</option>
                <option value="other">{t.contact_types.other}</option>
              </select>
              <textarea
                name="message"
                placeholder={t.contact_message}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full p-3 ${Colors.Card} ${Colors.Border} rounded-lg focus:ring-[#b79471] focus:border-[#b79471] dark:text-white`}
              />
              <AccentButton
                type="submit"
                className="w-full justify-center"
                icon={status === "submitting" ? Zap : Send}
              >
                {status === "submitting" ? "..." : t.contact_submit}
              </AccentButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ---------- Pages ----------

const HomePage: React.FC = () => (
  <main>
    <HeroSection />
    <ServicesSection />
    <PortfolioSection />
    <ContactSection />
  </main>
);

const PortfolioPage: React.FC = () => {
  const { t } = useLang();
  return (
    <div className="min-h-[80vh] py-20 max-w-7xl mx-auto px-4">
      <h1 className={`text-5xl font-extrabold mb-4 ${Colors.Primary}`}>
        {t.nav_portfolio}
      </h1>
      <p className="text-xl text-gray-500 mb-10">{t.portfolio_sub}</p>
      <PortfolioSection />
    </div>
  );
};

const ServicesDetailPage: React.FC = () => {
  const { t } = useLang();
  return (
    <div className="min-h-[80vh] py-20 max-w-7xl mx-auto px-4">
      <h1 className={`text-5xl font-extrabold mb-4 ${Colors.Primary}`}>
        {t.nav_services}
      </h1>
      <p className="text-xl text-gray-500 mb-10">{t.services_sub}</p>
      <ServicesSection />
      <div className="mt-12 text-center">
        <AccentButton href="#contact" className="text-lg px-10 py-4" icon={Zap}>
          {t.btn_quote}
        </AccentButton>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const { t } = useLang();
  return (
    <div className="min-h-[80vh] py-20 max-w-7xl mx-auto px-4">
      <h1 className={`text-5xl font-extrabold mb-4 ${Colors.Primary}`}>
        {t.nav_about}
      </h1>
      <p className="text-xl text-gray-500 mb-6">Aggelos Misirlakis</p>

      <div className={`p-8 rounded-xl shadow-lg ${Colors.Card}`}>
        <h3 className={`text-3xl font-semibold mb-4 ${Colors.Primary}`}>
          {t.about_title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.about_text}
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
          {t.about_quote}
        </p>
      </div>
    </div>
  );
};

// ---------- Main App ----------

export default function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const t = translations[lang];
  const route = useHashRoute();
  const cleanRoute = route.split("/")[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("site_lang", lang);
    document.documentElement.lang = lang === "el" ? "el" : "en";
  }, [lang]);

  const CurrentPage = useMemo(() => {
    switch (cleanRoute) {
      case "#portfolio":
        return PortfolioPage;
      case "#services":
        return ServicesDetailPage;
      case "#about":
        return AboutPage;
      case "#contact":
        return ContactSection;
      case "#home":
      default:
        return HomePage;
    }
  }, [cleanRoute]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div className={`${Colors.Background} min-h-screen font-sans`}>
        <SiteHeader />
        <CurrentPage />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
