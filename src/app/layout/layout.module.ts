import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';

import { TopMenuComponent } from './top-menu.component';
import { TopBarComponent } from './top-bar.component';
import { SearchBoxComponent } from '../search/search-box.component';
import { TocComponent } from './toc.component';

import { LocationService } from '../services/location.service';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      AccountModule,
      RouterModule
    ],
    declarations: [
      TopMenuComponent,
      SearchBoxComponent,
      TopBarComponent,
      TocComponent
    ],
    exports: [
      TopBarComponent,
      TocComponent
    ],
    providers: [
      LocationService,
    ]
})
export class LayoutModule { }
