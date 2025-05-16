import { Post } from './post';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
  picture?: string | null;
}

export interface UserWithPost extends User {
  Posts: Post[];
}
