import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import adminEN from './locales/en/admin.json';
import authEN from './locales/en/auth.json';
import commonEN from './locales/en/common.json';
import homeEN from './locales/en/home.json';
import lockerEN from './locales/en/locker.json';
import mapEN from './locales/en/map.json';
import notificationsEN from './locales/en/notifications.json';
import ordersEN from './locales/en/orders.json';
import partnerEN from './locales/en/partner.json';
import profileEN from './locales/en/profile.json';
import sendPackageEN from './locales/en/sendPackage.json';
import supportEN from './locales/en/support.json';
import validationEN from './locales/en/validation.json';
import walletEN from './locales/en/wallet.json';
import adminVI from './locales/vi/admin.json';
import authVI from './locales/vi/auth.json';
// Import translation files
import commonVI from './locales/vi/common.json';
import homeVI from './locales/vi/home.json';
import lockerVI from './locales/vi/locker.json';
import mapVI from './locales/vi/map.json';
import notificationsVI from './locales/vi/notifications.json';
import ordersVI from './locales/vi/orders.json';
import partnerVI from './locales/vi/partner.json';
import profileVI from './locales/vi/profile.json';
import sendPackageVI from './locales/vi/sendPackage.json';
import supportVI from './locales/vi/support.json';
import validationVI from './locales/vi/validation.json';
import walletVI from './locales/vi/wallet.json';

const resources = {
  vi: {
    common: commonVI,
    auth: authVI,
    home: homeVI,
    orders: ordersVI,
    locker: lockerVI,
    wallet: walletVI,
    admin: adminVI,
    support: supportVI,
    partner: partnerVI,
    profile: profileVI,
    validation: validationVI,
    notifications: notificationsVI,
    sendPackage: sendPackageVI,
    map: mapVI,
  },
  en: {
    common: commonEN,
    auth: authEN,
    home: homeEN,
    orders: ordersEN,
    locker: lockerEN,
    wallet: walletEN,
    admin: adminEN,
    support: supportEN,
    partner: partnerEN,
    profile: profileEN,
    validation: validationEN,
    notifications: notificationsEN,
    sendPackage: sendPackageEN,
    map: mapEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    defaultNS: 'common',
    ns: [
      'common',
      'auth',
      'home',
      'orders',
      'locker',
      'wallet',
      'admin',
      'support',
      'partner',
      'profile',
      'validation',
      'notifications',
      'sendPackage',
      'map',
    ],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
