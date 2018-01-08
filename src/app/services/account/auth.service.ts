import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';

import { Config } from '../../config';
import { User } from '../../models/user.model';
import { UserService } from '../user.service';
import { IntermediaryService } from '../intermediary.service';
import { AuthProviderBase } from './auth-provider-base';
import { LinkedInAuthProvider } from './linkedin-auth.provider';
import { MicrosoftAuthProvider } from './microsoft-auth.provider';
import { Subscription } from 'rxjs/Subscription';

const AccessToken_CacheKey = 'access_token';
const User_CacheKey = 'user_info';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(this.getUser());

  private fetchSubscription: Subscription;

  public static getProvider(accountType: string, authService: AuthService)
    : AuthProviderBase {
    switch (accountType) {
      case 'linkedin':
        return new LinkedInAuthProvider(authService);
      case 'microsoft':
        return new MicrosoftAuthProvider(authService);
    }
  }

  constructor(
    protected userService: UserService,
    protected intermediaryService: IntermediaryService) {
  }

  get accessToken(): string {
    return localStorage.getItem(AccessToken_CacheKey);
  }

  set accessToken(token: string) {
    localStorage.setItem(AccessToken_CacheKey, token);
  }

  public fetchUserInfo(type: string, code: string) {
    this.fetchSubscription = this.userService.auth(type, code).valueChanges.subscribe(({ data }) => {
      this.accessToken = data.auth.accessToken;
      this.storeUser(data.auth.user);
      this.fetchSubscription.unsubscribe();
    });
  }

  public logout() {
    localStorage.removeItem(User_CacheKey);
    localStorage.removeItem(AccessToken_CacheKey);
    this.user.next(null);
  }

  public forceAuthenticated(funcAfterAuth: () => void, role?: string): void {
    if (this.isAccessTokenValid()) {
      funcAfterAuth();
    } else {
      this.intermediaryService.onWarning('会话过期，请重新登录！');
    }
  }

  public getUser(): User {
    const userInfo = localStorage.getItem(User_CacheKey);
    return userInfo == null ? null : JSON.parse(userInfo);
  }

  // After updating user info, allow store user, so make it public
  public storeUser(user: User): void {
    localStorage.setItem(User_CacheKey, JSON.stringify(user));
    this.user.next(user);
  }

  public isAccessTokenValid(): boolean {
    const accessToken = this.accessToken;
    return tokenNotExpired(null, accessToken);
  }
}
