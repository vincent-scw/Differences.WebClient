import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from '../services/auth.service';
import { ApiClientService } from '../services/api-client.service';
import { User } from '../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit {
  isSignedIn: BehaviorSubject<boolean>;
  currentUser: User;
  isAdmin: boolean;

  ngOnInit() {
    this.isSignedIn = this.authService.isSignedIn();

    this.isSignedIn.subscribe(
      (signedIn: boolean) => {
        if (signedIn) {
          const user = this.authService.getUser();
          this.currentUser = user;
          // this.isAdmin = this.authenticationService.isInRole('administrator');

          this.snackBar.open('你好，' + user.name + '!', null, {
            duration: 2000,
          });
        }
      });
  }

  constructor(
    public snackBar: MdSnackBar,
    protected authService: AuthService,
    protected apiclientService: ApiClientService) {}

  onSignClicked(): void {
    this.authService.login();
  }

  onSignoutClicked() {
    this.authService.logout();
    this.snackBar.open('您已登出!', null, {
      duration: 2000,
    });
  }

  onAccountClicked() {
    this.apiclientService.callAuth('/health/ping_secure')
      .subscribe(
      (res: any) => {
          alert(JSON.stringify(res));
      },
      (error: any) => {
          console.log(error);
      });
  }
}
