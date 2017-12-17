import { UserAgentApplication } from 'msal';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';

import { Config } from '../config';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { IntermediaryService } from './intermediary.service';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_INFO_KEY = 'user_info';
const USER_ID_KEY = 'user_id';
const MSAL_ID_TOKEN_KEY = 'msal.idtoken';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(this.getUser());
  refreshingToken = new BehaviorSubject<boolean>(false);
  /**
   * Token info.
   */
  private expiresIn: number;
  private authTime: number;
  private interval: number;

  /**
   * Scheduling of the refresh token.
   */
  private refreshSubscription: any;

  authSettings = Config.AUTH_SETTINGS;

  authority: string = 'https://login.microsoftonline.com/tfp/'
  + this.authSettings.tenantName + '/'
  + this.authSettings.policyName;

  /*
    * B2C SignIn SignUp Policy Configuration
    */
  clientApplication = new UserAgentApplication(
    this.authSettings.clientId, this.authority,
    (errorDesc: string, token: string, error: string, tokenType: string) => {
      console.warn(tokenType);
      // Called after loginRedirect or acquireTokenPopup
      if (error != null && error !== '') {
        this.intermediaryService.onError(error);
      }
    },
    { redirectUri: Config.DEFAULT_REDIRECT_URL }
  );

  constructor(
    private jwtHelper: JwtHelper,
    private userService: UserService,
    private intermediaryService: IntermediaryService) {

  }

  public login(): void {
    this.clientApplication.loginPopup(this.authSettings.scopes)
      .then((idToken: any) => {
        const fromToken = this.jwtHelper.decodeToken(idToken);
        const user: User = {
          id: fromToken.oid,
          displayName: fromToken.name,
          // jobTitle = fromToken.jobTitle;
          emails: fromToken.emails
        };
        this.storeUser(user);
        this.user.next(user);
        // acquire access token right after signin
        this.acquireAccessToken();
      }, (error: any) => {
        this.intermediaryService.onError('未能成功登录');
        console.error(error);
      });
  }

  public logout() {
    this.clientApplication.logout();
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.user.next(null);
  }

  public tryGetTokens(forceAcquire?: boolean): void {
    if (this.getUser() == null) {
      this.intermediaryService.onWarning('请先登录。');
      return;
    }

    if (!this.idTokenNotExpired() || forceAcquire) {
      this.acquireIdToken();
    }
    if (!this.accessTokenNotExpired() || forceAcquire) {
      this.acquireAccessToken();
    }
  }

  private acquireIdToken() {
    this.clientApplication.acquireTokenSilent([this.authSettings.clientId])
      .then();
  }

  private acquireAccessToken() {
    this.clientApplication.acquireTokenSilent(this.authSettings.scopes)
      .then(
      (token: string) => {
        this.checkUserInDb();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      }, (error: any) => {
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(USER_INFO_KEY);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        this.user.next(null);
        this.intermediaryService.onWarning('会话过期，请重新登录。');
      });
  }

  private isValid(): boolean {
    return this.accessTokenNotExpired();
  }

  private async isAuthenticated(role?: string): Promise<boolean> {
    this.tryGetTokens();

    if (this.getUser() != null && this.isValid()) { return true; }

    this.login();
    return false;
  }

  public forceAuthenticated(funcAfterAuth: () => void, role?: string): void {
    this.isAuthenticated().then(data => {
      if (data === true) {
        funcAfterAuth();
      }
    });
  }

  public getUser(): User {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    return userInfo == null ? null : JSON.parse(userInfo);
  }

  private storeUser(user: User): void {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  }

  /**
   * Checks for presence of token and that token hasn't expired.
   */
  private accessTokenNotExpired(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY); // window.sessionStorage.getItem(MSAL_ID_TOKEN_KEY);
    return tokenNotExpired(null, token);
  }

  private idTokenNotExpired(): boolean {
    const token = window.sessionStorage.getItem(MSAL_ID_TOKEN_KEY);
    return tokenNotExpired(null, token);
  }

  private getExpiryDate(): Date {
    // check id token is enougth,
    // because it will try to refresh accesstoken after
    const token = window.sessionStorage.getItem(MSAL_ID_TOKEN_KEY);
    if (token == null) { return null; }
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  private checkUserInDb() {
    const userInDb = localStorage.getItem(USER_ID_KEY);
    const currentUser = this.getUser();
    if (userInDb != null && userInDb === currentUser.id) { return; }

    // Check user is stored in DB
    this.userService.checkUserInDb()
      .valueChanges
      .subscribe((data: any) => {
        localStorage.setItem(USER_ID_KEY, data.id);
      },
      (error) => {
        console.error(error);
      });
  }
}
