import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IKeyValue } from '../models/key-value.interface';
import { Category, CategoryGroup } from '../models/category.model';
import { BrowserStorage } from './browser-storage.service';

const selected_category_key = 'selected_category';

@Injectable()
export class CategoryService {
  QueryCategoryDefinition = gql`
    query category_definition {
      category_definition {
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
  categories: IKeyValue[] = [];

  selectedCategory = new BehaviorSubject<IKeyValue>(this.getSelectedCategory());

  constructor(private browserStorage: BrowserStorage,
    private apollo: Apollo) {
      this.getCategoryDefinition().subscribe(({data}) => {
        this.cgList = data.category_definition;
        this.cgList.forEach(element => {
          this.categories.push(element);
          element.categories.forEach(c => {
            this.categories.push(c);
          });
        });

        this.categoryGroups.next(data.category_definition);
      });
  }

  private getCategoryDefinition() {
    return this.apollo.watchQuery<any>({
      query: this.QueryCategoryDefinition
    });
  }

  getCategoryGroups(): CategoryGroup[] {
    return this.cgList;
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

  getSelectedCategory(): IKeyValue {
    return this.browserStorage.get(selected_category_key)
      ? JSON.parse(this.browserStorage.get(selected_category_key))
      : this.categories[0];
  }
}
