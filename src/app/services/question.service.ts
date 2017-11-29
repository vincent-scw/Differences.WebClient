import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from '../services/auth.service';
import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { fragments } from './fragments';

export interface QuestionQueryResponse {
  question: any;
  loading: any;
}

@Injectable()
export class QuestionService {

  MutationSubmitQuestion = gql`
    mutation differencesMutation($question: SubjectInput!) {
      submitQuestion(question: $question) {
        id
        title
        content
        category
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
    `;

  MutationSubmitAnswer = gql`
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

  QueryQuestionDetail = gql`
    query question($id: Int!) {
      question(id: $id) {
        id
        title
        content
        category
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
    `;

  QueryQuestions = gql`
    query questions($criteria:CriteriaInput!) {
      questions(criteria: $criteria){
        id
        title
        content
        category
        user {
          ...UserInfo
        }
        createTime
      }
      question_count(criteria: $criteria)
    }
    ${fragments.user}
  `;

  QueryQuestionAnswers = gql`
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

  constructor(private apollo: Apollo,
    private authService: AuthService) {
  }

  askQuestion(title: string, content: string, category: Category) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: this.MutationSubmitQuestion,
      variables: {
        question: {
          title: title,
          content: content,
          categoryId: category.id
        }
      },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   submitQuestion: {
      //     __typename: 'QuestionType',
      //     title: title,
      //     content: content,
      //     category: category.name,
      //     createTime: +new Date,
      //     user: {
      //       __typename: 'UserType',
      //       id: user.id,
      //       displayName: user.name,
      //       avatarUrl: null
      //     }
      //   }
      // },
      // updateQueries: {
      //   questions: (previousResult, { mutationResult }) => {
      //     return {
      //       questions: [mutationResult.data.submitQuestion, ...previousResult.questions]
      //     };
      //   }
      // }
    });
  }

  updateQuestion(id: number, title: string, content: string, category: Category) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: this.MutationSubmitQuestion,
      variables: {
        question: {
          id: id,
          title: title,
          content: content,
          categoryId: category.id
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitQuestion: {
          __typename: 'QuestionType',
          id: id,
          title: title,
          content: content,
          category: category.name,
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

  addAnswer(questionId: number, parentId: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: this.MutationSubmitAnswer,
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
      mutation: this.MutationSubmitAnswer,
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

  getQuestion(id: number) {
    return this.apollo.watchQuery<QuestionQueryResponse>({
      query: this.QueryQuestionDetail,
      variables: {
        id: id
      }
    });
  }

  getQuestions(categoryId: number, offset: number, limit: number) {
    return this.apollo.watchQuery({
      query: this.QueryQuestions,
      variables: {
         criteria: {
           categoryId: categoryId,
           offset: offset,
           limit: limit
       }
      }
     });
  }

  getQuestionAnswers(questionId: number) {
    return this.apollo.watchQuery({
      query: this.QueryQuestionAnswers,
      variables: {
        questionId: questionId
      }
    });
  }
}
