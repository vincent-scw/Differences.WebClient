import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { AccountType, AuthService } from './services/account/auth.service';
import { AuthProviderBase } from './services/account/auth-provider-base';

@Component({
  template: ``
})

export class AuthComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  private typeSubscription: Subscription;

  authProvider: AuthProviderBase;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.typeSubscription = this.activatedRoute.paramMap.subscribe((params: Params) =>
      this.authProvider = this.getAuthProvider(params.get('type'))
    );
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (this.authProvider.validateParams(params)) {
        
      }
    });
  }

  ngOnDestroy() {
    if (!!this.routeSubscription) { this.routeSubscription.unsubscribe(); }
    if (!!this.typeSubscription) { this.typeSubscription.unsubscribe(); }
  }

  private getAuthProvider(type: string): AuthProviderBase {
    if (type === 'linkedin') {
      return AuthService.getProvider(AccountType.linkedIn, this.authService);
    }

    this.router.navigateByUrl('/notfound');
  }
}
