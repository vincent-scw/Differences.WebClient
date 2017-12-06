import { Component, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { Article } from '../models/article.model';
import { AuthService } from '../services/auth.service';
import { fragments } from './fragments';
import { Category } from '../models/category.model';
import { ApolloServiceBase } from './apollo-service-base';
import { DataProxy } from 'apollo-cache';

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
export class ArticleCommentService extends ApolloServiceBase {
  private readonly article_comments_key = 'Article_Comments';

  constructor(private apollo: Apollo,
    private authService: AuthService) {
      super();
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
          id: -1,
          content: content,
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

  getArticleAnswers(articleId: number) {
    return this.apollo.watchQuery<any>({
      query: QueryArticleComments,
      variables: {
        articleId: articleId
      }
    });
  }
}
