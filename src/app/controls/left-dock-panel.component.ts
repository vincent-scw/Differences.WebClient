import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QRCodeComponent } from './qr-code.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'left-dock-panel',
  templateUrl: 'left-dock-panel.component.html'
})

export class LeftDockPanelComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {
  }

  onWechatClick() {
    this.dialog.open(QRCodeComponent, {});
  }

  onClose() {
    this.close.emit();
  }
}
