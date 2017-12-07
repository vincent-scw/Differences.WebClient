import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';

import { Article,
  ArticleResponse,
  ArticleListResponse } from '../models/article.model';
import { AuthService } from './auth.service';
import { fragments } from './fragments';
import { Category } from '../models/category.model';
import { ApolloServiceBase } from './apollo-service-base';
import { IntermediaryService } from './intermediary.service';

const MutationSubmitArticle = gql`
  mutation differencesMutation($article: SubjectInput!) {
    submitArticle(article: $article) {
      ...ArticleInfo
      user {
        ...UserInfo
      }
    }
  }
  ${fragments.user}
  ${fragments.article}
  `;

const QueryArticleDetail = gql`
  query article($id: Int!) {
    article(id: $id) {
      ...ArticleInfo
      user {
        ...UserInfo
      }
    }
  }
  ${fragments.user}
  ${fragments.article}
  `;

const QueryArticles = gql`
  query articles($criteria:CriteriaInput!) {
    articles(criteria: $criteria){
      ...ArticleInfo
      user {
        ...UserInfo
      }
    }
    article_count(criteria: $criteria)
  }
  ${fragments.user}
  ${fragments.article}
  `;

@Injectable()
export class ArticleService extends ApolloServiceBase {
  private readonly articles_key = 'Articles';

  constructor(private apollo: Apollo,
    private authService: AuthService,
    private intermediaryService: IntermediaryService) {
      super();
  }

  submitArticle(title: string, content: string, category: Category) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitArticle,
      variables: {
        article: {
          title: title,
          content: content,
          categoryId: category.id
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitArticle: {
          __typename: 'ArticleType',
          id: -1,
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
      update: (proxy, { data: { submitArticle }}) => {
        let queryVariable = this.getQueryVariable(this.articles_key, category.id);
        this.updateQuery(queryVariable, proxy, submitArticle);

        queryVariable = this.getQueryVariable(this.articles_key, Math.floor(category.id / 100));
        this.updateQuery(queryVariable, proxy, submitArticle);
      }
    });
  }

  private updateQuery(queryVariable: any, proxy: DataProxy, submitArticle: any) {
    if (queryVariable == null) { return; }

    const q = proxy.readQuery<any>({ query: QueryArticles, variables: queryVariable });
    const values = q.articles;
    values.splice(0, 0, submitArticle);
    proxy.writeQuery({ query: QueryArticles, variables: queryVariable, data: {
        articles: values,
        article_count: q.article_count + 1
      }
    });
  }

  getArticle(id: number) {
    this.intermediaryService.onLoading();
    const retval = this.apollo.watchQuery<ArticleResponse>({
      query: QueryArticleDetail,
      variables: {
        id: id
      }
    });

    retval.valueChanges.subscribe((_) => this.intermediaryService.onLoaded());
    return retval;
  }

  getArticles(categoryId: number, offset: number, limit: number) {
    this.intermediaryService.onLoading();
    const variables = {
      criteria: {
        categoryId: categoryId,
        offset: offset,
        limit: limit
     }
    };
    this.setQueryVariables(this.articles_key, categoryId, variables);
    const retval = this.apollo.watchQuery<ArticleListResponse>({
      query: QueryArticles,
      variables: variables
     });

    retval.valueChanges.subscribe((_) => this.intermediaryService.onLoaded());
    return retval;
  }

  fetchMoreAticles(articlesQuery: QueryRef<ArticleListResponse>, categoryId: number, offset: number, limit: number) {
    this.intermediaryService.onLoading();
    const retval = articlesQuery.fetchMore({
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
          articles: [...prev.articles, ...fetchMoreResult.articles]
        });
      }
    });

    retval.then((_) => this.intermediaryService.onLoaded());
    return retval;
  }
}
