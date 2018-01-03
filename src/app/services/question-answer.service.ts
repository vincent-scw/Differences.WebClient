import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from '../services/account/auth.service';
import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { Answer, AnswerListResponse } from '../models/answer.model';
import { fragments } from './fragments';

const MutationSubmitAnswer = gql`
mutation differencesMutation($answer: ReplyInput!) {
  submitAnswer(answer: $answer) {
    ...AnswerInfo
    user {
      ...UserInfo
    }
    subReplies {
      ...AnswerInfo
      user {
        ...UserInfo
      }
    }
  }
}
${fragments.user}
${fragments.answer}
`;

const QueryQuestionAnswers = gql`
query question_answers($questionId: Int!) {
  question_answers(questionId: $questionId) {
    ...AnswerInfo
    user {
      ...UserInfo
    }
    subReplies {
      ...AnswerInfo
      user {
        ...UserInfo
      }
    }
  }
  answer_liked(questionId: $questionId) {
    answerId
    likeCount
    liked
  }
}
${fragments.user}
${fragments.answer}
`;

const MutationLikeAnswer = gql`
mutation differencesMutation($likeRecord: LikeInput!) {
  likeAnswer(likeRecord: $likeRecord) {
    ...UserInfo
  }
}
${fragments.user}
`;

@Injectable()
export class QuestionAnswerService {
  constructor(private apollo: Apollo,
    private authService: AuthService) {
  }

  addAnswer(questionId: number, parentId: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitAnswer,
      variables: {
        answer: {
          subjectId: questionId,
          content: content,
          parentId: parentId
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitAnswer: {
          __typename: 'AnswerType',
          id: -1,
          parentId: parentId,
          content: content,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.displayName,
            // avatarUrl: user.avatarUrl
          },
          subReplies: []
        }
      },
      update: (proxy, { data: { submitAnswer } }) => {
        if (parentId != null) {
          const key = 'AnswerType_' + parentId.toString();
          const fm = gql`fragment answer on AnswerType {
            subReplies {
              id
              content
              createTime
            }
          }`;

          const found = proxy.readFragment<any>({ id: key, fragment: fm });
          if (found != null) {
            proxy.writeFragment({
              id: key, fragment: fm, data: {
                __typename: 'AnswerType',
                subReplies: [...found.subReplies, submitAnswer]
              }
            });
          }
        } else {
          const variables = { questionId: questionId };
          const data = proxy.readQuery<AnswerListResponse>({ query: QueryQuestionAnswers, variables: variables });
          data.question_answers.splice(0, 0, submitAnswer);
          proxy.writeQuery({ query: QueryQuestionAnswers, variables: variables, data });
        }
      }
    });
  }

  updateAnswer(id: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitAnswer,
      variables: {
        answer: {
          id: id,
          content: content
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitAnswer: {
          __typename: 'AnswerType',
          id: id,
          content: content,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.displayName,
            // avatarUrl: user.avatarUrl
          },
          subReplies: []
        }
      }
    });
  }

  getQuestionAnswers(questionId: number) {
    return this.apollo.watchQuery<AnswerListResponse>({
      query: QueryQuestionAnswers,
      variables: {
        questionId: questionId
      }
    });
  }

  likeAnswer(questionId: number, answerId: number) {
    return this.apollo.mutate({
      mutation: MutationLikeAnswer,
      variables: {
        likeRecord: {
          questionId: questionId,
          answerId: answerId
        }
      }
    });
  }
}
