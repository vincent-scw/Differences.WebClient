import { Component, OnInit } from '@angular/core';
import { MdDialog,
  MdDialogRef,
  MD_DIALOG_DATA,
  MdSnackBar } from '@angular/material';
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

    // this.authenticationService.userChanged().subscribe(
    //     (user: User) => {
    //       if (this.isSignedIn.getValue()) {
    //         this.currentUser = user;
    //         this.isAdmin = this.authenticationService.isInRole('administrator');

    //         this.snackBar.open('你好，' + user.nickName + '!', null, {
    //           duration: 2000,
    //         });
    //       }
    //     });

    // // Optional strategy for refresh token through a scheduler.
    // this.authenticationService.startupTokenRefresh();
  }

  constructor(public dialog: MdDialog,
    public snackBar: MdSnackBar,
    protected authService: AuthService,
    protected apiclientService: ApiClientService) {}

  onSignInClicked(): void {
    // const dialogRef = this.dialog.open(SigninComponent, {
    //   width: '400px'
    // });
    this.authService.login();
  }

  onSignUpClicked() {
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
