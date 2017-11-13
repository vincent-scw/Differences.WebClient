import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from '../models/category.model';
import { BrowserStorage } from './browser-storage.service';

@Injectable()
export class CategoryService {
  categories: Category[] = [
    {
      id: 1,
      name: '技术'
    },
    {
      id: 2,
      name: '社科'
    },
    {
      id: 3,
      name: '人文'
    },
    {
      id: 4,
      name: '语言'
    },
    {
      id: 5,
      name: '其他'
    }
  ];

  selectedCategory: BehaviorSubject<Category>;

  constructor(private browserStorage: BrowserStorage) {

  }

  setSelectedCategory(categoryId: number) {
    const found = this.categories.find(obj => obj.id === categoryId);
    if (found === undefined) {
      console.log('Category cannot be found');
      return;
    }

    this.selectedCategory.next(found);
  }
}
