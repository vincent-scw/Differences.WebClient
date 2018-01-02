import { Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Question } from '../../models/question.model';

import { CategoryService } from '../../services/category.service';
import { Category, CategoryGroup } from '../../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-editor',
  templateUrl: './detail-editor.component.html'
})

export class DetailEditorComponent implements OnInit, OnChanges {
  @Input() data: Question;
  @Output() submit = new EventEmitter<Question>();
  @Output() cancel = new EventEmitter();

  categoryCtrl = new FormControl();
  categoryGroups: CategoryGroup[];

  id: number;
  title: string;
  categoryId: number;
  content: string;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.categoryGroups.subscribe(data => this.categoryGroups = data);
    if (this.data != null) {
      this.id = this.data.id;
      this.title = this.data.title;
      this.categoryId = this.data.categoryId;
      this.content = this.data.content;
    } else {
      this.content = '如题所示！';
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onSubmit(data: Question) {
    this.submit.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
}
