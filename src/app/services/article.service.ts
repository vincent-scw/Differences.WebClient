import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Article } from '../models/article';
import { AuthService } from '../services/auth.service';
import { fragments } from './fragments';

export interface ArticleQueryResponse {
  article: any;
  loading: any;
}

@Injectable()
export class ArticleService {
  MutationSubmitArticle = gql`
    mutation differencesMutation($article: SubjectInput!) {
      submitArticle(article: $article) {
        id
        title
        content
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
    `;

  MutationSubmitComment = gql`
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

  QueryArticleDetail = gql`
    query article($id: Int!) {
      article(id: $id) {
        id
        title
        content
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
    `;

  QueryArticles = gql`
    query articles($criteria:CriteriaInput!) {
      articles(criteria: $criteria){
        id
        title
        content
        user {
          ...UserInfo
        }
        createTime
      }
    }
    ${fragments.user}
  `;

  QueryArticleComments = gql`
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

  constructor(private apollo: Apollo,
    private authService: AuthService) {
  }

  submitArticle(title: string, content: string, categoryId: number) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: this.MutationSubmitArticle,
      variables: {
        article: {
          title: title,
          content: content,
          categoryId: categoryId
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        submitArticle: {
          __typename: 'ArticleType',
          title: title,
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
        articles: (previousResult, { mutationResult }) => {
          return {
            articles: [mutationResult.data.submitArticle, ...previousResult.questions]
          };
        }
      }
    });
  }

  submitComment(articleId: number, parentId: number, content: string) {
    const user = this.authService.getUser();
    return this.apollo.mutate({
      mutation: this.MutationSubmitComment,
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
      },
      updateQueries: {
        article_comments: (previousResult, { mutationResult }) => {
          return {
            article_comments: [mutationResult.data.submitComment, ...previousResult.article_comments]
          };
        }
      }
    });
  }

  getArticle(id: number) {
    return this.apollo.watchQuery<ArticleQueryResponse>({
      query: this.QueryArticleDetail,
      variables: {
        id: id
      }
    });
  }

  getArticles(categoryId: number, offset: number, limit: number) {
    return this.apollo.watchQuery({
      query: this.QueryArticles,
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
      query: this.QueryArticleComments,
      variables: {
        articleId: articleId
      }
    });
  }
}
