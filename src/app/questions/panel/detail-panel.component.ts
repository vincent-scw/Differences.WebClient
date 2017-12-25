import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';

import { AuthService } from '../../services/account/auth.service';
import { User } from '../../models/user.model';
import { Question } from '../../models/question.model';
import { Mode, ModeToggleableBase } from '../../componentbase/mode-toggleable-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-panel',
  templateUrl: './detail-panel.component.html'
})

export class DetailPanelComponent extends ModeToggleableBase implements OnInit {
  @Input() data: Question;
  @Output() update = new EventEmitter<Question>();

  isMe: boolean;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    const currentUser = this.authService.getUser();
    this.isMe = currentUser != null && currentUser.id === this.data.user.id;
  }

  onSubmit(data: Question) {
    this.update.emit(data);
    this.toggleMode(Mode.view);
  }

  onEdit() {
    this.toggleMode(Mode.edit);
  }

  onCancel() {
    this.toggleMode(Mode.view);
  }
}
