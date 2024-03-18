import {
  CloseOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button, Card, Drawer, Tooltip } from 'antd';
import Color from 'color';
import { m } from 'framer-motion';
import { CSSProperties, useState } from 'react';
import { MdCircle } from 'react-icons/md';
import screenfull from 'screenfull';

import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { IconButton, SvgIcon } from '@/components/icon';
import { useSettings, useSettingsActions } from '@/store/settingStore';
import { colorPrimarys } from '@/theme/antd/theme';
import { useThemeToken } from '@/theme/hooks';
import { ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types/enum';

// TODO: i18n
export default function SettingButton() {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const { colorPrimary, colorBgBase, colorTextSecondary, colorBgContainer } = useThemeToken();

  const settings = useSettings();
  const { themeLayout, themeMode, themeStretch, themeColorPresets } = settings;
  const { setSettings } = useSettingsActions();

  const setThemeMode = (themeMode: ThemeMode) => {
    setSettings({
      ...settings,
      themeMode,
    });
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const setThemeStretch = (themeStretch: boolean) => {
    setSettings({
      ...settings,
      themeStretch,
    });
  };

  const setThemePresetColor = (themeColorPresets: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets,
    });
  };

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  };

  const [isFullscreen, setIsFullscreen] = useState<boolean>(screenfull.isFullscreen);
  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };

  const layoutBackground = (layout: ThemeLayout) =>
    themeLayout === layout
      ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)`
      : '#919eab';

  return (
    <>
      <div className="flex items-center justify-center">
        <m.div
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 12,
            ease: 'linear',
            repeat: Infinity,
          }}
          whileTap="tap"
          whileHover="hover"
        >
          <IconButton className="h-10 w-10" onClick={() => setDrawerVisible(true)}>
            <SvgIcon icon="ic-setting" size="24" />
          </IconButton>
        </m.div>
      </div>
      <Drawer
        placement="right"
        title="Settings"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closable={false}
        width={280}
        styles={{ body: { padding: 0 }, mask: { backgroundColor: 'transparent' } }}
        style={style}
        extra={
          <IconButton className="h-9 w-9 hover:scale-105" onClick={() => setDrawerVisible(false)}>
            <CloseOutlined className="text-gray-400" />
          </IconButton>
        }
        footer={
          <Button type="dashed" block size="large" onClick={toggleFullscreen}>
            <div className="flex items-center justify-center">
              {isFullscreen ? (
                <>
                  <SvgIcon
                    icon="ic-settings-exit-fullscreen"
                    color={colorPrimary}
                    className="!m-0"
                  />
                  <span className="ml-2">Exit FullScreen</span>
                </>
              ) : (
                <>
                  <SvgIcon icon="ic-settings-fullscreen" color={colorPrimary} className="!m-0" />
                  <span className="ml-2">FullScreen</span>
                </>
              )}
            </div>
          </Button>
        }
      >
        <div className="flex flex-col gap-6 p-6">
          {/* theme mode */}
          <div>
            <div
              className="mb-3 select-none text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Mode
            </div>
            <div className="flex flex-row gap-4">
              <Card
                className="flex h-20 w-full cursor-pointer items-center justify-center"
                onClick={() => setThemeMode(ThemeMode.Light)}
              >
                <SvgIcon
                  icon="ic-settings-mode-sun"
                  size="24"
                  color={themeMode === ThemeMode.Light ? colorPrimary : ''}
                />
              </Card>
              <Card
                className="flex h-20 w-full cursor-pointer items-center justify-center"
                onClick={() => setThemeMode(ThemeMode.Dark)}
              >
                <SvgIcon
                  icon="ic-settings-mode-moon"
                  size="24"
                  color={themeMode === ThemeMode.Dark ? colorPrimary : ''}
                />
              </Card>
            </div>
          </div>
          {/* theme layout */}
          <div>
            <div
              className="mb-3 select-none text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Layout
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Vertical */}
              <Card
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                onClick={() => setThemeLayout(ThemeLayout.Vertical)}
              >
                <div className="flex h-full w-7 flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                </div>
                <div className="w-ful h-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                </div>
              </Card>
              {/* Horizontal */}
              <Card
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                onClick={() => setThemeLayout(ThemeLayout.Horizontal)}
              >
                <div className="flex h-4 w-full items-center gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                  <div
                    className="h-1 w-4 flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                  <div
                    className="h-1 w-3 flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                </div>
              </Card>
              {/* Mini */}
              <Card
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                onClick={() => setThemeLayout(ThemeLayout.Mini)}
              >
                <div className="flex h-full w-4 flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 w-2 flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 w-2 flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
                <div className="w-ful h-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
              </Card>
            </div>
          </div>
          {/* theme stretch */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              <span className="mr-2 select-none">Stretch</span>
              <Tooltip title="Only available at large resolutions > 1600px (xl)">
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
            <Card
              className="flex h-20 w-full cursor-pointer items-center justify-center"
              bodyStyle={{
                width: '50%',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => setThemeStretch(!themeStretch)}
            >
              {themeStretch ? (
                <div
                  className="flex w-full items-center justify-center"
                  style={{ color: colorPrimary, transition: 'width 300ms 0ms' }}
                >
                  <LeftOutlined />
                  <div className="flex flex-grow border-b border-dashed" />
                  <RightOutlined />
                </div>
              ) : (
                <div
                  className="flex w-1/2 items-center justify-center"
                  style={{ color: colorPrimary, transition: 'width 300ms 0ms' }}
                >
                  <RightOutlined />
                  <div className="flex flex-grow border-b border-dashed" />
                  <LeftOutlined />
                </div>
              )}
            </Card>
          </div>
          {/* theme presets */}
          <div>
            <div
              className="mb-3 select-none text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Presets
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => (
                <Card
                  key={preset}
                  className="flex h-14 w-full cursor-pointer items-center justify-center"
                  style={{ backgroundColor: themeColorPresets === preset ? `${color}14` : '' }}
                  onClick={() => setThemePresetColor(preset as ThemeColorPresets)}
                >
                  <div style={{ color }}>
                    <MdCircle style={{ fontSize: themeColorPresets === preset ? 24 : 12 }} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
