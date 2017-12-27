import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';

import { AccountComponent } from './account.component';
import { TopBarComponent } from './top-bar.component';
import { ScrollableTopBarComponent } from './scrollable-top-bar.component';
import { FooterComponent } from './footer.component';

import { LocationService } from '../services/location.service';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      ControlsModule,
      RouterModule
    ],
    declarations: [
      TopBarComponent,
      ScrollableTopBarComponent,
      FooterComponent,
      AccountComponent
    ],
    exports: [
      TopBarComponent,
      ScrollableTopBarComponent,
      FooterComponent,
      AccountComponent
    ],
    providers: [
      LocationService,
    ]
})
export class LayoutModule { }
