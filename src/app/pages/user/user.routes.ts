import React from 'react';

import { AppRoutes } from '@app/core/constants/app-routes';
import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';

const User = React.lazy(() => import('./containers/User'));
const Profile = React.lazy(() => import('./containers/Profile'));

export const userRoutes: PageRoute[] = [
  {
    path: AppRoutes.USER, //users
    element: User,
    children: [
      {
        path: AppRoutes.PROFILE, //me
        element: Profile,
        isProtected: true,
      },
      {
        path: AppRoutes.USER_WALL, //:id
        element: Profile,
      },
    ],
  },
];

export default userRoutes;
