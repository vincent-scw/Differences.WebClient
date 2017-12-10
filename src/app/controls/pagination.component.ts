import { Component, Input, Output,
  EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {
  @Input() totalCount: number;
  @Output() pageChange = new EventEmitter();

  dataOffset = 0;
  pSize = 15;
  pIndex = 0;

  get offset() {
    return this.dataOffset;
  }

  get limit() {
    return this.pSize;
  }

  get pageIndex() {
    return this.pIndex;
  }

  reset() {
    this.dataOffset = 0;
    this.pIndex = 0;
    this.pageChange.emit();
  }

  onPaging(event: PageEvent) {
    this.dataOffset = event.pageIndex * event.pageSize;
    this.pIndex = event.pageIndex;
    this.pSize = event.pageSize;
    this.pageChange.emit();
  }
}
