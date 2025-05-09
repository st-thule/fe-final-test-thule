import React from 'react';

import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';

const PostDetail = React.lazy(() => import('./containers/PostDetail'));
const Post = React.lazy(() => import('./containers/Posts'));

const postRoutes: PageRoute[] = [
  {
    path: 'posts',
    element: Post,
    children: [
      {
        path: ':id',
        element: PostDetail,
      },
    ],
  },
];

export default postRoutes;
