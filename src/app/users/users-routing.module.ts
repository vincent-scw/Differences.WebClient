import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { UserSidebarComponent } from '../controls/sidebar/user-sidebar.component';

import { CanActiveMe } from './can-active-me';

const userRoutes: Routes = [
  {
    path: 'users', children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserDetailComponent },
      { path: 'me', component: UserDetailComponent, canActivate: [CanActiveMe] },
      { path: '', component: UserSidebarComponent, outlet: 'sidebar' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
