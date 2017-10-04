import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class SubmitQuestionService {
  mutation = gql`
    mutation differencesMutation($question: QuestionInput!) {
      submitQuestion(question: $question) {
        id
        title
        content
      }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  submitQuestion(title: string, content: string, categoryId: number) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        question: {
          title: title,
          content: content,
          categoryId: categoryId
        }
      }
    });
  }
}
