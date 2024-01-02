import { ascend } from 'ramda';

import { AppRouteObject, RouteMeta } from '@/types/router';

/**
 * return new menus
 */
export const menuFilter = (items: AppRouteObject[]): AppRouteObject[] => {
  return items
    .filter((item) => {
      const show = item.meta?.key;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order || Infinity));
};

/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export const getMenuModules = () => {
  const menuModules: AppRouteObject[] = [];
  const modules = import.meta.glob('./routes/modules/**/*.tsx', { eager: true });
  Object.keys(modules).forEach((key) => {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  });
  return menuModules;
};

export const getMenuRoutes = (appRouteObjects: AppRouteObject[]) => {
  return menuFilter(appRouteObjects);
};

export const flattenMenuRoutes = (routes: AppRouteObject[]) => {
  return routes.reduce<RouteMeta[]>((perv, item) => {
    const { meta, children } = item;
    if (meta) perv.push(meta);
    if (children) perv.push(...flattenMenuRoutes(children));
    return perv;
  }, []);
};
