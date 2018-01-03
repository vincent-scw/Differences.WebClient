import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { QueryRef } from 'apollo-angular';

import { QuestionService } from '../services/question.service';
import { QuestionAnswerService } from '../services/question-answer.service';
import { IntermediaryService } from '../services/intermediary.service';
import { AuthService } from '../services/account/auth.service';
import { CategoryService } from '../services/category.service';

import { Mode } from '../componentbase/mode-toggleable-base';

import { Answer, AnswerLiked } from '../models/answer.model';
import { Question } from '../models/question.model';
import { ConfirmDialogComponent } from '../controls/confirm-dialog.component';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html'
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
  question: Question;
  id: number;

  isAnswersLoading = true;
  isEmpty: boolean;
  answers: Answer[];
  answerLiked: AnswerLiked[];
  myAnswerContent: string;

  private isInitiating = true;

  private questionQuery: QueryRef<any>;
  private answerQuery: QueryRef<any>;

  private paramMapSubscription: Observable<ParamMap>;
  private intermidiarySubscription: Subscription;
  private categorySubscription: Subscription;
  private dialogSubscription: Subscription;

  private childrenInEditMode = 0;

  constructor(
    private questionService: QuestionService,
    private questionAnswerService: QuestionAnswerService,
    private intermediaryService: IntermediaryService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap
      .switchMap((params: Params) => this.id = params.get('id'));
    this.paramMapSubscription.subscribe(() => this.fetch());

    this.intermidiarySubscription = this.intermediaryService.refreshListener.subscribe(() => {
      this.questionQuery.refetch(); this.answerQuery.refetch();
    });

    this.categorySubscription = this.categoryService.selectedCategory.subscribe(data => {
      if (!this.isInitiating && this.childrenInEditMode === 0) {
        this.router.navigateByUrl('/questions');
      } else if (this.childrenInEditMode > 0) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: { content: '您有未提交的修改，要放弃修改吗？', result: false }
        });

        this.dialogSubscription = dialogRef.componentInstance.ok.subscribe(() =>
          this.router.navigateByUrl('/questions'));
      }
    });

    this.isInitiating = false;
  }

  ngOnDestroy(): void {
    if (!!this.intermidiarySubscription) { this.intermidiarySubscription.unsubscribe(); }
    if (!!this.categorySubscription) { this.categorySubscription.unsubscribe(); }
    if (!!this.dialogSubscription) { this.dialogSubscription.unsubscribe(); }
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
        this.answerLiked = answersResponse.answer_liked;
        this.isEmpty = this.answers == null
          || this.answers.length === 0;
      });
  }

  getAnswerLiked(answerId: number): AnswerLiked {
    const b = this.answerLiked.find(a => a.answerId === answerId);
    return b;
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

  onLike(answerId: number): void {
    this.authService.forceAuthenticated(() =>
      this.questionAnswerService.likeAnswer(this.id, answerId)
        .toPromise());
  }

  modeToggled(mode: Mode) {
    if (mode === Mode.edit) {
      this.childrenInEditMode++;
    } else {
      this.childrenInEditMode--;
    }
  }
}
