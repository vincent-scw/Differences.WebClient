import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { SubmitQuestionService } from '../services/submit-question.service';

import { QuestionListComponent } from './question-list.component';
import { AskQuestionComponent } from './ask-question.component';
import { QuestionDetailComponent } from './question-detail.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    QuestionsRoutingModule
  ],
  declarations: [
    QuestionDetailComponent,
    QuestionListComponent,
    AskQuestionComponent
  ],
  providers: [
    SubmitQuestionService
  ]
})
export class QuestionsModule {}
