import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { QueryRef } from 'apollo-angular';

import { QuestionService } from '../services/question.service';
import { QuestionAnswerService } from '../services/question-answer.service';
import { IntermediaryService } from '../services/intermediary.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';

import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';
import { from } from 'apollo-link';

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

  private isInitiating = true;

  private questionQuery: QueryRef<any>;
  private answerQuery: QueryRef<any>;

  constructor(
    private questionService: QuestionService,
    private questionAnswerService: QuestionAnswerService,
    private intermediaryService: IntermediaryService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.fetch());

    this.intermediaryService.refreshListener.subscribe(() => {
      this.questionQuery.refetch(); this.answerQuery.refetch();
    });

    this.categoryService.selectedCategory.subscribe(data => {
      if (!this.isInitiating) {
        this.router.navigateByUrl('/questions');
      }
    });

    this.isInitiating = false;
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
    this.authService.forceAuthenticated(() =>
      this.questionAnswerService.addAnswer(this.id, null, this.myAnswerContent)
        .subscribe((data) => {
          this.myAnswerContent = null;
        })
    );
  }

  onUpdateAnswer(data: any): void {
    this.authService.forceAuthenticated(() =>
      this.questionAnswerService.updateAnswer(data.id, data.content).toPromise());
  }

  onUpdateQuestion(data: any): void {
    this.authService.forceAuthenticated(() =>
      this.questionService.updateQuestion(data.id, data.title,
        data.content, { id: data.categoryId, name: '' })
        .toPromise());
  }

  onReply(data: any): void {
    this.authService.forceAuthenticated(() =>
      this.questionAnswerService.addAnswer(this.id, data.parentId, data.content)
        .toPromise());
  }
}
