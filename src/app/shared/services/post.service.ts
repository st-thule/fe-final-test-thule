import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { PostResponse } from '@shared/models/post';

export const getPublicPost = (page, size): Promise<PostResponse> => {
  return apiService.get([`${ENDPOINT.post.postList}/public`], { page, size });
};
