import React from 'react';

import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import { AppRoutes } from '@app/core/constants/app-routes';

const Home = React.lazy(() => import('./containers/Home'));

const homeRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    element: Home,
  },
];

export default homeRoutes;
