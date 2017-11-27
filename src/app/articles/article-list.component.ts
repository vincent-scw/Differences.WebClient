import { Component } from '@angular/core';

import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { IntermediaryService } from '../services/intermediary.service';

import { ListComponentBase } from '../componentbase/list-component-base';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent extends ListComponentBase {
  constructor(protected articleService: ArticleService,
    protected categoryService: CategoryService,
    protected intermediaryService: IntermediaryService) {
      super(categoryService, intermediaryService);
  }

  checkIsEmpty(data: any) {
    return data.articles == null || data.articles.length === 0;
  }

  fetchData(categoryId: number) {
    return this.articleService.getArticles(categoryId, 0, 100);
  }
}
