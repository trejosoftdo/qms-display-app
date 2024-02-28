import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './src/common/translations';

const initTranslations = () => {
  i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      ...locales,
    },
    fallbackLng: 'es',
    lng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });
};

export default initTranslations;
