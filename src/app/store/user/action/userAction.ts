import { Action } from 'redux';

import {
  FETCH_USER_INFO,
  FETCH_USER_INFO_FAILURE,
  FETCH_USER_INFO_SUCCESS,
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

export type UserActions =
  | FetchUserInfoAction
  | FetchUserInfoSuccessAction
  | FetchUserInfoAction;

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

