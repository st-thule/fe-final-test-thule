import { Action } from 'redux';

import { User } from '@shared/models/user';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  VALIDATE_TOKEN,
  VALIDATE_TOKEN_FAILURE,
  VALIDATE_TOKEN_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from './type/authActionType';

export interface LoginAction extends Action<typeof LOGIN> {}

export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
  payload: User;
}

export interface LoginFailureAction extends Action<typeof LOGIN_FAILURE> {
  payload: string;
}

export interface RegisterAction extends Action<typeof REGISTER> {}

export interface RegisterSuccessAction extends Action<typeof REGISTER_SUCCESS> {
  payload: User;
}

export interface RegisterFailureAction extends Action<typeof REGISTER_FAILURE> {
  payload: string;
}

export interface LogoutAction extends Action<typeof LOGOUT> {}

export interface LogoutSuccessAction extends Action<typeof LOGOUT_SUCCESS> {}

export interface LogoutFailureAction extends Action<typeof LOGOUT_FAILURE> {
  payload: string;
}

export interface ValidateTokenAction extends Action<typeof VALIDATE_TOKEN> {}

export interface ValidateTokenSuccessAction
  extends Action<typeof VALIDATE_TOKEN_SUCCESS> {
  payload: User;
}

export interface ValidateTokenFailureAction
  extends Action<typeof VALIDATE_TOKEN_FAILURE> {
  payload: string;
}

export interface ChangePasswordAction extends Action<typeof CHANGE_PASSWORD> {}

export interface ChangePasswordSuccessAction
  extends Action<typeof CHANGE_PASSWORD_SUCCESS> {
  payload: string;
}

export interface ChangePasswordFailureAction
  extends Action<typeof CHANGE_PASSWORD_FAILURE> {
  payload: string;
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | ValidateTokenAction
  | ValidateTokenSuccessAction
  | ValidateTokenFailureAction
  | ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailureAction;

export const login = (): LoginAction => ({ type: LOGIN });
export const loginSuccess = (payload: User): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});
export const loginFailure = (payload: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload,
});

export const register = (): RegisterAction => ({ type: REGISTER });
export const registerSuccess = (payload: User): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload,
});
export const registerFailure = (payload: string): RegisterFailureAction => ({
  type: REGISTER_FAILURE,
  payload,
});

export const logout = (): LogoutAction => ({ type: LOGOUT });
export const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});
export const logoutFailure = (payload: string): LogoutFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const validateToken = (): ValidateTokenAction => ({
  type: VALIDATE_TOKEN,
});

export const validateTokenSuccess = (
  payload: User
): ValidateTokenSuccessAction => ({
  type: VALIDATE_TOKEN_SUCCESS,
  payload,
});

export const validateTokenFailure = (
  payload: string
): ValidateTokenFailureAction => ({
  type: VALIDATE_TOKEN_FAILURE,
  payload,
});

export const changePassword = (): ChangePasswordAction => ({
  type: CHANGE_PASSWORD,
});

export const changePasswordSuccess = (
  payload: string
): ChangePasswordSuccessAction => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const changePasswordFailure = (
  payload: string
): ChangePasswordFailureAction => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload,
});
