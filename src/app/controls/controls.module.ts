import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './editor/ez-quill-editor.component';
import { ContentPanelComponent } from './editor/content-panel.component';
import { DetailViewComponent } from './editor/detail-view.component';
import { PaginationComponent } from './pagination.component';
import { CategoryPanelComponent } from './category/category-panel.component';
import { CategoryGroupItemComponent } from './category/category-group-item.component';
import { CategoryDropdownComponent } from './category/category-dropdown.component';
import { MdCategoryDropdownComponent } from './category/md-category-dropdown.component';
import { SearchBoxComponent } from './search-box.component';
import { TagsEditorComponent } from './editor/tags-editor.component';
import { NoContentComponent } from './no-content.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    DetailViewComponent,
    PaginationComponent,
    CategoryPanelComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    MdCategoryDropdownComponent,
    SearchBoxComponent,
    TagsEditorComponent,
    NoContentComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    ContentPanelComponent,
    DetailViewComponent,
    PaginationComponent,
    CategoryPanelComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    MdCategoryDropdownComponent,
    SearchBoxComponent,
    TagsEditorComponent,
    NoContentComponent
  ]
})
export class ControlsModule {}
