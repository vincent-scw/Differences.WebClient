import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-group-item',
  templateUrl: './category-group-item.component.html'
})

export class CategoryGroupItemComponent implements OnInit {
  @Input() categoryGroup: CategoryGroup;

  selectedCategoryId?: number;
  isExpanded: boolean;

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryService.selectedCategory.subscribe(x => {
      this.selectedCategoryId = x == null ? null : x.id;

      const found = this.categoryGroup.categories.find(c => c.id === this.selectedCategoryId);
      if (found != null) {
        this.isExpanded = true;
      }
    });
  }

  selectionChange(categoryId: number) {
    this.categoryService.setSelectedCategory(categoryId);
  }
}
