import { Drawer } from 'antd';
import Color from 'color';
import { CSSProperties, useState } from 'react';

import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import LocalePicker from '@/components/LocalePicker';
import Logo from '@/components/Logo';
import { useSettings } from '@/store/settingStore';
import { useResponsive, useThemeToken } from '@/theme/hooks';
import { ThemeLayout } from '@/types/enum';

import AccountDropdown from '../components/AccountDropdown';
import { BreadCrumb } from '../components/BreadCrumb';
import NoticeButton from '../components/Notice';
import SearchBar from '../components/SearchBar';
import SettingButton from '../components/SettingButton';

import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH, OFFSET_HEADER_HEIGHT } from './config';
import Nav from './nav';

interface Props {
  offsetTop?: boolean;
  className?: string;
}

export default function Header({ offsetTop = false, className = '' }: Props) {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const { themeLayout, breadCrumb } = useSettings();
  const { colorBgElevated, colorBorder } = useThemeToken();
  const { screenMap } = useResponsive();

  const headerStyle: CSSProperties = {
    position: themeLayout === ThemeLayout.Horizontal ? 'relative' : 'fixed',
    borderBottom:
      themeLayout === ThemeLayout.Horizontal
        ? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
        : '',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  if (themeLayout === ThemeLayout.Horizontal) {
    headerStyle.width = '100vw';
  } else if (screenMap.md) {
    headerStyle.right = '0px';
    headerStyle.left = 'auto';
    headerStyle.width = `calc(100%  - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px)`;
  } else {
    headerStyle.width = '100vw';
  }

  return (
    <>
      <header className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-baseline">
            {themeLayout !== ThemeLayout.Horizontal ? (
              <IconButton className="h-10 w-10 md:hidden" onClick={() => setDrawerVisible(true)}>
                <SvgIcon icon="ic-menu" size="24" />
              </IconButton>
            ) : (
              <Logo className="mr-2 text-xl" />
            )}
            <div className="hidden md:block">{breadCrumb ? <BreadCrumb /> : null}</div>
          </div>

          <div className="flex">
            <SearchBar />
            <LocalePicker />
            <IconButton onClick={() => window.open('https://github.com/lucyanddarlin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <NoticeButton />
            <SettingButton />
            <AccountDropdown />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closeIcon={false}
        styles={{ header: { display: 'none' }, body: { padding: 0, overflow: 'hidden' } }}
        width="auto"
      >
        <Nav closeSideBarDrawer={() => setDrawerVisible(false)} />
      </Drawer>
    </>
  );
}
