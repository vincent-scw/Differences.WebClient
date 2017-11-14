import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from '../models/category.model';
import { BrowserStorage } from './browser-storage.service';

const selected_category_key = 'selected_category';
@Injectable()
export class CategoryService implements OnInit {
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

  selectedCategory = new BehaviorSubject<Category>(this.getSelectedCategory());

  constructor(private browserStorage: BrowserStorage) {

  }

  ngOnInit() {
  }

  setSelectedCategory(categoryId: number) {
    const found = this.categories.find(obj => obj.id === categoryId);
    if (found === undefined) {
      console.log('Category cannot be found');
      return;
    }

    this.browserStorage.set(selected_category_key, JSON.stringify(found));
    this.selectedCategory.next(found);
  }

  getSelectedCategory(): Category {
    return this.browserStorage.get(selected_category_key)
      ? JSON.parse(this.browserStorage.get(selected_category_key))
      : undefined;
  }
}
