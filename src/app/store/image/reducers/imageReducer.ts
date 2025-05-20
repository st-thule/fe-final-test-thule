import { createSlice } from '@reduxjs/toolkit';

import { uploadImageThunk } from '../thunk/imageThunk';

interface UploadImageState {
  uploading: boolean;
  imageUrl: string | null;
  error: string | null;
}
const initialState: UploadImageState = {
  uploading: false,
  imageUrl: null,
  error: null,
};

const imageSlice = createSlice({
  name: 'uploadImage',
  initialState,
  reducers: {
    resetImageUploadState: (state) => {
      state.uploading = false;
      state.imageUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageThunk.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImageThunk.fulfilled, (state, action) => {
        state.uploading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImageThunk.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload || 'Upload image failed';
      });
  },
});

export const { resetImageUploadState } = imageSlice.actions;

export default imageSlice;
