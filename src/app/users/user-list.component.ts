import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const UserQuery = gql`
  query user {
    mvp_users {
      id
      nickName
    }
  }
  `;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  data: ApolloQueryObservable<any>;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.data = this.apollo.watchQuery({ query: UserQuery });
  }
}
