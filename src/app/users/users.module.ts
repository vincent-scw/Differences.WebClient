import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/contorls.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserService } from '../services/user.service';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  imports: [
    SharedModule,
    ControlsModule,
    UsersRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule {}
