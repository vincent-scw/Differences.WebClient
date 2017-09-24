import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountComponent
  ],
  exports: [
    AccountComponent
  ],
  entryComponents: [
  ]
})
export class AccountModule { }
