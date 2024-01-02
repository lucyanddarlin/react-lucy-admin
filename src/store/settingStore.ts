import { create } from 'zustand';

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types/enum';
import { getItem, removeItem, setItem } from '@/utils/storage';

type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  multiTab: boolean;
};

type SettingStore = {
  settings: SettingsType;
  // 使用 actions 命名空间来存放所有的 actions
  actions: {
    setSettings: (settings: SettingsType) => void;
    clearSetting: () => void;
  };
};

const defaultSetting: SettingsType = {
  themeColorPresets: ThemeColorPresets.Blue,
  themeMode: ThemeMode.Light,
  themeLayout: ThemeLayout.Vertical,
  themeStretch: false,
  breadCrumb: true,
  multiTab: true,
};

const useSettingStore = create<SettingStore>((set) => ({
  settings: getItem<SettingsType>(StorageEnum.Settings) || defaultSetting,
  actions: {
    setSettings(settings) {
      set({ settings });
      setItem(StorageEnum.Settings, settings);
    },
    clearSetting() {
      set({ settings: defaultSetting });
      removeItem(StorageEnum.Settings);
    },
  },
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingsActions = () => useSettingStore((state) => state.actions);
