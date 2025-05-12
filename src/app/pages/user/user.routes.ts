import React from 'react';

import { AppRoutes } from '@app/core/constants/app-routes';
import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';

const User = React.lazy(() => import('./containers/User'));
const Profile = React.lazy(() => import('./containers/Profile'));

export const userRoutes: PageRoute[] = [
  {
    path: AppRoutes.USER,
    element: User,
    children: [
      {
        path: AppRoutes.PROFILE,
        element: Profile,
        isProtected: true,
      },
    ],
  },
];

export default userRoutes;
