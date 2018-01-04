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

export interface AnswerLiked {
  answerId: number;
  likeCount: number;
  liked: boolean;
}

export interface AnswerListResponse extends ResponseBase {
  question_answers: Answer[];
  answer_liked_byquestion: AnswerLiked[];
}

export interface AnswerLikedResponse extends ResponseBase {
  answer_liked_byanswer: AnswerLiked;
}
