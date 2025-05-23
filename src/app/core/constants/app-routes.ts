export enum AppRoutes {
  // home
  HOME = '/',

  // auth
  AUTH = '/auth',
  REGISTER = 'register',
  LOGIN = 'login',

  // posts
  POSTS = '/posts',
  POSTSDETAIL = ':id',
  POSTADD = 'create',
  POSTEDIT = 'edit/:id',
  POSTAGS = 'tags/:tag',

  // user
  USER = '/user',
  PROFILE = 'me',
  USER_WALL = ':id',
  USER_EDIT = 'edit',
}
