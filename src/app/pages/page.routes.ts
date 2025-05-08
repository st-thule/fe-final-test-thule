import React from 'react';

import authRoutes from '@app/core/auth/auth.routes';
import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import homeRoutes from './homepage/home.routes';
import errorRoutes from './error/error.routes';
import { AppRoutes } from '@app/core/constants/app-routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    element: Page,
    children: [...homeRoutes, ...errorRoutes],
  },
];
export default pageRoutes;
