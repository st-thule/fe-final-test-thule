import { createAsyncThunk } from '@reduxjs/toolkit';

import { ImageService } from '@shared/services/image.service';

const imageService = new ImageService();

export const uploadImageThunk = createAsyncThunk<
  string,
  { file: File; typeUpload: string },
  { rejectValue: string }
>('image/uploadImage', async ({ file, typeUpload }, { rejectWithValue }) => {
  try {
    const { signedRequest, url } = await imageService.getSignedUrl(
      typeUpload,
      file.name,
      file.type
    );

    await imageService.uploadImageToS3(signedRequest, file);

    return url;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to upload image');
  }
});
