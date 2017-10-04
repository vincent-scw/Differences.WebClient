import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../models/user';

const QueryUser = gql`
  query user {
    topUsers {
      id
      displayName
    }
  }
`;

@Injectable()
export class UserService {
  constructor(private apollo: Apollo) {
  }

  getUsers(categoryId: number, count: number) {
    return this.apollo.watchQuery({ query: QueryUser });
  }
}
