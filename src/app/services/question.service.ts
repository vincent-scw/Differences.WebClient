import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const MutationSubmitQuestion = gql`
  mutation differencesMutation($question: QuestionInput!) {
    submitQuestion(question: $question) {
      id
      title
      content
    }
  }
`;

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
}
