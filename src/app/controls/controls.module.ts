import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './editor/ez-quill-editor.component';

import { PaginationComponent } from './pagination.component';
import { CategoryPanelComponent } from './category/category-panel.component';
import { CategoryGroupItemComponent } from './category/category-group-item.component';
import { CategoryDropdownComponent } from './category/category-dropdown.component';
import { SearchBoxComponent } from './search-box.component';
import { NoContentComponent } from './no-content.component';
import { ButtonGroupComponent } from './button-group.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent,
    PaginationComponent,
    CategoryPanelComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    SearchBoxComponent,
    NoContentComponent,
    ButtonGroupComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    PaginationComponent,
    CategoryPanelComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    SearchBoxComponent,
    NoContentComponent,
    ButtonGroupComponent
  ]
})
export class ControlsModule {}
