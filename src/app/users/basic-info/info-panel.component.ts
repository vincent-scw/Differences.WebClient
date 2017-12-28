import { Component, Input } from '@angular/core';

import { ModeToggleableBase } from '../../componentbase/mode-toggleable-base';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-basic-panel',
  templateUrl: './info-panel.component.html'
})

export class UserBasicInfoPanelComponent extends ModeToggleableBase {
  @Input() user: User;

  constructor(private userService: UserService) {
    super();
  }

  updateUser(value: User) {
    this.userService.updateUser(value).subscribe();
  }
}
