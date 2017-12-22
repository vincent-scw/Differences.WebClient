import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { AccountModule } from '../account/account.module';

import { TopBarComponent } from './top-bar.component';
import { ScrollableTopBarComponent } from './scrollable-top-bar.component';
import { FooterComponent } from './footer.component';

import { LocationService } from '../services/location.service';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      ControlsModule,
      AccountModule,
      RouterModule
    ],
    declarations: [
      TopBarComponent,
      ScrollableTopBarComponent,
      FooterComponent
    ],
    exports: [
      TopBarComponent,
      ScrollableTopBarComponent,
      FooterComponent
    ],
    providers: [
      LocationService,
    ]
})
export class LayoutModule { }
