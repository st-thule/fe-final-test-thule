import { apiService } from '@app/core/services/api.service';
import { PostResponse } from '@shared/models/post';

export const getPublicPost = (page, size): Promise<PostResponse> => {
  return apiService.get(['/posts/public'], { page, size });
};
