import { Action } from 'redux';
import {
  CREATE_POST,
  CREATE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
} from './type/postActionTypes';

import { Post, PostResponse } from '@shared/models/post';

export interface FetchPostsAction extends Action<typeof FETCH_POSTS> {}
export interface FetchPostsSuccessAction
  extends Action<typeof FETCH_POSTS_SUCCESS> {
  payload: PostResponse;
}
export interface FetchPostsFailureAction
  extends Action<typeof FETCH_POSTS_FAILURE> {
  payload: string;
}

export interface CreatePostAction extends Action<typeof CREATE_POST> {}
export interface CreatePostSuccessAction
  extends Action<typeof CREATE_POST_SUCCESS> {
  payload: Post;
}
export interface CreatePostFailureAction
  extends Action<typeof CREATE_POST_FAILURE> {
  payload: string;
}

export interface DeletePostSuccessAction
  extends Action<typeof DELETE_POST_SUCCESS> {
  payload: number | string;
}

export interface UpdatePostSuccessAction
  extends Action<typeof UPDATE_POST_SUCCESS> {
  payload: Post;
}

export type PostActions =
  | FetchPostsAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | CreatePostAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | DeletePostSuccessAction
  | UpdatePostSuccessAction;

// Action creators
export const fetchPosts = (): FetchPostsAction => ({ type: FETCH_POSTS });
export const fetchPostsSuccess = (
  payload: PostResponse
): FetchPostsSuccessAction => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});
export const fetchPostsFailure = (
  payload: string
): FetchPostsFailureAction => ({
  type: FETCH_POSTS_FAILURE,
  payload,
});

export const createPost = (): CreatePostAction => ({ type: CREATE_POST });
export const createPostSuccess = (payload: Post): CreatePostSuccessAction => ({
  type: CREATE_POST_SUCCESS,
  payload,
});
export const createPostFailure = (
  payload: string
): CreatePostFailureAction => ({
  type: CREATE_POST_FAILURE,
  payload,
});

export const deletePostSuccess = (
  payload: string | number
): DeletePostSuccessAction => ({
  type: DELETE_POST_SUCCESS,
  payload,
});

export const updatePostSuccess = (payload: Post): UpdatePostSuccessAction => ({
  type: UPDATE_POST_SUCCESS,
  payload,
});
