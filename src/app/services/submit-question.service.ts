import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class SubmitQuestionService {
  mutation = gql`
    mutation submitQuestion($title: String!, $content: String!) {
      submitQuestion(title: $title, content: $content) {
        id
        title
        content
      }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  submitQuestion(title: string, content: string) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        title: title,
        content: content
      }
    });
  }
}
