import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../models/user.model';

const QueryUser = gql`
  query user {
    topUsers {
      id
      displayName
    }
  }
`;

const QueryCheckUser = gql`
  query user {
    checkUserInDb {
      id
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

  checkUserInDb() {
    return this.apollo.watchQuery({ query: QueryCheckUser });
  }
}
