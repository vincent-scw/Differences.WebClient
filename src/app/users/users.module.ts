import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserService } from '../services/user.service';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { UserBasicInfoPanelComponent } from './basic-info/info-panel.component';

@NgModule({
  imports: [
    SharedModule,
    ControlsModule,
    UsersRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserBasicInfoPanelComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule {}
