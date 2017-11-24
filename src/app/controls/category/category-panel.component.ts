import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-panel',
  template: `
  <aside class="menu">
    <div *ngFor="let categoryGroup of categoryGroups">
      <category-group-item
        [categoryGroup]="categoryGroup">
      </category-group-item>
    </div>
  </aside>
  `
})

export class CategoryPanelComponent implements OnInit {
  categoryGroups: CategoryGroup[];
  selectedCategory: BehaviorSubject<Category>;

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryGroups = this.categoryService.categoryGroups;
    this.selectedCategory = this.categoryService.selectedCategory;
  }
}
