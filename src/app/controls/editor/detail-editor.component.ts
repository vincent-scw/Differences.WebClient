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
  selector: 'detail-editor',
  templateUrl: './detail-editor.component.html'
})

export class DetailEditorComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() onUpdate = new EventEmitter<any>();

  isReadOnly = true;

  currentUser: User;

  newContent: string;

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
}
