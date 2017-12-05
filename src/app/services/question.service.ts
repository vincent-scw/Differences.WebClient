import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from '../services/auth.service';
import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { fragments } from './fragments';

export interface QuestionQueryResponse {
  question: any;
  loading: any;
}

const MutationSubmitQuestion = gql`
  mutation differencesMutation($question: SubjectInput!) {
    submitQuestion(question: $question) {
      ...QuestionInfo
      user {
        ...UserInfo
      }
    }
  }
  ${fragments.user}
  ${fragments.question}
  `;

const MutationSubmitAnswer = gql`
  mutation differencesMutation($answer: ReplyInput!) {
    submitAnswer(answer: $answer) {
      id
      content
      createTime
      user {
        ...UserInfo
      }
    }
  }
  ${fragments.user}
  `;

const QueryQuestionDetail = gql`
  query question($id: Int!) {
    question(id: $id) {
      ...QuestionInfo
      user {
        ...UserInfo
      }
    }
  }
  ${fragments.user}
  ${fragments.question}
  `;

const QueryQuestions = gql`
  query questions($criteria:CriteriaInput!) {
    questions(criteria: $criteria){
      ...QuestionInfo
      user {
        ...UserInfo
      }
    }
    question_count(criteria: $criteria)
  }
  ${fragments.user}
  ${fragments.question}
  `;

const QueryQuestionAnswers = gql`
  query question_answers($questionId: Int!) {
    question_answers(questionId: $questionId) {
      id
      content
      user {
        ...UserInfo
      }
      createTime
      subReplies {
        id
        content
        user {
          ...UserInfo
        }
        createTime
      }
    }
  }
  ${fragments.user}
  `;

@Injectable()
export class QuestionService {
  constructor(private apollo: Apollo,
    private authService: AuthService) {
  }

  askQuestion(title: string, content: string, category: Category) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitQuestion,
      variables: {
        question: {
          title: title,
          content: content,
          categoryId: category.id
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitQuestion: {
          __typename: 'QuestionType',
          title: title,
          content: content,
          category: category.name,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.name,
            avatarUrl: null
          }
        }
      },
      update: (proxy, { data: { submitQuestion } }) => {
        // Read the data from our cache for this query.
        // const data = proxy.readQuery({ query: QueryQuestions, variables: {criteria: {
        //   categoryId: category.id,
        //   offset: 0,
        //   limit: 100
        // }} });
        // Add our comment from the mutation to the end.
        // data.comments.push(submitComment);
        // Write our data back to the cache.
        // proxy.writeQuery({ query: CommentAppQuery, data });
      }
    });
  }

  updateQuestion(id: number, title: string, content: string, category: Category) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitQuestion,
      variables: {
        question: {
          id: id,
          title: title,
          content: content,
          categoryId: category.id
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitQuestion: {
          __typename: 'QuestionType',
          id: id,
          title: title,
          content: content,
          category: category.name,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.name,
            avatarUrl: null
          }
        }
      }
    });
  }

  addAnswer(questionId: number, parentId: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitAnswer,
      variables: {
        answer: {
          subjectId: questionId,
          content: content,
          parentId: parentId
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitAnswer: {
          __typename: 'AnswerType',
          content: content,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.name,
            avatarUrl: null
          }
        }
      },
      updateQueries: {
        question_answers: (previousResult, { mutationResult }) => {
          return {
            question_answers: [mutationResult.data.submitAnswer, ...previousResult.question_answers]
          };
        }
      }
    });
  }

  updateAnswer(id: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitAnswer,
      variables: {
        answer: {
          id: id,
          content: content
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitAnswer: {
          __typename: 'AnswerType',
          id: id,
          content: content,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.name,
            avatarUrl: null
          }
        }
      }
    });
  }

  getQuestion(id: number) {
    return this.apollo.watchQuery<QuestionQueryResponse>({
      query: QueryQuestionDetail,
      variables: {
        id: id
      }
    });
  }

  getQuestions(categoryId: number, offset: number, limit: number) {
    return this.apollo.watchQuery({
      query: QueryQuestions,
      variables: {
         criteria: {
           categoryId: categoryId,
           offset: offset,
           limit: limit
       }
      }
     });
  }

  fetchMoreQuestions(questionsQuery: QueryRef<any>, categoryId: number, offset: number, limit: number) {
    return questionsQuery.fetchMore({
      variables: {
        criteria: {
          categoryId: categoryId,
          offset: offset,
          limit: limit
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, {
          questions: [...prev.questions, ...fetchMoreResult.questions]
        });
      }
    });
  }

  getQuestionAnswers(questionId: number) {
    return this.apollo.watchQuery({
      query: QueryQuestionAnswers,
      variables: {
        questionId: questionId
      }
    });
  }
}
