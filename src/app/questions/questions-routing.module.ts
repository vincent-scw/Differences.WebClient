import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionListComponent } from './question-list.component';
import { AskQuestionComponent } from './ask-question.component';
import { QuestionDetailComponent } from './question-detail.component';

const questionRoutes: Routes = [
  { path: 'questions', component: QuestionListComponent },
  { path: 'ask-question', component: AskQuestionComponent },
  { path: 'question/:id', component: QuestionDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(questionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsRoutingModule { }
