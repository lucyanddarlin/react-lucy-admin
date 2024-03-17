import { useEffect, useState } from 'react';
import { useMatches, useOutlet } from 'react-router-dom';

import { RouteMeta } from '@/types/router';

import { useFlattenedRoutes } from './use-flattened-routes';
import { useRouter } from './use-router';

/**
 * 返回当前路由 Meta 信息
 */
export function useMatchRouteMeta() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();

  // 获取路由组件实例
  const children = useOutlet();

  // 获取所有匹配的路由
  const matches = useMatches();

  // 获取扁平的路由菜单
  const flattenedRoutes = useFlattenedRoutes();

  const { push } = useRouter();

  useEffect(() => {
    // 获取当前匹配的路由
    // at(-1) 相当于 at(array.length - 1)
    const lastRoute = matches.at(-1);

    const currentRouteMeta = flattenedRoutes.find(
      (item) => item.key === lastRoute?.pathname || `${item.key}/` === lastRoute?.pathname,
    );

    if (currentRouteMeta) {
      if (!currentRouteMeta.hideMenu) {
        currentRouteMeta.outlet = children;
        setMatchRouteMeta(currentRouteMeta);
      }
    } else {
      push(HOMEPAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return matchRouteMeta;
}
