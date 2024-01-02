import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import CircleLoading from '@/layouts/components/CircleLoading';
import { AppRouteObject } from '@/types/router';

const HomePage = lazy(() => import('@/pages/Dashboard/Workbench'));
const Analysis = lazy(() => import('@/pages/Dashboard/Analysis'));

const dashboard: AppRouteObject = {
  order: 1,
  path: 'dashboard',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    key: '/dashboard',
    label: 'sys.menu.dashboard',
    icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
  },
  children: [
    {
      index: true,
      element: <Navigate to="workbench" replace />,
    },
    {
      path: 'workbench',
      element: <HomePage />,
      meta: { label: 'sys.menu.workbench', key: '/dashboard/workbench' },
    },
    {
      path: 'Analysis',
      element: <Analysis />,
      meta: { label: 'sys.menu.analysis', key: '/dashboard/analysis' },
    },
  ],
};

export default dashboard;
