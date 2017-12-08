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
  @Input() isCurrentUser: boolean;
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  newContent: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.newContent = this.data.content;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onSubmit() {
    this.submit.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
