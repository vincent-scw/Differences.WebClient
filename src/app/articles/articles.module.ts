import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { ArticlesRoutingModule } from './articles-routing.module';

import { ArticleService } from '../services/article.service';

import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';
import { WriteArticleComponent } from './write-article.component';
import { ArticleItemComponent } from './article-item.component';

@NgModule({
  imports: [
    SharedModule,
    ControlsModule,
    ArticlesRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    WriteArticleComponent,
    ArticleItemComponent
  ],
  providers: [
    ArticleService
  ],
  entryComponents: [
    WriteArticleComponent
  ]
})
export class ArticlesModule {}
