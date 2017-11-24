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

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-panel',
  templateUrl: './content-panel.component.html'
})

export class ContentPanelComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() replyEnabled = true;
  @Input() alwaysShowActionbar = true;
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onReply = new EventEmitter<any>();

  showStatusBar: boolean;
  showEditPanel: boolean;
  isReadOnly = true;

  currentUser: User;

  newContent: string;
  myReplyContent: string;

  constructor(private authService: AuthService) {
    this.currentUser = authService.getUser();
  }

  ngOnInit() {
    this.newContent = this.data.content;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onEdit() {
    this.isReadOnly = false;
  }

  onSubmit() {
    this.onUpdate.emit({
      id: this.data.id,
      content: this.newContent});
    this.isReadOnly = true;
  }

  onCancel() {
    this.isReadOnly = true;
    this.newContent = this.data.content;
  }

  onReplySubmit() {
    this.onReply.emit({
      parentId: this.data.id,
      content: this.myReplyContent
    });
    this.toggleEditPanel();
  }

  toggleEditPanel() {
    this.showEditPanel = !this.showEditPanel;
  }
}
