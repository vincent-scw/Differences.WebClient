import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ModeToggleableBase } from '../../componentbase/mode-toggleable-base';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/account/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-basic-panel',
  templateUrl: './info-panel.component.html'
})

export class UserBasicInfoPanelComponent extends ModeToggleableBase
  implements OnInit, OnDestroy {
  @Input() user: User;
  email: string;
  displayName: string;

  private userSubscription: Subscription;
  private updateSubscription: Subscription;

  constructor(private userService: UserService,
    private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(u => {
      this.email = u.email;
      this.displayName = u.displayName;
    });

  }

  ngOnDestroy() {
    if (!!this.userSubscription) { this.userSubscription.unsubscribe(); }
    if (!!this.updateSubscription) { this.updateSubscription.unsubscribe(); }
  }

  updateUser(value: User) {
    this.updateSubscription = this.userService.updateUser(value).subscribe(({ data }) => {
      this.authService.storeUser(data.updateUserInfo);
      this.isReadonly = true;
    });
  }

  onEdit() {
    this.isReadonly = false;
  }

  onCancel() {
    this.email = this.user.email;
    this.displayName = this.user.displayName;
    this.isReadonly = true;
  }
}
