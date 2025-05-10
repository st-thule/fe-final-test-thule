import React from 'react';

import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import errorRoutes from './error/error.routes';
import { AppRoutes } from '@app/core/constants/app-routes';
import homeRoutes from './homepage/home.routes';
import postRoutes from './posts/post.routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    element: Page,
    children: [...homeRoutes, ...postRoutes, ...errorRoutes],
  },
];
export default pageRoutes;
