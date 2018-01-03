import gql from 'graphql-tag';

export const fragments = {
  user: gql`
    fragment UserInfo on UserType {
      id
      displayName
      email
      contributeValue
      reputationValue
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
      answerCount
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
