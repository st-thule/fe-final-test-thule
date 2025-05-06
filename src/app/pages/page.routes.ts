import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Page } from './Page';

const pageRoutes: RouteObject[] = [
  {
    path: '',
    element: React.createElement(Page),
  },
];
export default pageRoutes;
