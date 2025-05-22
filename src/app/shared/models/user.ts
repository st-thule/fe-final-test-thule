import { Post } from './post';
export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public dob: string,
    public phone: string,
    public displayName: string,
    public picture?: string | null,
    public Posts?: Post[]
  ) {}
}
