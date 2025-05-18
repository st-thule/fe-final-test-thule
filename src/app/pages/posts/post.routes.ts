import React from 'react';

import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import { AppRoutes } from '@app/core/constants/app-routes';

const PostDetail = React.lazy(() => import('./containers/PostDetail'));
const Post = React.lazy(() => import('./containers/Posts'));
const PostForm = React.lazy(() => import('./containers/PostForm'));
const PostsByTag = React.lazy(() => import('./containers/PostsByTag'));

const postRoutes: PageRoute[] = [
  {
    path: AppRoutes.POSTS,
    element: Post,
    children: [
      {
        path: AppRoutes.POSTSDETAIL,
        element: PostDetail,
      },
      {
        path: AppRoutes.POSTADD,
        element: PostForm,
        isProtected: true,
      },
      {
        path: AppRoutes.POSTEDIT,
        element: PostForm,
        isProtected: true,
      },
      {
        path: AppRoutes.POSTAGS,
        element: PostsByTag,
      },
    ],
  },
];

export default postRoutes;
