import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  providers: []
})
export class UsersModule {}
