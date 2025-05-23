import { User } from './user';

export class Post {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public content: string,
    public status: string,
    public tags: string[],
    public userId: string,
    public likes: number | 0,
    public comments: number | 0,
    public cover: string,
    public recommend: boolean,
    public deletedAt: string | null,
    public createdAt: string,
    public updatedAt: string,
    public user: User
  ) {}
}

export interface PostResponse {
  data: Post[];
  totalPage: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  loadMore: true;
}
