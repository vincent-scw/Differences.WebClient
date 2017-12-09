import { Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  forwardRef  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-group-item',
  templateUrl: './category-group-item.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategoryGroupItemComponent),
    multi: true
  }]
})

export class CategoryGroupItemComponent implements OnInit,
  ControlValueAccessor, OnChanges {
  @Input() categoryGroup: CategoryGroup;

  selectedCategoryId?: number;
  isExpanded: boolean;

  onModelChange: Function = (_: number) => {};
  onModelTouched: Function = () => {};

  constructor(private categoryService: CategoryService) {

  }

  ngOnChanges(changes: SimpleChanges) {
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

  writeValue(value: number) {
    this.selectedCategoryId = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  selectionChange(categoryId: number) {
    this.categoryService.setSelectedCategory(categoryId);
    this.onModelChange(categoryId);
  }
}
