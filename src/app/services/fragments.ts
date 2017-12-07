import gql from 'graphql-tag';

export const fragments = {
  user: gql`
    fragment UserInfo on UserType {
      id
      displayName
    }
  `,

  article: gql`
    fragment ArticleInfo on ArticleType {
      id
      title
      content
      category
      createTime
    }
  `,

  question: gql`
    fragment QuestionInfo on QuestionType {
      id
      title
      content
      category
      createTime
    }
  `,
};
