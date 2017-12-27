import { Component, Input } from '@angular/core';
import { User } from 'msal/lib-commonjs/User';

@Component({
  selector: 'app-user-basic-view',
  templateUrl: './info-view.component.html'
})

export class UserBasicInfoViewComponent {
 @Input() user: User;
}
