import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'left-dock-panel',
  templateUrl: 'left-dock-panel.component.html'
})

export class LeftDockPanelComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
