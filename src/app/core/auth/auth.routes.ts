import React from 'react';

import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import { AppRoutes } from '../constants/app-routes';

const Auth = React.lazy(() => import('./Auth'));
const Login = React.lazy(() => import('./containers/Login'));
const Register = React.lazy(() => import('./containers/Register'));

const authRoutes: PageRoute[] = [
  {
    path: AppRoutes.AUTH,
    element: Auth,
    isPublic: true,
    children: [
      {
        path: '',
        redirect: AppRoutes.LOGIN,
      },

      {
        path: AppRoutes.LOGIN,
        element: Login,
      },

      {
        path: AppRoutes.REGISTER,
        element: Register,
      },
    ],
  },
];

export default authRoutes;
