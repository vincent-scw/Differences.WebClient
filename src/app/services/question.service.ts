import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from './auth.service';
import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { fragments } from './fragments';
import { ApolloServiceBase } from './apollo-service-base';
import { IntermediaryService } from './intermediary.service';

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

@Injectable()
export class QuestionService extends ApolloServiceBase {
  constructor(private apollo: Apollo,
    private authService: AuthService,
    private intermediaryService: IntermediaryService) {
      super();
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
            displayName: user.displayName,
            avatarUrl: user.avatarUrl
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
            displayName: user.displayName,
            avatarUrl: user.avatarUrl
          }
        }
      }
    });
  }

  getQuestion(id: number) {
    this.intermediaryService.onLoading();
    const retval = this.apollo.watchQuery<QuestionQueryResponse>({
      query: QueryQuestionDetail,
      variables: {
        id: id
      }
    });

    retval.valueChanges.subscribe((_) => this.intermediaryService.onLoaded());
    return retval;
  }

  getQuestions(categoryId: number, offset: number, limit: number) {
    this.intermediaryService.onLoading();
    const retval = this.apollo.watchQuery({
      query: QueryQuestions,
      variables: {
         criteria: {
           categoryId: categoryId,
           offset: offset,
           limit: limit
       }
      }
     });

    retval.valueChanges.subscribe((_) => this.intermediaryService.onLoaded());
    return retval;
  }

  fetchMoreQuestions(questionsQuery: QueryRef<any>, categoryId: number, offset: number, limit: number) {
    this.intermediaryService.onLoading();
    const retval = questionsQuery.fetchMore({
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

    retval.then((_) => this.intermediaryService.onLoaded());
    return retval;
  }
}
