import { Component, Input } from '@angular/core';

import { ModeToggleableBase } from '../../componentbase/mode-toggleable-base';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/account/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-basic-panel',
  templateUrl: './info-panel.component.html'
})

export class UserBasicInfoPanelComponent extends ModeToggleableBase {
  @Input() user: User;

  constructor(private userService: UserService,
    private authService: AuthService) {
    super();
  }

  updateUser(value: User) {
    this.userService.updateUser(value).subscribe(({ data }) => {
      this.authService.storeUser(data.updateUserInfo);
      this.isReadonly = true;
    });
  }
}
