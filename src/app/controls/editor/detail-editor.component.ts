import { Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-editor',
  templateUrl: './detail-editor.component.html'
})

export class DetailEditorComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  id: number;
  title: string;
  categoryId: number;
  content: string;

  constructor() {
  }

  ngOnInit() {
    if (this.data != null) {
      this.id = this.data.id;
      this.title = this.data.title;
      this.categoryId = this.data.categoryId;
      this.content = this.data.content;
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onSubmit(data: any) {
    this.submit.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
}
