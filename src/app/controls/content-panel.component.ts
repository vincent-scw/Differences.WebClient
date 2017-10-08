import { Component,
  OnInit,
  Input,
  Output,
  OnChanges,
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
  @Input() showStatusBar: boolean;

  onModelChange: Function = (_: any) => {};
  onModelTouched: Function = () => {};

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
