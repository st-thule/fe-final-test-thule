import { User } from './user';

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string[];
  userId: string;
  likes: number | 0;
  comments: number | 0;
  cover: string;
  recommend: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface PostResponse {
  data: Post[];
  totalPage: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  loadMore: true;
}
