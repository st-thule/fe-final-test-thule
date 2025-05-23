import { createAsyncThunk } from '@reduxjs/toolkit';

import { authStorage } from '@app/core/services/auth-storage.service';
import {
  AuthService,
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
} from '@app/core/services/auth.service';
import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

const authService = new AuthService();
const userService = new UserService();

export const loginThunk = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (loginPayload, { rejectWithValue }) => {
  try {
    const response = await authService.loginAccount(loginPayload);
    authStorage.setToken(response.accessToken);
    return response.userInfo;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Login Failed';
    return rejectWithValue(message);
  }
});

export const registerThunk = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (registerPayload, { rejectWithValue }) => {
  try {
    await authService.registerAccount(registerPayload);
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Register Failed';
    return rejectWithValue(message);
  }
});

export const logoutThunk = createAsyncThunk<{ rejectValue: string }>(
  'auth/logout',
  async (__, { rejectWithValue }) => {
    try {
      await authService.logoutAccount();
      authStorage.removeToken();
    } catch (error) {
      return rejectWithValue(error.message || 'Register Failed');
    }
  }
);

export const validateAuthTokenThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/validateToken', async (__, { rejectWithValue }) => {
  try {
    const response = await userService.getPersonalInfo('me');
    const { Posts, ...rest } = response;
    return rest;
  } catch (error) {
    return rejectWithValue(error.message || 'Register Failed');
  }
});

export const changePasswordThunk = createAsyncThunk<
  string,
  ChangePasswordPayload,
  { rejectValue: string }
>('auth/changePassword', async (changePasswordPayload, { rejectWithValue }) => {
  try {
    await authService.changePassword(changePasswordPayload);
  } catch (error) {
    const message = error.response?.data?.errors?.[0] || 'Invalid password';
    return rejectWithValue(message);
  }
});
