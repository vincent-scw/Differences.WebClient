import { Component, OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,
  FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'md-category-dropdown',
  templateUrl: './md-category-dropdown.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdCategoryDropdownComponent),
    multi: true
  }]
})

export class MdCategoryDropdownComponent implements OnInit,
  ControlValueAccessor, OnChanges {
  categoryCtrl = new FormControl();
  categoryGroups: CategoryGroup[];

  private innerValue: Category;

  onModelChange: Function = (_: any) => {};
  onModelTouched: Function = () => {};

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    // this.selectedCategory = this.categoryService.selectedCategory;
    this.categoryService.categoryGroups.subscribe(data => this.categoryGroups = data);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  get selectedCategory(): Category {
    return this.innerValue;
  }

  set selectedCategory(value: Category) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onModelChange(this.innerValue);
    }
  }

  onBlur() {
    this.onModelTouched();
  }

  onChange(data: any) {
    this.onModelChange(this.innerValue);
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
