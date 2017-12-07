import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';

import { AuthService } from './auth.service';
import {
  Question,
  QuestionResponse,
  QuestionListResponse
} from '../models/question.model';
import { Category } from '../models/category.model';
import { fragments } from './fragments';
import { ApolloServiceBase } from './apollo-service-base';
import { IntermediaryService } from './intermediary.service';

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
  private readonly questions_key = 'Questions';

  constructor(private apollo: Apollo,
    private authService: AuthService,
    private intermediaryService: IntermediaryService) {
    super();
  }

  //#region mutation
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
          id: -1,
          title: title,
          content: content,
          category: category.name,
          createTime: +new Date,
          user: {
            __typename: 'UserType',
            id: user.id,
            displayName: user.displayName,
            // avatarUrl: user.avatarUrl
          }
        }
      },
      update: (proxy, { data: { submitQuestion } }) => {
        let queryVariable = this.getQueryVariable(this.questions_key, category.id);
        this.addToQuery(queryVariable, proxy, submitQuestion);

        queryVariable = this.getQueryVariable(this.questions_key, Math.floor(category.id / 100));
        this.addToQuery(queryVariable, proxy, submitQuestion);
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
            // avatarUrl: user.avatarUrl
          }
        }
      },
      update: (proxy, { data: { submitQuestion } }) => {
        let queryVariable = this.getQueryVariable(this.questions_key, category.id);
        this.updateQuery(queryVariable, proxy, submitQuestion);

        queryVariable = this.getQueryVariable(this.questions_key, Math.floor(category.id / 100));
        this.updateQuery(queryVariable, proxy, submitQuestion);
      }
    });
  }

  private addToQuery(queryVariable: any, proxy: DataProxy, submitQuestion: any) {
    if (queryVariable == null) { return; }

    const q = proxy.readQuery<QuestionListResponse>({ query: QueryQuestions, variables: queryVariable });
    const values = q.questions;
    values.splice(0, 0, submitQuestion);
    proxy.writeQuery({
      query: QueryQuestions, variables: queryVariable, data: {
        questions: values,
        question_count: q.question_count + 1
      }
    });
  }

  private updateQuery(queryVariable: any, proxy: DataProxy, submitQuestion: any) {
    if (queryVariable == null) { return; }

    const q = proxy.readQuery<QuestionListResponse>({ query: QueryQuestions, variables: queryVariable });
    const values = q.questions;
    const foundIndex = values.findIndex(x => x.id === submitQuestion.id);
    values.splice(foundIndex, 1, submitQuestion);
    proxy.writeQuery({
      query: QueryQuestions, variables: queryVariable, data: {
        questions: values,
        question_count: q.question_count
      }
    });
  }
  //#endregion

  //#region Fetch
  getQuestion(id: number) {
    this.intermediaryService.onLoading();
    const retval = this.apollo.watchQuery<QuestionResponse>({
      query: QueryQuestionDetail,
      variables: {
        id: id
      }
    });

    retval.valueChanges.subscribe((_) => this.intermediaryService.onLoaded());
    return retval;
  }

  getQuestions(categoryId: number, offset: number, limit: number) {
    const variables = {
      criteria: {
        categoryId: categoryId,
        offset: offset,
        limit: limit
      }
    };
    this.setQueryVariables(this.questions_key, categoryId, variables);
    this.intermediaryService.onLoading();
    const retval = this.apollo.watchQuery<QuestionListResponse>({
      query: QueryQuestions,
      variables: variables
    });

    retval.valueChanges.subscribe((_) => this.intermediaryService.onLoaded());
    return retval;
  }

  fetchMoreQuestions(questionsQuery: QueryRef<QuestionListResponse>, categoryId: number, offset: number, limit: number) {
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
  //#endregion
}
