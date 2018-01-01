import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-scores-bar',
  templateUrl: 'user-scores-bar.component.html'
})

export class UserScoresBarComponent {
  @Input() contribution: number;
  @Input() reputation: number;
}
