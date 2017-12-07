import { User } from './user.model';
import { ResponseBase } from './response-base.model';

export interface Answer {
  id: number;
  content: string;
  parentId?: number;
  createTime: Date;
  user: User;
  subReplies?: Answer[];
}

export interface AnswerListResponse extends ResponseBase {
  question_answers: Answer[];
}
