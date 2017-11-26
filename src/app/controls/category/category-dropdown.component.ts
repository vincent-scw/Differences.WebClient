import { Component, OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,
  FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { IKeyValue } from '../../models/key-value.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-dropdown',
  templateUrl: './category-dropdown.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategoryDropdownComponent),
    multi: true
  }]
})

export class CategoryDropdownComponent implements OnInit,
  ControlValueAccessor {
  isActive: boolean;
  selectedCategory: BehaviorSubject<IKeyValue>;

  onModelChange: Function = (_: any) => {};
  onModelTouched: Function = () => {};

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.selectedCategory = this.categoryService.selectedCategory;
    this.onModelChange(this.selectedCategory.value);
    this.selectedCategory.subscribe((category) => {
      this.onModelChange(category);
    });
  }

  writeValue(value: any) {
    // this.selectedCategory.next(value);
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
