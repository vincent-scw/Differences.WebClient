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

const AccessToken_CacheKey = 'access_token';
const AuthToken_CacheKey = 'auth_token';

export enum AccountType {
  linkedIn
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(this.getUser());

  public static getProvider(accountType: AccountType, authService: AuthService)
    : AuthProviderBase {
    if (accountType === AccountType.linkedIn) {
      return new LinkedInAuthProvider(authService);
    }
  }

  constructor(
    protected userService: UserService,
    protected intermediaryService: IntermediaryService) {
  }

  get acessToken(): string {
    return localStorage.getItem(AccessToken_CacheKey);
  }

  set accessToken(token: string) {
    localStorage.setItem(AccessToken_CacheKey, token);
  }

  get authToken(): string {
    return localStorage.getItem(AuthToken_CacheKey);
  }

  set authToken(token: string) {
    localStorage.setItem(AuthToken_CacheKey, token);
  }

  public login(): void {

  }

  public logout() {

  }

  public forceAuthenticated(funcAfterAuth: () => void, role?: string): void {
    funcAfterAuth();
  }

  public getUser(): User {
    return null;
  }

  // After updating user info, allow store user, so make it public
  public storeUser(user: User): void {

  }

  private checkUserInDb() {
    // const userInDb = localStorage.getItem(this.USER_ID_KEY);
    // const currentUser = this.getUser();
    // if (userInDb != null && userInDb === currentUser.id) { return; }

    // // Check user is stored in DB
    // this.userService.checkUserInDb()
    //   .subscribe((data: any) => {
    //     localStorage.setItem(this.USER_ID_KEY, data.checkUserInDb.id);
    //   },
    //   (error) => {
    //     console.error(error);
    //   });
  }
}
