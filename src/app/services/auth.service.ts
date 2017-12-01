///<reference path="../../../node_modules/msal/out/msal.d.ts" />
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';

import { Config } from '../config';
import { User } from '../models/user.model';
import { BrowserStorage } from './browser-storage.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  signinStatus = new BehaviorSubject<boolean>(this.tokenNotExpired());
  user = new BehaviorSubject<User>(this.getUser());

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

  isAuthenticated = false;
  authSettings = Config.AUTH_SETTINGS;

  authority: string = 'https://login.microsoftonline.com/tfp/'
    + this.authSettings.tenantName + '/'
    + this.authSettings.policyName;

  /*
    * B2C SignIn SignUp Policy Configuration
    */
  clientApplication = new Msal.UserAgentApplication(
    this.authSettings.clientId, this.authority,
    function (errorDesc: any, token: any, error: any, tokenType: any) {
        // Called after loginRedirect or acquireTokenPopup
    }
  );

  constructor(private browserStorage: BrowserStorage,
    private jwtHelper: JwtHelper,
    private userService: UserService) {

  }

  public login(): void {
    const _this = this;
    this.clientApplication.loginPopup(this.authSettings.scopes)
      .then(function (idToken: any) {
        console.log(JSON.stringify(idToken));
        const fromToken = _this.jwtHelper.decodeToken(idToken);

        _this.interval = fromToken.exp - fromToken.auth_time - 60;
        _this.scheduleRefresh();
      }, function (error: any) {
        console.log('Error during login:\n' + error);
    });
  }

  public logout() {
    this.clientApplication.logout();
    this.browserStorage.remove('user_id');
    this.browserStorage.remove('user_info');
    this.signinStatus.next(false);
    this.user.next(new User());
    // Unschedules the refresh token.
    this.unscheduleRefresh();
  }

  public scheduleRefresh(): void {
    const expires = this.getExpiry();
    const dateNow = Date.now();
    let diff = expires < dateNow ? 0 : expires - dateNow;
    if (this.getUser() === undefined) { diff = 0; }

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
    const _this = this;
    this.clientApplication.acquireTokenSilent(this.authSettings.scopes).then(
        function (accessToken: any) {
          _this.storeToken(accessToken);
          _this.scheduleRefresh();
        }, function (error: any) {
          console.log(error);
          _this.clientApplication.acquireTokenPopup(_this.authSettings.scopes).then(
            function (accessToken: any) {
              _this.storeToken(accessToken);
              _this.scheduleRefresh();
            }, function (ex: any) {
                console.log('Error acquiring the popup:\n' + ex);
            });
        });
  }

  /**
   * Checks if user is signed in.
   */
  public isSignedIn(): BehaviorSubject<boolean> {
      return this.signinStatus;
  }

  private setAuthenticated(accessToken: string) {
    // Update the UI.
    this.isAuthenticated = true;

    // this.identity = Msal.Utils.extractIdToken(accessToken) as AuthIdentity;
    // this.identity.displayName = this.identity.given_name + ' ' + this.identity.family_name;
  }

  /**
   * Checks for presence of token and that token hasn't expired.
   */
  private tokenNotExpired(): boolean {
    const user = this.getUser();
    const token: string = this.browserStorage.get('access_token');
    return token != null && user !== undefined && (this.getExpiry() > new Date().valueOf());
  }

  /**
   * Stores access token & refresh token.
   */
  private storeToken(accessToken: string): void {
    this.browserStorage.set('access_token', accessToken);
    const fromToken = this.jwtHelper.decodeToken(accessToken);

    const user = new User();
    user.id = fromToken.oid;
    user.name = fromToken.name;
    // user.jobTitle = fromToken.jobTitle;
    user.emails = fromToken.emails;

    this.authTime = fromToken.auth_time;

    this.expiresIn = fromToken.exp * 1000;
    this.storeExpiry(this.expiresIn);

    this.storeUser(user);
    this.user.next(user);
    this.signinStatus.next(true);

    // Check user is stored in DB
    this.userService.checkUserInDb()
      .valueChanges
      .subscribe((data: any) => {
      },
      (error) => {
        console.log(error);
      });
  }

  /**
   * Returns token expiration in milliseconds.
   */
  private getExpiry(): number {
      return parseInt(this.browserStorage.get('expires'), 0);
  }

  private storeExpiry(exp: number): void {
      this.browserStorage.set('expires', exp.toString());
  }

  public getUser(): User {
      return this.browserStorage.get('user_info') ? JSON.parse(this.browserStorage.get('user_info')) : undefined;
  }

  private storeUser(user: User): void {
      this.browserStorage.set('user_info', JSON.stringify(user));
  }
}
