import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ApolloQueryObservable } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { QuestionService } from '../services/question.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html'
})

export class QuestionDetailComponent implements OnInit {
  question: any;
  id: number;

  isAnswersLoading = true;
  answers: any;
  myAnswerContent: string;

  constructor(
    private questionService: QuestionService,
    private intermediaryService: IntermediaryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.intermediaryService.onLoading();
    this.route.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.questionService.getQuestion(this.id)
        .subscribe(({data}) => {
          this.question = data.question;
          this.intermediaryService.onLoaded(defaultLoadedObject());

          this.questionService.getQuestionAnswers(this.id)
            .subscribe((ret) => {
              this.isAnswersLoading = ret.loading;
              this.answers = ret.data;
            });
        })
      );
  }

  goBack(): void {
    this.location.back();
  }

  submitAnswer(): void {
    this.questionService.addAnswer(this.id, null, this.myAnswerContent)
      .subscribe((data) => {
        this.myAnswerContent = null;
      });
  }

  onUpdateAnswer(data: any): void {
    this.questionService.updateAnswer(data.id, data.content)
      .subscribe((_) => {});
  }

  onUpdateQuestionContent(data: any): void {
    this.questionService.updateQuestion(data.id, this.question.title,
      data.content, 1)
      .subscribe((_) => {});
  }

  onReply(data: any): void {
    
  }
}
