import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EasyQuillEditorComponent } from './editor/ez-quill-editor.component';

import { PaginationComponent } from './pagination.component';
import { CategoryGroupItemComponent } from './category/category-group-item.component';
import { CategoryDropdownComponent } from './category/category-dropdown.component';
import { SearchBoxComponent } from './search-box.component';
import { NoContentComponent } from './no-content.component';
import { ButtonGroupComponent } from './button-group.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CategorySidebarComponent } from './sidebar/category-sidebar.component';
import { UserSidebarComponent } from './sidebar/user-sidebar.component';
import { UserScoresBarComponent } from './user/user-scores-bar.component';
import { LeftDockPanelComponent } from './left-dock-panel.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EasyQuillEditorComponent,
    PaginationComponent,
    CategorySidebarComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    SearchBoxComponent,
    NoContentComponent,
    ButtonGroupComponent,
    ConfirmDialogComponent,
    UserSidebarComponent,
    UserScoresBarComponent,
    LeftDockPanelComponent
  ],
  exports: [
    EasyQuillEditorComponent,
    PaginationComponent,
    CategorySidebarComponent,
    CategoryGroupItemComponent,
    CategoryDropdownComponent,
    SearchBoxComponent,
    NoContentComponent,
    ButtonGroupComponent,
    ConfirmDialogComponent,
    UserSidebarComponent,
    UserScoresBarComponent,
    LeftDockPanelComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class ControlsModule {}
