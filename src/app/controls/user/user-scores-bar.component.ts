import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-scores-bar',
  templateUrl: 'user-scores-bar.component.html'
})

export class UserScoresBarComponent {
  @Input() user: User;
}
