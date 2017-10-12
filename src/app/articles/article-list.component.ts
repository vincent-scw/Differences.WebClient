import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnInit {
  data: ApolloQueryObservable<any>;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.data = this.articleService.getArticles(1, 0, 100);
  }
}
