import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../services/category.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

import { IKeyValue } from '../models/key-value.interface';

export abstract class ListComponentBase implements OnInit {
  data: Observable<any>;
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
    this.data = this.fetchData(categoryId);
    this.data.subscribe(({data}) => {
      this.intermediaryService.onLoaded(defaultLoadedObject());
      this.count = this.getCount(data);
    });
  }

  protected abstract getCount(data: any): number;
  protected abstract fetchData(categoryId: number): Observable<any>;
}
