import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QueryRef } from 'apollo-angular';

import { CategoryService } from '../services/category.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

import { IKeyValue } from '../models/key-value.interface';

export abstract class ListComponentBase implements OnInit {
  query: QueryRef<any>;
  data: any[];
  count: number;
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
    this.query = this.fetchData(categoryId);
    this.query.valueChanges.subscribe(({data}) => {
      this.intermediaryService.onLoaded(defaultLoadedObject());
      this.data = this.getValues(data);
      this.count = this.getCount(data);
    });
  }

  protected abstract getValues(data: any): any[];
  protected abstract getCount(data: any): number;
  protected abstract fetchData(categoryId: number): QueryRef<any>;
}
