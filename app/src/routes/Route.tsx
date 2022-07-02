import { Layout } from '../pages/_layouts/default';
import React from 'react';

interface RouteWrapperProps {
  component?: React.ElementType;
  routes?: any;
}

export const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  routes = null,
  children,
  ...rest
}) => {
  return <Layout>{Component && <Component />}</Layout>;
};
