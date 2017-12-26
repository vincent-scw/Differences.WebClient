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

const MutationCheckUser = gql`
  mutation user {
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
    return this.apollo.watchQuery<User>({ query: QueryUser });
  }

  checkUserInDb() {
    return this.apollo.mutate({ mutation: MutationCheckUser });
  }
}
