import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from '../services/auth.service';
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
      id
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
      id
      content
      user {
        ...UserInfo
      }
      createTime
    }
  }
}
${fragments.user}
${fragments.answer}
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
        const variables = { questionId: questionId };
        const data = proxy.readQuery<AnswerListResponse>({ query: QueryQuestionAnswers, variables: variables });
        data.question_answers.splice(0, 0, submitAnswer);
        proxy.writeQuery({ query: QueryQuestionAnswers, variables: variables, data });
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
          }
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
}
