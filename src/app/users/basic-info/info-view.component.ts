import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'msal/lib-commonjs/User';

@Component({
  selector: 'app-user-basic-view',
  templateUrl: './info-view.component.html'
})

export class UserBasicInfoViewComponent {
  @Input() user: User;
  @Output() edit = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }
}
