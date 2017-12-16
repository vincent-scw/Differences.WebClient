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
      // Called after loginRedirect or acquireTokenPopup
      if (error != null && error !== '') {
        this.intermediaryService.onError(error);
      }
    },
    { redirectUri: Config.DEFAULT_REDIRECT_URL}
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
        if (this.refreshingToken.getValue() === false) {
          this.refreshToken();
        }
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
    // Unschedules the refresh token.
    this.unscheduleRefresh();
  }

  public scheduleRefresh(): void {
    // No user logged in, return
    if (this.getUser() == null) { return; }

    const expireDate = this.getExpiryDate();
    const expires = expireDate == null ? 0 : expireDate.getTime();
    const dateNow = Date.now();
    // If the token is expired, refresh it now
    // Otherwise schedule refresh untill one min before expire
    const diff = expires < dateNow ? 0 : expires - dateNow - 60000;

    this.refreshSubscription = Observable.timer(diff)
      .subscribe(() => this.refreshToken());
  }

  /**
   * Unsubscribes from the scheduling of the refresh token.
   */
  public unscheduleRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private refreshToken(): void {
    if (this.refreshingToken.getValue()) { return; }

    this.refreshingToken.next(true);
    this.clientApplication.acquireTokenSilent(this.authSettings.scopes).then(
      (accessToken: any) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        this.checkUserInDb();
        this.scheduleRefresh();
        this.refreshingToken.next(false);
      }, (error: any) => {
        console.warn(error);
        this.clientApplication.acquireTokenPopup(this.authSettings.scopes).then(
          (accessToken: any) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            this.checkUserInDb();
            this.scheduleRefresh();
            this.refreshingToken.next(false);
          }, (ex: any) => {
            this.intermediaryService.onError('获取令牌失败');
            console.error(ex);
          });
      });
  }

  public isValid(): boolean {
    return this.tokenNotExpired();
  }

  private async isAuthenticated(role?: string): Promise<boolean> {
    if (this.refreshingToken.getValue()) {
      await this.refreshingToken.toPromise();
    }
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    if (userInfo != null && this.isValid()) { return true; }

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
  private tokenNotExpired(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY); // window.sessionStorage.getItem(MSAL_ID_TOKEN_KEY);
    return tokenNotExpired(null, token);
  }

  private getExpiryDate(): Date {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
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
        localStorage.set(USER_ID_KEY, data.id);
      },
      (error) => {
        console.error(error);
      });
  }
}
