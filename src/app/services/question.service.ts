import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Question } from '../models/question';
import { fragments } from './fragments';

export interface QuestionQueryResponse {
  question;
  loading;
}

@Injectable()
export class QuestionService {

  MutationSubmitQuestion = gql`
    mutation differencesMutation($question: SubjectInput!) {
      submitQuestion(question: $question) {
        id
        title
        content
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
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
  `;

  QueryQuestionAnswers = gql`
    query question($questionId: Int!) {
      question_answers(questionId: $questionId) {
        id
        content
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
  `;

  constructor(private apollo: Apollo) {
  }

  submitQuestion(title: string, content: string, categoryId: number) {
    return this.apollo.mutate({
      mutation: this.MutationSubmitQuestion,
      variables: {
        question: {
          title: title,
          content: content,
          categoryId: categoryId
        }
      }
    });
  }

  submitAnswer(questionId: number, parentId: number, content: string) {
    return this.apollo.mutate({
      mutation: this.MutationSubmitAnswer,
      variables: {
        answer: {
          subjectId: questionId,
          content: content,
          parentId: parentId
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
