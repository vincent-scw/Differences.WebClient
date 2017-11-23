import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';

import { TopBarComponent } from './top-bar.component';
import { ScrollableTopBarComponent } from './scrollable-top-bar.component';
import { SearchBoxComponent } from '../search/search-box.component';
import { CategoryPanelComponent } from './category-panel.component';
import { CategoryGroupItemComponent } from './category-group-item.component';
import { FooterComponent } from './footer.component';

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
      CategoryPanelComponent,
      CategoryGroupItemComponent,
      FooterComponent
    ],
    exports: [
      TopBarComponent,
      ScrollableTopBarComponent,
      CategoryPanelComponent,
      FooterComponent
    ],
    providers: [
      LocationService,
    ]
})
export class LayoutModule { }
