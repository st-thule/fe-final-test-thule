import { createAsyncThunk } from '@reduxjs/toolkit';

import { authStorage } from '@app/core/services/auth-storage.service';
import {
  AuthService,
  LoginPayload,
  RegisterPayload,
} from '@app/core/services/auth.service';
import { User, UserWithPost } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';
import Posts from '@app/pages/posts/containers/Posts';

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
    return rejectWithValue(error.message || 'Login Failed');
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
    return rejectWithValue(error.message || 'Register Failed');
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
