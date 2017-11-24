import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionService } from '../services/question.service';

import { QuestionListComponent } from './question-list.component';
import { AskQuestionComponent } from './ask-question.component';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionItemComponent } from './question-item.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ControlsModule,
    QuestionsRoutingModule
  ],
  declarations: [
    QuestionDetailComponent,
    QuestionListComponent,
    QuestionItemComponent,
    AskQuestionComponent
  ],
  providers: [
    QuestionService
  ],
  entryComponents: [
    AskQuestionComponent
  ]
})
export class QuestionsModule {}
