import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { ArticleService } from '../services/article.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnInit {
  data: ApolloQueryObservable<any>;

  constructor(private articleService: ArticleService,
    private intermediaryService: IntermediaryService) {}

  ngOnInit() {
    this.intermediaryService.onLoading();
    this.data = this.articleService.getArticles(1, 0, 100);
    this.data.subscribe(() =>
      this.intermediaryService.onLoaded(defaultLoadedObject()));
  }
}
