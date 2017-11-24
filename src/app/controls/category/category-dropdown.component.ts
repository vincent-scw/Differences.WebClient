import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { IKeyValue } from '../../models/key-value.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-dropdown',
  templateUrl: './category-dropdown.component.html'
})

export class CategoryDropdownComponent implements OnInit {
  isActive: boolean;
  selectedCategory: BehaviorSubject<IKeyValue>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.selectedCategory = this.categoryService.selectedCategory;
  }
}
