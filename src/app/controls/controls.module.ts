import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './editor/ez-quill-editor.component';
import { ContentPanelComponent } from './editor/content-panel.component';
import { QuillContentPanelComponent } from './editor/quill-content-panel.component';
import { PaginationComponent } from './pagination.component';
import { CategoryPanelComponent } from './category/category-panel.component';
import { CategoryGroupItemComponent } from './category/category-group-item.component';
import { CategoryDropdownComponent } from './category/category-dropdown.component';
import { SearchBoxComponent } from './search-box.component';

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
    PaginationComponent,
    CategoryPanelComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    SearchBoxComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    QuillContentPanelComponent,
    PaginationComponent,
    CategoryPanelComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    SearchBoxComponent
  ]
})
export class ControlsModule {}
