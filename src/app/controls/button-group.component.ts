import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button-group',
  templateUrl: './button-group.component.html'
})

export class ButtonGroupComponent {
  @Input() isValid;
  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  onSubmit() {
    this.submit.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
