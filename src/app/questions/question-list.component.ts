import { Component } from '@angular/core';

import { QuestionService } from '../services/question.service';
import { CategoryService } from '../services/category.service';
import { IntermediaryService } from '../services/intermediary.service';

import { ListComponentBase } from '../componentbase/list-component-base';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent extends ListComponentBase {
  constructor(protected questionService: QuestionService,
    protected categoryService: CategoryService,
    protected intermediaryService: IntermediaryService) {
      super(categoryService, intermediaryService);
  }

  getCount(data: any) {
    return data.question_count;
  }

  getValues(data: any) {
    return data.questions;
  }

  fetchData() {
    return this.questionService.getQuestions(this.selectedCategory.value.id, 0, this.pagination.limit);
  }

  fetchMore() {
    return this.questionService.fetchMoreQuestions(this.query, this.selectedCategory.value.id,
      this.queryData.length, this.pagination.limit);
  }
}
