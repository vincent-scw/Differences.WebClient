import { User } from './user.model';
import { ResponseBase } from './response-base.model';

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  createTime: Date;
  user: User;
}

export interface ArticleResponse extends ResponseBase {
  article: Article;
}

export interface ArticleListResponse extends ResponseBase {
  articles: Article[];
  article_count: number;
}
