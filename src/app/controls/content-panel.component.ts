import { Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-panel',
  templateUrl: './content-panel.component.html'
})

export class ContentPanelComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() onUpdate = new EventEmitter<any>();
  showStatusBar: boolean;
  isReadOnly = true;

  newContent: string;

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
