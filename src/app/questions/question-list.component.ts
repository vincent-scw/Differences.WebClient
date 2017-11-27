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

  fetchData(categoryId: number) {
    return this.questionService.getQuestions(
      categoryId, 0, 100);
  }
}
