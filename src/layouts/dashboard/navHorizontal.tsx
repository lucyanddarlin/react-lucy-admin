import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CSSProperties, useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import { usePermissionRoutes } from '@/router/hooks/use-permission-routes';
import { useRouteToMenuFn } from '@/router/hooks/use-route-menu';
import { menuFilter } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

import { NAV_HORIZONTAL_HEIGHT } from './config';

export default function NavHorizontal() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorBgElevated } = useThemeToken();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();

  /**
   * state
   */
  const [openKey, setOpenKey] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<ItemType[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const menus = routeToMenuFn(menuRoutes);
    setMenuList(menus);
  }, [permissionRoutes, routeToMenuFn]);

  /**
   * events
   */
  const onOpenChanged: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKey(keys);
    } else {
      setOpenKey([]);
    }
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  /**
   * styles
   */
  const menuStyles: CSSProperties = {
    background: colorBgElevated,
    userSelect: 'none',
  };

  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        className="!z-10 !border-none"
        defaultOpenKeys={openKey}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKey}
        onOpenChange={onOpenChanged}
        onClick={onClick}
        style={menuStyles}
      />
    </div>
  );
}
