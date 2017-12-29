import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionListComponent } from './question-list.component';
import { QuestionDetailComponent } from './question-detail.component';
import { CategorySidebarComponent } from '../controls/sidebar/category-sidebar.component';

const questionRoutes: Routes = [
  {
    path: 'questions', children: [
      { path: '', component: QuestionListComponent },
      { path: ':id', component: QuestionDetailComponent },
      { path: ':id/:title', component: QuestionDetailComponent },
      { path: '', component: CategorySidebarComponent, outlet: 'sidebar' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(questionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsRoutingModule { }
