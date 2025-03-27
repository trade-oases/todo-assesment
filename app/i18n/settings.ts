export const  supportedLanguages={
  "en": "English",
  "de": "Deutsch",
  "es": "Español",
  "fr": "Français",
  "ar": "عربي"
}
export const fallbackLng = 'en'
export const languages = Object.keys(supportedLanguages)
export const cookieName = 'languageSetting'
export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}