import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import useLocale from '@/locales/useLocale';
import { useSettings } from '@/store/settingStore';
import { ThemeMode } from '@/types/enum';

import {
  colorPrimary,
  customComponentConfig,
  customThemeTokenConfig,
  themeModeToken,
} from './theme';

interface Props {
  children: React.ReactNode;
}

export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets } = useSettings();
  const { language } = useLocale();

  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const primaryColor = colorPrimary[themeColorPresets];

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{
        token: {
          colorPrimary: primaryColor,
          ...customThemeTokenConfig,
          ...themeModeToken[themeMode].token,
        },
        components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
        algorithm,
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
