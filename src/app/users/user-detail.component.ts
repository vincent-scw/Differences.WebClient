import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/account/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})

export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  private paramMapSubscription: Observable<ParamMap>;
  private authSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (this.router.url === '/users/me') {
      // handle for myself
      this.authSubscription = this.authService.user.subscribe(
        (user: User) => {
          this.user = user;
        });
    } else {
      let id: string;
      this.paramMapSubscription = this.activatedRoute.paramMap
        .switchMap((params: Params) => id = params.get('id'));
      this.paramMapSubscription.subscribe(() => this.getUser(id));
    }
  }

  ngOnDestroy() {
    if (!!this.authSubscription) { this.authSubscription.unsubscribe(); }
  }

  getUser(id: string) {

  }
}
