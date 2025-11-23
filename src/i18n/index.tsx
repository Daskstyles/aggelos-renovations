// src/i18n/index.tsx
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import en from "./en";
import el from "././el";

export type Lang = "en" | "el";
type Dict = typeof en; // both have same shape

export const dictionaries: Record<Lang, Dict> = { en, el };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string, fallback?: string) => any };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    return stored === "el" || stored === "en" ? stored : (location.pathname.startsWith("/el") ? "el" : "en");
  });

  useEffect(() => { try { localStorage.setItem("lang", lang); } catch {} }, [lang]);
  const setLang = (l: Lang) => setLangState(l);

  const t = useMemo(
    () => (key: string, fallback?: string) => {
      // supports nested keys like "about.hero_title"
      const obj = dictionaries[lang] as any;
      return key.split(".").reduce((acc, k) => (acc?.[k] ?? undefined), obj) ?? (fallback ?? key);
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
