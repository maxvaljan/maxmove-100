
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  common: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    careers: 'Careers',
    business: 'Business Solutions',
    drivers: 'Become a Driver',
    terms: 'Terms & Conditions',
    cookies: 'Cookie Policy',
    privacy: 'Privacy Policy',
    footer: {
      slogan: 'Move anything, anytime, anywhere',
      rights: '© 2024 Maxmove. All rights reserved.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      contact: 'Contact',
    }
  }
};

// German translations
const deTranslations = {
  common: {
    home: 'Startseite',
    about: 'Über uns',
    contact: 'Kontakt',
    login: 'Anmelden',
    signup: 'Registrieren',
    careers: 'Karriere',
    business: 'Geschäftslösungen',
    drivers: 'Fahrer werden',
    terms: 'AGB',
    cookies: 'Cookie-Richtlinie',
    privacy: 'Datenschutzerklärung',
    footer: {
      slogan: 'Bewegen Sie alles, jederzeit, überall',
      rights: '© 2024 Maxmove. Alle Rechte vorbehalten.',
      quickLinks: 'Schnellzugriff',
      legal: 'Rechtliches',
      contact: 'Kontakt',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      de: deTranslations
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
