import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Question } from '../../models/question.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-panel',
  templateUrl: './detail-panel.component.html'
})

export class DetailPanelComponent implements OnInit {
  @Input() data: Question;
  @Output() update = new EventEmitter<Question>();

  isReadonly = true;
  isMe: boolean;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    const currentUser = this.authService.getUser();
    this.isMe = currentUser != null && currentUser.id === this.data.user.id;
  }

  onSubmit(data: Question) {
    this.update.emit(data);
    this.isReadonly = true;
  }
}
