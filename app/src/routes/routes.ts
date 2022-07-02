import React from 'react';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Admin/Dashboard';
import { NotFound } from '../pages/NotFound';
export const BASE_ROUTE_ADMIN_URL = '/admin';
export const BASE_ROUTE_URL = '/';
export type SubRoutes = {
  [key: string]: {
    url: string;
    component: React.FC<any>;
  };
};

interface Route {
  url: string;
  component: React.FC<any>;
  name?: string;
  Icon?: any;
  shortName?: string;
  exact?: boolean;
}

interface Routes {
  [route: string]: Route;
}

const routes: Routes = {
  dashboard: {
    url: BASE_ROUTE_ADMIN_URL,
    component: Dashboard,
    name: 'Dashboard',
    exact: true,
  },
  home: {
    url: BASE_ROUTE_URL,
    component: Home,
    name: 'Home',
    exact: true,
  },
  notFound: {
    url: '*',
    component: NotFound,
    name: 'Not Found',
  },
};

export default routes;
