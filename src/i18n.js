import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locales/en.json'
import translationUK from './locales/uk.json'

const resources = {
    en: { translation: translationEN },
    uk: { translation: translationUK }
}

i18n
    .use(LanguageDetector) // Detect lang of bowser
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en', // default language
        interpolation: {
            escapeValue: false // React already defend against XSS attack
        }
    })

export default i18n