import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { QuestionService } from '../services/question.service';
import { CategoryService } from '../services/category.service';
import { defaultLoadedObject, IntermediaryService } from '../services/intermediary.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent implements OnInit {
  data: ApolloQueryObservable<any>;
  isEmpty: boolean;

  constructor(private questionService: QuestionService,
    private categoryService: CategoryService,
    private intermediaryService: IntermediaryService) {}

  ngOnInit() {
    this.categoryService.selectedCategory.subscribe(category => {
      this.refresh(category.id);
    });
  }

  refresh(categoryId: number) {
    this.intermediaryService.onLoading();
    this.data = this.questionService.getQuestions(
      categoryId, 0, 100);
    this.data.subscribe(({data}) => {
      this.intermediaryService.onLoaded(defaultLoadedObject());
      this.isEmpty = data.questions == null || data.questions.length === 0;
    });
  }
}
