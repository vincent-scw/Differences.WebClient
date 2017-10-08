import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './ez-quill-editor.component';
import { ContentPanelComponent } from './content-panel.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent,
    ContentPanelComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    ContentPanelComponent
  ]
})
export class ControlsModule {}
