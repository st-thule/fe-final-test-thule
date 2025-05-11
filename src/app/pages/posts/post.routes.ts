import React from 'react';

import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import { AppRoutes } from '@app/core/constants/app-routes';

const PostDetail = React.lazy(() => import('./containers/PostDetail'));
const Post = React.lazy(() => import('./containers/Posts'));

const postRoutes: PageRoute[] = [
  {
    path: AppRoutes.POSTS,
    element: Post,
    children: [
      {
        path: AppRoutes.POSTSDETAIL,
        element: PostDetail,
      },
    ],
  },
];

export default postRoutes;
