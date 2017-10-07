import gql from 'graphql-tag';

export const fragments = {
  user: gql`
    fragment UserInfo on UserType{
      id
      displayName
      avatarUrl
    }
  `
};
