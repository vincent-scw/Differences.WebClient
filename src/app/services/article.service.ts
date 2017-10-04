import {Component, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Article } from '../models/article';

@Injectable()
export class ArticleService {
  constructor(private apollo: Apollo) {
  }

}
