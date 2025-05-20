import { Action } from 'redux';

import {
  FETCH_USER_INFO,
  FETCH_USER_INFO_FAILURE,
  FETCH_USER_INFO_SUCCESS,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_SUCCESS,
} from './type/userActionTypes';
import { User } from '@shared/models/user';

export interface FetchUserInfoAction extends Action<typeof FETCH_USER_INFO> {
  payload: number | string;
}
export interface FetchUserInfoSuccessAction
  extends Action<typeof FETCH_USER_INFO_SUCCESS> {
  payload: User;
}
export interface FetchUserInfoFailureAction
  extends Action<typeof FETCH_USER_INFO_FAILURE> {
  payload: string;
}

export interface UpdateUserInfoAction extends Action<typeof UPDATE_USER_INFO> {
  payload: User;
}

export interface UpdateUserInfoSuccessAction
  extends Action<typeof UPDATE_USER_INFO_SUCCESS> {
  payload: User;
}

export interface UpdateUserInfoFailureAction
  extends Action<typeof UPDATE_USER_INFO_FAILURE> {
  payload: string;
}

export type UserActions =
  | FetchUserInfoAction
  | FetchUserInfoSuccessAction
  | FetchUserInfoAction
  | UpdateUserInfoAction
  | UpdateUserInfoSuccessAction
  | UpdateUserInfoFailureAction;

export const fetchUserInfo = (
  payload: number | string
): FetchUserInfoAction => ({
  type: FETCH_USER_INFO,
  payload,
});

export const fetchUserInfoSuccess = (
  payload: User
): FetchUserInfoSuccessAction => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload,
});

export const fetchUserInfoFailure = (
  payload: string
): FetchUserInfoFailureAction => ({
  type: FETCH_USER_INFO_FAILURE,
  payload,
});

export const updateUserInfo = (payload: User): UpdateUserInfoAction => ({
  type: UPDATE_USER_INFO,
  payload,
});

export const updateUserInfoSuccess = (
  payload: User
): UpdateUserInfoSuccessAction => ({
  type: UPDATE_USER_INFO_SUCCESS,
  payload,
});

export const updateUserInfoFailure = (
  payload: string
): UpdateUserInfoFailureAction => ({
  type: UPDATE_USER_INFO_FAILURE,
  payload,
});
