import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html'
})

export class CategoryPanelComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categories = this.categoryService.categories;
  }

  selectionChange(data) {
    alert(JSON.stringify(data));
    // this.categoryService.setSelectedCategory()
  }
}
