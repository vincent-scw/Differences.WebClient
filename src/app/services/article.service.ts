import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Article } from '../models/article.model';
import { AuthService } from '../services/auth.service';
import { fragments } from './fragments';
import { Category } from '../models/category.model';

export interface ArticleQueryResponse {
  article: any;
  loading: any;
}

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

const MutationSubmitComment = gql`
  mutation differencesMutation($comment: ReplyInput!) {
    submitComment(comment: $comment) {
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

const QueryArticleComments = gql`
  query article_comments($articleId: Int!) {
    article_comments(articleId: $articleId) {
      id
      content
      user {
        ...UserInfo
      }
      createTime
    }
  }
  ${fragments.user}
  `;

@Injectable()
export class ArticleService {
  constructor(private apollo: Apollo,
    private authService: AuthService) {
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
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   submitArticle: {
      //     __typename: 'ArticleType',
      //     title: title,
      //     content: content,
      //     createTime: +new Date,
      //     user: {
      //       __typename: 'UserType',
      //       id: user.id,
      //       displayName: user.name,
      //       avatarUrl: null
      //     }
      //   }
      // },
    });
  }

  submitComment(articleId: number, parentId: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: MutationSubmitComment,
      variables: {
        comment: {
          subjectId: articleId,
          content: content,
          parentId: parentId
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitAnswer: {
          __typename: 'CommentType',
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

  getArticle(id: number) {
    return this.apollo.watchQuery<ArticleQueryResponse>({
      query: QueryArticleDetail,
      variables: {
        id: id
      }
    });
  }

  getArticles(categoryId: number, offset: number, limit: number) {
    return this.apollo.watchQuery({
      query: QueryArticles,
      variables: {
         criteria: {
           categoryId: categoryId,
           offset: offset,
           limit: limit
       }
      }
     });
  }

  getArticleAnswers(articleId: number) {
    return this.apollo.watchQuery({
      query: QueryArticleComments,
      variables: {
        articleId: articleId
      }
    });
  }
}
