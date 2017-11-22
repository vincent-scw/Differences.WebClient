import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../services/category.service';
import { Category, CategoryGroup } from '../models/category.model';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html'
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

  selectionChange(categoryId: number) {
    this.categoryService.setSelectedCategory(categoryId);
  }
}
