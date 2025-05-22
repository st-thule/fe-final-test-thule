import { createSlice } from '@reduxjs/toolkit';

import { User } from '@shared/models/user';
import { getPersonalInfoThunk } from '../thunk/userThunk';

interface UserState {
  personalInfo: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  personalInfo: null,
  loading: false,
  error: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPersonalInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload;
      })
      .addCase(getPersonalInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });
  },
});
export default userReducer.reducer;
