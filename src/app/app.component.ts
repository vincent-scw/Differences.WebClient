import { Component, OnInit } from '@angular/core';
import { NavigationNode } from './models/navigation.model';
import { Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError } from '@angular/router';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { IntermediaryService } from './services/intermediary.service';
import { CategoryService } from './services/category.service';
import { Category } from './models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isOpened = true;
  isFetching: boolean;
  categories: Category[];

  tocMaxHeight = 400;

  constructor(private breadcrumbService: BreadcrumbService,
    private intermediaryService: IntermediaryService,
    private categoryService: CategoryService,
    private router: Router) {
    breadcrumbService.addFriendlyNameForRoute('/questions', '问题');
    breadcrumbService.addCallbackForRouteRegex('/questions/[0-9]+', this.getQuestionName);

    breadcrumbService.addFriendlyNameForRoute('/articles', '文章');
    breadcrumbService.addCallbackForRouteRegex('/articles/[0-9]+', this.getArticleName);

    breadcrumbService.addFriendlyNameForRoute('/users', '大神');
    // breadcrumbService.addCallbackForRouteRegex('/users/[0-9]+', this.getArticleName);
  }

  ngOnInit() {
    this.intermediaryService.loadingState().subscribe(
      (loadingObj: any) => {
        this.isFetching = loadingObj.isLoading;
    });
    this.categories = this.categoryService.categories;
  }

  getQuestionName(id: string): string {
    return '问题 ' + id;
  }

  getArticleName(id: string): string {
    return '文章 ' + id;
  }
}
