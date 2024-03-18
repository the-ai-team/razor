import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import common_en from './en/common.json';
import home_en from './en/home.json';
import leaderboard_en from './en/leaderboard.json';
import race_en from './en/race.json';
import room_en from './en/room.json';

export const resources = {
  en: {
    home: home_en,
    room: room_en,
    race: race_en,
    common: common_en,
    leaderboard: leaderboard_en,
  },
};

i18next.use(initReactI18next).init({
  lng: 'en',
  resources,
  ns: ['home', 'room', 'race', 'leaderboard', 'common'],
  interpolation: {
    escapeValue: false,
  },
});
