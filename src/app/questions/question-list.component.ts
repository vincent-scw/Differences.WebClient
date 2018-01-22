import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router, ActivatedRoute, Params, ParamMap,
  NavigationEnd
} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

import { IdName } from '../models/id-name.model';

import { QuestionService } from '../services/question.service';
import { CategoryService } from '../services/category.service';
import { IntermediaryService } from '../services/intermediary.service';

import { ListComponentBase } from '../componentbase/list-component-base';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent extends ListComponentBase implements OnInit, OnDestroy {
  selectedCategory: number;
  private categorySubscription: Subscription;
  private selectedCategorySubscription: Subscription;

  constructor(protected questionService: QuestionService,
    protected categoryService: CategoryService,
    protected intermediaryService: IntermediaryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
    super(categoryService, intermediaryService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('category')) {
        this.categoryService.setSelectedCategoryById(+params.get('category'));
      }
    });
    this.categorySubscription = this.categoryService.selectedCategory.subscribe(category => {
      this.router.navigateByUrl(`/questions?category=${category}`);
      this.selectedCategory = category;
      this.fetch();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (!!this.selectedCategorySubscription) {
      this.selectedCategorySubscription.unsubscribe();
    }
    if (!!this.categorySubscription) { this.categorySubscription.unsubscribe(); }
  }

  getCount(data: any) {
    return data.questionCount;
  }

  getValues(data: any) {
    return data.questions;
  }

  fetchData() {
    return this.questionService.getQuestions(this.selectedCategory, 0, this.pagination.limit);
  }

  fetchMore() {
    return this.questionService.fetchMoreQuestions(this.query, this.selectedCategory,
      this.queryData.length, this.pagination.limit);
  }
}
