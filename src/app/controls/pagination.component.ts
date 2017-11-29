import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {
  @Input() totalCount: number;
}
