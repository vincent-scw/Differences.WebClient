import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html'
})

export class QuestionItemComponent {
  @Input() item: any;

  getColor(): string {
    let answerWeight = this.item.answerCount * 10;
    let secondaryWeight = this.item.answerCount * 5;
    answerWeight = answerWeight > 255 ? 255 : answerWeight;
    secondaryWeight = secondaryWeight > 130 ? 130 : secondaryWeight;
    return `rgb(${answerWeight}, ${secondaryWeight}, 0)`;
  }
}
