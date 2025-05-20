import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserWithPost } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

const userService = new UserService();

export const getPersonalInfoThunk = createAsyncThunk<
  UserWithPost,
  { id: number | string },
  { rejectValue: string }
>('users/userInfo', async ({ id }, { rejectWithValue }) => {
  try {
    const response = userService.getPersonalInfo(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch user info');
  }
});
