import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { Post } from '@shared/models/post';
import { UserWithPost } from '@shared/models/user';

export const getUserInfo = (): Promise<UserWithPost> => {
  return apiService.get([`${ENDPOINT.users.userInfoWithPost}`]);
};

export const getPostByUser = (id: string | number): Promise<Post> => {
  return apiService.get([`${ENDPOINT.post.postList}`]);
};
