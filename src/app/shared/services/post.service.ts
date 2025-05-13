import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { StatusPost } from '@shared/constants/options';
import { Post, PostResponse } from '@shared/models/post';
import { User } from '@shared/models/user';

interface IPostPayLoad {
  title: string;
  description: string;
  content: string;
  status: StatusPost;
  tags?: string[] | [];
  cover?: string | 'cover';
}
export const getPublicPost = (page, size): Promise<PostResponse> => {
  return apiService.get([`${ENDPOINT.post.postList}/public`], { page, size });
};

export const getPostById = (id: string | number): Promise<Post> => {
  return apiService.get([`${ENDPOINT.post.postDetail(id)}`]);
};

export const createPost = (
  data: IPostPayLoad,
  token: string
): Promise<Post> => {
  console.log(`${ENDPOINT.post}`);
  return apiService.post([`${ENDPOINT.post.postCreate}`], data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
