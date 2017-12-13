import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionService } from '../services/question.service';
import { QuestionAnswerService } from '../services/question-answer.service';

import { ContentPanelComponent } from './panel/content-panel.component';
import { DetailPanelComponent } from './panel/detail-panel.component';
import { DetailEditorComponent } from './editor/detail-editor.component';
import { DetailViewComponent } from './view/detail-view.component';
import { TagsEditorComponent } from './editor/tags-editor.component';

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
    AskQuestionComponent,
    ContentPanelComponent,
    DetailPanelComponent,
    DetailEditorComponent,
    DetailViewComponent,
    TagsEditorComponent
  ],
  providers: [
    QuestionService,
    QuestionAnswerService
  ],
  entryComponents: [
    AskQuestionComponent
  ]
})
export class QuestionsModule {}
