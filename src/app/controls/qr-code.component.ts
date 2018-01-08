import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qr-code',
  template: `
  <div>
    用微信扫描我就可以分享啦！
    <figure class="image is-128x128">
      <img [src]="src" />
    </figure>
  </div>`
})

export class QRCodeComponent {
  src: string;

  constructor(private dialogRef: MatDialogRef<QRCodeComponent>) {
      this.src = `http://qr.liantu.com/api.php?text=${window.location.href}`;
  }
}

