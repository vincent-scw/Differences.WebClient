import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-basic-editor',
  templateUrl: './info-editor.component.html'
})

export class UserBasicInfoEditorComponent implements OnInit {
  @Input() user: User;
  @Output() submit = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  email: string;
  displayName: string;

  ngOnInit() {
    this.email = this.user.email;
    this.displayName = this.user.displayName;
  }

  onSubmit(value: any) {
    this.submit.emit(value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
