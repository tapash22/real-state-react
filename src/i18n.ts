import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import bnTranslation from "./locales/bn.json";
import enTranslation from "./locales/en.json";

// Export resources for type declaration
export const defaultNS = "translation";
export const resources = {
  en: { translation: enTranslation },
  bn: { translation: bnTranslation },
} as const;

i18n
  .use(LanguageDetector) // Detects user's browser language automatically
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: "en",
    supportedLngs: ["en", "bn"],
    interpolation: {
      escapeValue: false, // React handles XSS safety
    },
  });

export default i18n;
