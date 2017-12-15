import { User } from './user.model';
import { ResponseBase } from './response-base.model';

export interface Question {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  categoryName: string;
  createTime: Date;
  user: User;
  subReplies?: Question[];
}

export interface QuestionResponse extends ResponseBase {
  question: Question;
}

export interface QuestionListResponse extends ResponseBase {
  questions: Question[];
  question_count: number;
}
