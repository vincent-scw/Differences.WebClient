import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';
import { IKeyValue } from '../../models/key-value.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'md-category-dropdown',
  templateUrl: './md-category-dropdown.component.html'
})

export class MdCategoryDropdownComponent implements OnInit {
  categoryCtrl = new FormControl();
  categoryGroups: CategoryGroup[];
  selectedCategory: BehaviorSubject<IKeyValue>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.selectedCategory = this.categoryService.selectedCategory;
    this.categoryGroups = this.categoryService.categoryGroups;
  }
}
