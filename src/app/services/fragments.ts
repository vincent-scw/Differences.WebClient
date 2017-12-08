import gql from 'graphql-tag';

export const fragments = {
  user: gql`
    fragment UserInfo on UserType {
      id
      displayName
    }
  `,

  question: gql`
    fragment QuestionInfo on QuestionType {
      id
      title
      content
      categoryId
      categoryName
      createTime
    }
  `,

  answer: gql`
    fragment AnswerInfo on AnswerType {
      id
      content
      createTime
    }
  `
};
