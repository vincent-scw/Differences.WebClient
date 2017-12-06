import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from '../services/auth.service';
import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { fragments } from './fragments';

const MutationSubmitAnswer = gql`
mutation differencesMutation($answer: ReplyInput!) {
  submitAnswer(answer: $answer) {
    id
    content
    createTime
    user {
      ...UserInfo
    }
  }
}
${fragments.user}
`;

const QueryQuestionAnswers = gql`
query question_answers($questionId: Int!) {
  question_answers(questionId: $questionId) {
    id
    content
    user {
      ...UserInfo
    }
    createTime
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
          content: content,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.name,
            avatarUrl: null
          }
        }
      },
      updateQueries: {
        question_answers: (previousResult, { mutationResult }) => {
          return {
            question_answers: [mutationResult.data.submitAnswer, ...previousResult.question_answers]
          };
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
            displayName: user.name,
            avatarUrl: null
          }
        }
      }
    });
  }

  getQuestionAnswers(questionId: number) {
    return this.apollo.watchQuery<any>({
      query: QueryQuestionAnswers,
      variables: {
        questionId: questionId
      }
    });
  }
}
