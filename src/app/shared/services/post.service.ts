import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { Post, PostResponse } from '@shared/models/post';

export const getPublicPost = (page, size): Promise<PostResponse> => {
  return apiService.get([`${ENDPOINT.post.postList}/public`], { page, size });
};

export const getPostById = (id: string | number): Promise<Post> => {
  return apiService.get([`posts/${id}`]);
};
