import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from '../services/account/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit, OnDestroy {
  currentUser: User;
  isAdmin: boolean;

  private authSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user.subscribe(
      (user: User) => {
        // this.isAdmin = this.authenticationService.isInRole('administrator');
        if (user == null) {
          this.currentUser = null;
          return;
        }

        this.currentUser = user;
        this.snackBar.open('你好，' + user.displayName + '!', null, {
          duration: 2000,
        });
      });
  }

  ngOnDestroy() {
    if (!!this.authSubscription) { this.authSubscription.unsubscribe(); }
  }

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
    this.router.navigateByUrl('/users/me');
  }
}
