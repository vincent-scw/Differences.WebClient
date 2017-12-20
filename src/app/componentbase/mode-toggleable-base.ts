import { Output, EventEmitter } from '@angular/core';

export enum Mode {
  view,
  edit
}

export abstract class ModeToggleableBase {
  @Output() modeToggled = new EventEmitter<Mode>();

  isReadonly = true;

  toggleMode(mode: Mode) {
    if (mode === Mode.edit) {
      this.isReadonly = false;
    } else {
      this.isReadonly = true;
    }
    this.modeToggled.emit(mode);
  }
}
