import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IdName } from '../models/id-name.model';
import { Category, CategoryGroup, CategoryGroupResponse } from '../models/category.model';

const SELECTED_CATEGORY_KEY = 'selected_category';

@Injectable()
export class CategoryService {
  QueryCategoryDefinition = gql`
    query categoryDefinition {
      categoryDefinition {
        id
        name
        description
        categories {
          id
          name
          description
        }
      }
    }
  `;

  private cgList: CategoryGroup[];
  categoryGroups = new BehaviorSubject<CategoryGroup[]>(this.getCategoryGroups());
  categories: IdName[] = [];

  selectedCategory = new BehaviorSubject<IdName>(this.getSelectedCategory());

  constructor(
    private apollo: Apollo) {
      this.getCategoryDefinition().subscribe(({data}) => {
        this.cgList = data.categoryDefinition;
        this.cgList.forEach(element => {
          this.categories.push(element);
          element.categories.forEach(c => {
            this.categories.push(c);
          });
        });

        this.categoryGroups.next(data.categoryDefinition);
      });
  }

  private getCategoryDefinition() {
    return this.apollo.query<CategoryGroupResponse>({
      query: this.QueryCategoryDefinition
    });
  }

  getCategoryGroups(): CategoryGroup[] {
    return this.cgList;
  }

  setSelectedCategory(categoryId: number) {
    const found = this.categories.find(obj => obj.id === categoryId);
    if (found === undefined) {
      console.error('Category cannot be found');
      return;
    }

    localStorage.setItem(SELECTED_CATEGORY_KEY, JSON.stringify(found));
    this.selectedCategory.next(found);
  }

  getSelectedCategory(): IdName {
    const localCategory = localStorage.getItem(SELECTED_CATEGORY_KEY);
    return localCategory == null
      ? this.categories.length === 0 ? {id: 1} : this.categories[0]
      : JSON.parse(localCategory);
  }
}
