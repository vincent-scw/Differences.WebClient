import { User } from './user.model';

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  createTime: Date;
  user: User;
}
