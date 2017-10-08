import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from '../controls/ez-quill-editor.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent
  ],
  exports: [
    EasyQuillEditorComponent
  ]
})
export class ControlsModule {}
