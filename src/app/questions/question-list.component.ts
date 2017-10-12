import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent implements OnInit {
  data: ApolloQueryObservable<any>;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.data = this.questionService.getQuestions(1, 0, 100);
  }
}
