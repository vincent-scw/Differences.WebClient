import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

const QuestionsQuery = gql`
  query questions($criteria:CriteriaInput!) {
    questions(criteria: $criteria){
      id
      title
      content
    }
  }
`;

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent implements OnInit {
  data: ApolloQueryObservable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.data = this.apollo.watchQuery({
       query: QuestionsQuery,
       variables: {
          criteria: {
            categoryId: 1,
            offset: 0,
            limit: 100
        }
       }
      });
  }
}
