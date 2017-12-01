import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  isEmpty: boolean;
  answers: any;
  myAnswerContent: string;

  constructor(
    private questionService: QuestionService,
    private intermediaryService: IntermediaryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.intermediaryService.onLoading();
    this.route.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.questionService.getQuestion(this.id)
        .valueChanges
        .subscribe(({data}) => {
          this.question = data.question;
          this.intermediaryService.onLoaded(defaultLoadedObject());

          this.questionService.getQuestionAnswers(this.id)
            .valueChanges
            .subscribe((ret) => {
              this.isAnswersLoading = ret.loading;
              this.answers = ret.data;
              this.isEmpty = this.answers.question_answers == null
                || this.answers.question_answers.length === 0;
            });
        })
      );
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
      data.content, {id: 101, name: 'todo'})
      .subscribe((_) => {});
  }

  onReply(data: any): void {

  }
}
