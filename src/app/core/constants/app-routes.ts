export enum AppRoutes {
  HOME = '/',

  AUTH = '/auth',
  REGISTER = 'register',
  LOGIN = 'login',

  POSTS = '/posts',
  POSTSDETAIL = ':id',
  POSTADD = 'create',
  POSTEDIT = 'edit/:id',
  POSTAGS = 'tags/:tag',

  USER = '/user',
  PROFILE = 'me',
  USER_WALL = ':id',
  USER_EDIT = 'edit',
}
