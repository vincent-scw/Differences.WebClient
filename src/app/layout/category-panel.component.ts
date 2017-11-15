import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html'
})

export class CategoryPanelComponent implements OnInit {
  categories: Category[];
  selectedCategory: BehaviorSubject<Category>;

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categories = this.categoryService.categories;
    this.selectedCategory = this.categoryService.selectedCategory;
  }

  selectionChange(category: Category) {
    this.categoryService.setSelectedCategory(category.id);
  }
}