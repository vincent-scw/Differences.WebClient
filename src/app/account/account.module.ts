import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AccountComponent } from './account.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    SigninComponent,
    SignupComponent
  ],
  exports: [
    AccountComponent
  ],
  entryComponents: [
    SigninComponent
  ]
})
export class AccountModule { }
