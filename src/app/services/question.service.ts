import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Question } from '../models/question';

const MutationSubmitQuestion = gql`
  mutation differencesMutation($question: QuestionInput!) {
    submitQuestion(question: $question) {
      id
      title
      content
    }
  }
`;

const QueryQuestionDetail = gql`
  query question($id: Int!) {
    question(id: $id) {
      id
      title
      content
    }
  }
`;

const QueryQuestions = gql`
  query questions($criteria:CriteriaInput!) {
    questions(criteria: $criteria){
      id
      title
      content
    }
  }
`;

export interface QuestionQueryResponse {
  question;
  loading;
}

@Injectable()
export class QuestionService {

  constructor(private apollo: Apollo) {
  }

  submitQuestion(title: string, content: string, categoryId: number) {
    return this.apollo.mutate({
      mutation: MutationSubmitQuestion,
      variables: {
        question: {
          title: title,
          content: content,
          categoryId: categoryId
        }
      }
    });
  }

  getQuestion(id: number) {
    return this.apollo.watchQuery<QuestionQueryResponse>({
      query: QueryQuestionDetail,
      variables: {
        id: id
      }
    });
  }

  getQuestions(categoryId: number, offset: number, limit: number) {
    return this.apollo.watchQuery({
      query: QueryQuestions,
      variables: {
         criteria: {
           categoryId: categoryId,
           offset: offset,
           limit: limit
       }
      }
     });
  }
}
