import { useCallback, useMemo } from 'react';

import { flattenMenuRoutes, menuFilter } from '../utils';

import { usePermissionRoutes } from './use-permission-routes';

/**
 * 返回扁平化的菜单路由
 */
export function useFlattenedRoutes() {
  const flattenedRoutes = useCallback(flattenMenuRoutes, []);
  const permissionRoutes = usePermissionRoutes();

  return useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return flattenedRoutes(menuRoutes);
  }, [flattenedRoutes, permissionRoutes]);
}
