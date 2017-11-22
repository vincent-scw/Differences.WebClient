import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';

import { TopBarComponent } from './top-bar.component';
import { ScrollableTopBarComponent } from './scrollable-top-bar.component';
import { SearchBoxComponent } from '../search/search-box.component';
import { CategoryPanelComponent } from './category-panel.component';

import { LocationService } from '../services/location.service';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      AccountModule,
      RouterModule
    ],
    declarations: [
      SearchBoxComponent,
      TopBarComponent,
      ScrollableTopBarComponent,
      CategoryPanelComponent
    ],
    exports: [
      TopBarComponent,
      ScrollableTopBarComponent,
      CategoryPanelComponent
    ],
    providers: [
      LocationService,
    ]
})
export class LayoutModule { }
