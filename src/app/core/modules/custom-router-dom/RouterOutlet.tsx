import React from 'react';

import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';

export const renderChildren = (routes) => {
  return routes.map((route) => {
    return {
      ...route,
      element: route.isProtected ? (
        <PrivateRoute component={route.element} />
      ) : route.isPublic ? (
        <AuthRoute component={route.element} />
      ) : (
        <route.element />
      ),
      children: route.children ? renderChildren(route.children) : [],
    };
  });
};
