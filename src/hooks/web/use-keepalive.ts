import { useCallback, useEffect, useState } from 'react';

import { useMatchRouteMeta } from '@/router/hooks/use-match-route-meta';
import { useRouter } from '@/router/hooks/use-router';
import { RouteMeta } from '@/types/router';

export type KeepAliveTab = RouteMeta & {
  children: any;
};

export default function useKeepAlive() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const { push } = useRouter();

  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  // active tab
  const [activeTabRoutePath, steActivePathRoutePath] = useState<string>('');

  // current route meta
  const currentRouteMeta = useMatchRouteMeta();

  /**
   * close specified tab
   */
  const closeTabs = useCallback(
    (path = activeTabRoutePath) => {
      if (tabs.length === 1) return;
      const deleteTabIndex = tabs.findIndex((item) => item.key === path);

      tabs.splice(deleteTabIndex, 1);

      if (path === activeTabRoutePath) {
        if (deleteTabIndex === 0) {
          push(tabs[0].key);
        } else {
          push(tabs[deleteTabIndex - 1].key);
        }
      }

      setTabs([...tabs]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTabRoutePath],
  );

  /**
   * close other tabs besides specified tab
   */
  const closeOtherTabs = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((pervTab) => pervTab.filter((item) => item.key === path));
      push(path);
    },
    [activeTabRoutePath, push],
  );

  /**
   * close all tabs then navigate to the home page
   */
  const closeAllTabs = useCallback(() => {
    if (activeTabRoutePath === HOMEPAGE) return;

    setTabs([]);
    push(HOMEPAGE);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push, activeTabRoutePath]);

  /**
   * close all tabs in the left of specified tab
   */
  const closeLeftTabs = useCallback(
    (path = activeTabRoutePath) => {
      const currentIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(currentIndex);
      setTabs(newTabs);

      push(path);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push, tabs],
  );

  /**
   * close all tab in the right of specified tab
   */
  const closeRightTabs = useCallback(
    (path = activeTabRoutePath) => {
      const currentIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(0, currentIndex + 1);
      setTabs(newTabs);
      push(path);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push, tabs],
  );

  /**
   * refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((pervTab) => {
        const index = pervTab.findIndex((item) => item.key === path);

        if (index >= 0) {
          pervTab[index].timeStamp = getKey();
        }
        return [...pervTab];
      });
    },
    [activeTabRoutePath],
  );

  useEffect(() => {
    if (!currentRouteMeta) return;

    const exited = tabs.find((item) => item.key === currentRouteMeta.key);
    if (!exited) {
      setTabs((pervTab) => [
        ...pervTab,
        { ...currentRouteMeta, children: currentRouteMeta.outlet, timeStamp: getKey() },
      ]);
    }

    steActivePathRoutePath(currentRouteMeta.key);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteMeta]);

  return {
    tabs,
    activeTabRoutePath,
    setTabs,
    closeTabs,
    closeOtherTabs,
    closeAllTabs,
    closeLeftTabs,
    closeRightTabs,
    refreshTab,
  };
}

function getKey() {
  return new Date().getTime().toString();
}
