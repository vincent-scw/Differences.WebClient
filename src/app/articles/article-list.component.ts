import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnInit {
  data: ApolloQueryObservable<any>;
  isEmpty: boolean;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    private intermediaryService: IntermediaryService) {
  }

  ngOnInit() {
    this.categoryService.selectedCategory.subscribe(category => {
      this.refresh(category.id);
    });
  }

  refresh(categoryId: number) {
    this.intermediaryService.onLoading();
    this.data = this.articleService.getArticles(categoryId, 0, 100);
    this.data.subscribe(({data}) => {
      this.intermediaryService.onLoaded(defaultLoadedObject());
      this.isEmpty = data.articles == null || data.articles.length === 0;
    });
  }
}
