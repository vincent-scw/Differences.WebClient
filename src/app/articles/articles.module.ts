import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ArticlesRoutingModule } from './articles-routing.module';

import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent
  ],
  providers: []
})
export class ArticlesModule {}
