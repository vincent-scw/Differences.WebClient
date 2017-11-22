import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './ez-quill-editor.component';
import { ContentPanelComponent } from './content-panel.component';
import { QuillContentPanelComponent } from './quill-content-panel.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    QuillContentPanelComponent,
    PaginationComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    QuillContentPanelComponent,
    PaginationComponent
  ]
})
export class ControlsModule {}
