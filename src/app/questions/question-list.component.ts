import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { QuestionService } from '../services/question.service';
import { defaultLoadedObject, IntermediaryService } from '../services/intermediary.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent implements OnInit {
  data: ApolloQueryObservable<any>;

  constructor(private questionService: QuestionService,
    private intermediaryService: IntermediaryService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.intermediaryService.onLoading();
    this.data = this.questionService.getQuestions(1, 0, 100);
    this.data.subscribe(() => this.intermediaryService.onLoaded(defaultLoadedObject()));
  }
}
