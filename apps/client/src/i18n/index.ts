import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import home from './en/home.json';

export const resources = {
  en: {
    home,
  },
};

i18next.use(initReactI18next).init({
  lng: 'en',
  resources,
  ns: ['home'],
  interpolation: {
    escapeValue: false,
  },
});
