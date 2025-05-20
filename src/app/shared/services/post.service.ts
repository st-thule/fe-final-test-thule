import { ApiService } from '@app/core/services/api.service';
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

export class PostService {
  apiService = new ApiService();

  getPublicPost = (page, size): Promise<PostResponse> => {
    return this.apiService.get([`${ENDPOINT.post.postList}/public`], {
      page,
      size,
    });
  };

  getPostById = (id: string | number): Promise<Post> => {
    return this.apiService.get([`${ENDPOINT.post.postDetail(id)}`]);
  };

  createPost = (data: IPostPayLoad): Promise<Post> => {
    return this.apiService.post([`${ENDPOINT.post.postCreate}`], data);
  };

  getPostDetailUpdate = (id: string | number): Promise<Post> => {
    return this.apiService.get([`${ENDPOINT.post.postDetail(id)}`]);
  };

  updatePost = (id: string | number, data: IPostPayLoad): Promise<Post> => {
    return this.apiService.put([`${ENDPOINT.post.postEdit(id)}`], data);
  };

  deletePost = (id: string | number) => {
    return this.apiService.delete([`${ENDPOINT.post.postDelete(id)}`]);
  };

  getPostsByTag = (tagName: string, page, size): Promise<PostResponse> => {
    return this.apiService.get([`${ENDPOINT.post.postByTag(tagName)}`], {
      page,
      size,
    });
  };
}
