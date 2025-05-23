import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@shared/models/user';
import { IUserPayload, UserService } from '@shared/services/user.service';

const userService = new UserService();

export const getPersonalInfoThunk = createAsyncThunk<
  User,
  { id: number | string },
  { rejectValue: string }
>('users/userInfo', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await userService.getPersonalInfo(id);
    const sortedPosts = response.Posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return {
      ...response,
      Posts: sortedPosts,
    };
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Login Failed';
    return rejectWithValue(message);
  }
});

export const updateInfoThunk = createAsyncThunk<
  User,
  IUserPayload,
  { rejectValue: string }
>('user/updateInfo', async (data, { rejectWithValue }) => {
  try {
    const updatedUser = await userService.updateProfile(data);
    return updatedUser;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Login Failed';
    return rejectWithValue(message);
  }
});
