import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../models/user.model';
import { fragments } from './fragments';

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

const MutationUpdateUser = gql`
  mutation update_user($user: UserInput!) {
    updateUserInfo(user: $user) {
      ...UserInfo
    }
  }
  ${fragments.user}
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

  updateUser(user: User) {
    return this.apollo.mutate({
      mutation: MutationUpdateUser,
      variables: {
        user: user
      }
    });
  }
}
