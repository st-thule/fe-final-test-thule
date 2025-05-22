import { createSlice } from '@reduxjs/toolkit';

import { updateInfoThunk } from '@app/store/user/thunk/userThunk';
import { User } from '@shared/models/user';
import {
  changePasswordThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  validateAuthTokenThunk,
} from '../thunk/authThunk';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        (state.loading = false), state.user;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });

    builder
      .addCase(validateAuthTokenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateAuthTokenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(validateAuthTokenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });

    builder
      .addCase(updateInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update post';
      });
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export default authReducer.reducer;
