import { Component, Input } from '@angular/core';
import { User } from 'msal/lib-commonjs/User';

@Component({
  selector: 'app-user-basic-editor',
  templateUrl: './info-editor.component.html'
})

export class UserBasicInfoEditorComponent {
  @Input() user: User;
}
