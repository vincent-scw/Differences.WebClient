import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { QueryRef } from 'apollo-angular';

import { QuestionService } from '../services/question.service';
import { QuestionAnswerService } from '../services/question-answer.service';
import { IntermediaryService } from '../services/intermediary.service';

import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html'
})

export class QuestionDetailComponent implements OnInit {
  question: Question;
  id: number;

  isAnswersLoading = true;
  isEmpty: boolean;
  answers: Answer[];
  myAnswerContent: string;

  private questionQuery: QueryRef<any>;
  private answerQuery: QueryRef<any>;

  constructor(
    private questionService: QuestionService,
    private questionAnswerService: QuestionAnswerService,
    private intermediaryService: IntermediaryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.fetch());

    this.intermediaryService.refreshListener.subscribe(() => {
      this.questionQuery.refetch(); this.answerQuery.refetch(); });
  }

  private fetch(): void {
    this.questionQuery = this.questionService.getQuestion(this.id);
    this.questionQuery.valueChanges
      .subscribe(({ data }) => {
        this.question = data.question;
      });

    this.answerQuery = this.questionAnswerService.getQuestionAnswers(this.id);
    this.answerQuery.valueChanges
      .subscribe((ret) => {
        const answersResponse = ret.data;
        this.isAnswersLoading = answersResponse.loading;
        this.answers = answersResponse.question_answers;
        this.isEmpty = this.answers == null
          || this.answers.length === 0;
      });
  }

  submitAnswer(): void {
    this.questionAnswerService.addAnswer(this.id, null, this.myAnswerContent)
      .subscribe((data) => {
        this.myAnswerContent = null;
      });
  }

  onUpdateAnswer(data: any): void {
    this.questionAnswerService.updateAnswer(data.id, data.content).toPromise();
  }

  onUpdateQuestion(data: any): void {
    this.questionService.updateQuestion(data.id, data.title,
      data.content, { id: data.categoryId, name: '' })
      .toPromise();
  }

  onReply(data: any): void {
    this.questionAnswerService.addAnswer(this.id, data.parentId, data.content)
      .toPromise();
  }
}
