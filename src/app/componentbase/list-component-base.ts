import { OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../services/category.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

import { IKeyValue } from '../models/key-value.interface';

export abstract class ListComponentBase implements OnInit {
  data: ApolloQueryObservable<any>;
  isEmpty: boolean;
  selectedCategory: BehaviorSubject<IKeyValue>;

  constructor(protected categoryService: CategoryService,
    protected intermediaryService: IntermediaryService) {

  }

  ngOnInit() {
    this.selectedCategory = this.categoryService.selectedCategory;
    this.selectedCategory.subscribe(category => {
      this.refresh(category.id);
    });
    this.intermediaryService.refreshListener.subscribe(() => {
      this.refresh(this.selectedCategory.value.id);
    });
  }

  refresh(categoryId: number) {
    this.intermediaryService.onLoading();
    this.data = this.fetchData(categoryId);
    this.data.subscribe(({data}) => {
      this.intermediaryService.onLoaded(defaultLoadedObject());
      this.isEmpty = this.checkIsEmpty(data);
    });
  }

  protected abstract checkIsEmpty(data: any);
  protected abstract fetchData(categoryId: number): ApolloQueryObservable<any>;
}
