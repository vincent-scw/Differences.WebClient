import { Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from '../../services/account/auth.service';
import { User } from '../../models/user.model';
import { Mode, ModeToggleableBase } from '../../componentbase/mode-toggleable-base';
import { Answer, AnswerLiked } from '../../models/answer.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-panel',
  templateUrl: './content-panel.component.html'
})

export class ContentPanelComponent extends ModeToggleableBase
  implements OnInit, OnChanges {
  @Input() data: Answer;
  @Input() liked: AnswerLiked;
  @Input() replyEnabled = true;
  @Input() alwaysShowActionbar = true;
  @Output() update = new EventEmitter<any>();
  @Output() reply = new EventEmitter<any>();
  @Output() like = new EventEmitter<number>();

  showStatusBar: boolean;
  showEditPanel: boolean;

  currentUser: User;

  newContent: string;
  myReplyContent: string;

  constructor(private authService: AuthService) {
    super();
    this.currentUser = authService.getUser();
  }

  ngOnInit() {
    this.newContent = this.data.content;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onEdit() {
    this.toggleMode(Mode.edit);
  }

  onSubmit() {
    this.update.emit({
      id: this.data.id,
      content: this.newContent});
    this.toggleMode(Mode.view);
  }

  onCancel() {
    this.toggleMode(Mode.view);
    this.newContent = this.data.content;
  }

  onReplySubmit() {
    this.reply.emit({
      parentId: this.data.id,
      content: this.myReplyContent
    });
    this.toggleEditPanel();
  }

  onLike() {
    this.like.emit(this.data.id);
  }

  toggleEditPanel() {
    this.showEditPanel = !this.showEditPanel;
  }
}
