import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  key: string; // antd menu selectedKeys
  label: string; // menu label i18n
  icon?: ReactNode;
  suffix?: ReactNode; // menu suffix icon
  hideMenu?: boolean; // whether hide in menu
  hideTab?: boolean; // whether hide in multi tab
  disabled?: boolean; // whether disable in menu
  outlet?: any; // react router outlet
  timeStamp?: string; // use to refresh tab
  frameSrc?: string; // external link and iframe need
}

export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;
