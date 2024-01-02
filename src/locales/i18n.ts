import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LocalEnum, StorageEnum } from '@/types/enum';
import { getStringItem } from '@/utils/storage';

import en_US from './lang/en_US';
import zh_CN from './lang/zh_CN';

const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.en_US as string);

i18n
  // 检测用户的语言
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: defaultLng,
    fallbackLng: LocalEnum.en_US,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN },
    },
  });

export default i18n;
export const { t } = i18n;
