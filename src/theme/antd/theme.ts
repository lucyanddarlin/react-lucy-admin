import { ThemeConfig } from 'antd';

import { ThemeColorPresets } from '@/types/enum';

// 颜色编辑
const customThemeTokenConfig: ThemeConfig['token'] = {
  colorSuccess: '#22c55e',
  colorWarning: '#ff7849',
  colorError: '#ff5630',
  colorInfo: '#00b8d9',

  // 线性化
  wireframe: false,

  borderRadiusSM: 2,
  borderRadius: 4,
  borderRadiusLG: 8,
};

const customComponentConfig: ThemeConfig['components'] = {
  Breadcrumb: {
    fontSize: 12,
    separatorMargin: 4,
  },
  Menu: {
    fontSize: 14,
    colorFillAlter: 'transparent',
    itemColor: 'rgb(145, 158, 171)',
  },
};

const colorPrimary: { [k in ThemeColorPresets]: string } = {
  default: '#00a76f',
  cyan: '#078DEE',
  purple: '#7635DC',
  blue: '#2065D1',
  orange: '#FDA92D',
  red: '#FF3030',
};

const themeModeToken: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorBgLayout: '#161c24',
      colorBgContainer: '#212b36',
      colorBgElevated: '#161c24',
    },
    components: {
      Modal: {
        headerBg: '#212b36',
        contentBg: '#212b36',
        footerBg: '#212b36',
      },
      Notification: {},
    },
  },
  light: {},
};

export { customThemeTokenConfig, customComponentConfig, colorPrimary, themeModeToken };