import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { StatusPost } from '@shared/constants/options';
import { Post, PostResponse } from '@shared/models/post';

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

export const createPost = (data: IPostPayLoad): Promise<Post> => {
  return apiService.post([`${ENDPOINT.post.postCreate}`], data);
};

export const getPostDetailUpdate = (id: string): Promise<Post> => {
  return apiService.get([`${ENDPOINT.post.postDetail(id)}`]);
};

export const updatePost = (id: string, data: IPostPayLoad): Promise<Post> => {
  return apiService.put([`${ENDPOINT.post.postEdit(id)}`], data);
};
