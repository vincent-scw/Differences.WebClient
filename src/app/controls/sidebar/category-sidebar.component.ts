import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-sidebar',
  template: `
  <aside class="menu">
    <ul *ngFor="let categoryGroup of categoryGroups"
      class="menu-list">
      <category-group-item
        [categoryGroup]="categoryGroup">
      </category-group-item>
    </ul>
  </aside>
  `
})

export class CategorySidebarComponent implements OnInit {
  categoryGroups: CategoryGroup[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.categoryGroups.subscribe(data => this.categoryGroups = data);
  }
}
