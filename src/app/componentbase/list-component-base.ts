import { OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QueryRef } from 'apollo-angular';

import { CategoryService } from '../services/category.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

import { IKeyValue } from '../models/key-value.interface';

import { PaginationComponent } from '../controls/pagination.component';

export abstract class ListComponentBase implements OnInit {
  query: QueryRef<any>;
  data: any[];
  count: number;
  selectedCategory: BehaviorSubject<IKeyValue>;
  queryData: any[];

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  constructor(protected categoryService: CategoryService,
    protected intermediaryService: IntermediaryService) {

  }

  ngOnInit() {
    this.selectedCategory = this.categoryService.selectedCategory;
    this.selectedCategory.subscribe(category => {
      this.fetch();
    });
    this.intermediaryService.refreshListener.subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.pagination.reset();
    this.intermediaryService.onLoading();

    this.query.refetch();
  }

  fetch() {
    this.intermediaryService.onLoading();
    this.query = this.fetchData();
    this.query.valueChanges.subscribe(({data}) => {
      this.intermediaryService.onLoaded(defaultLoadedObject());
      this.queryData = this.getValues(data);

      this.data = this.queryData.slice(this.pagination.offset,
        this.pagination.offset + this.pagination.limit);
      this.count = this.getCount(data);
    });
  }

  onPaging() {
    if (this.pagination.offset >= this.queryData.length) {
      this.intermediaryService.onLoading();
      this.fetchMore();
    } else {
      this.data = this.queryData.slice(this.pagination.offset,
        this.pagination.offset + this.pagination.limit);
    }
  }

  protected abstract fetchMore(): Promise<any>;

  protected abstract getValues(data: any): any[];
  protected abstract getCount(data: any): number;
  protected abstract fetchData(): QueryRef<any>;
}
