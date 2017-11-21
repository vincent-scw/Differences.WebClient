import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './ez-quill-editor.component';
import { ContentPanelComponent } from './content-panel.component';
import { ArticleItemComponent } from './article-item.component';
import { QuestionItemComponent } from './question-item.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    ArticleItemComponent,
    QuestionItemComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    ArticleItemComponent,
    QuestionItemComponent
  ]
})
export class ControlsModule {}
