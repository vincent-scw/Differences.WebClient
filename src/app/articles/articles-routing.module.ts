import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';

const articleRoutes: Routes = [
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/:id', component: ArticleDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule { }
