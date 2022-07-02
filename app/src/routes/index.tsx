import React from 'react';
import { BrowserRouter, Route, Routes as RoutesDom } from 'react-router-dom';
import { RouteWrapper } from './Route';
import routes from './routes';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesDom>
        {Object.entries(routes).map(([route, { url, component }]) => {
          return (
            <Route
              key={url}
              path={url}
              element={<RouteWrapper component={component} />}
            />
          );
        })}
      </RoutesDom>
    </BrowserRouter>
  );
};
