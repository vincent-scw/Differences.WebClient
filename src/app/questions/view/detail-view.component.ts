import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../services/account/auth.service';
import { User } from '../../models/user.model';
import { Question } from '../../models/question.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-view',
  templateUrl: './detail-view.component.html'
})

export class DetailViewComponent implements OnInit {
  @Input() data: Question;
  @Input() isCurrentUser: boolean;
  @Output() edit = new EventEmitter<any>();

  currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = authService.getUser();
  }

  ngOnInit() {

  }

  onEdit() {
    this.edit.emit();
  }
}
