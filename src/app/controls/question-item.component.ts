import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html'
})

export class QuestionItemComponent {
  @Input() item: any;
}
