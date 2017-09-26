///<reference path="../../../node_modules/msal/out/msal.d.ts" />
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';

import { Config } from '../config';
import { User } from '../models/user';
import { BrowserStorage } from './browser-storage.service';

@Injectable()
export class AuthService {
  signinStatus = new BehaviorSubject<boolean>(this.tokenNotExpired());
  user = new BehaviorSubject<User>(this.getUser());

  /**
   * Token info.
   */
  private expiresIn: number;
  private authTime: number;

  isAuthenticated = false;
  access_token: string;
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
    private jwtHelper: JwtHelper) {

  }

  public login(): void {
    const _this = this;
    this.clientApplication.loginPopup(this.authSettings.scopes)
      .then(function (idToken: any) {
        const fromToken = _this.jwtHelper.decodeToken(idToken);

        const user = new User();
        user.id = fromToken.oid;
        user.name = fromToken.name;
        user.jobTitle = fromToken.jobTitle;
        user.emails = fromToken.emails;

        _this.authTime = fromToken.auth_time;
        // Calculates token expiration.
        _this.expiresIn = fromToken.exp as number * 1000; // To milliseconds.
        _this.storeExpiry(_this.authTime + _this.expiresIn);

        _this.signinStatus.next(true);
        _this.user.next(user);
        _this.storeUser(user);

        // _this.schedualRefresh();
      }, function (error: any) {
        console.log('Error during login:\n' + error);
    });
  }

  public logout() {
    this.clientApplication.logout();
    this.browserStorage.remove('user_info');
    this.signinStatus.next(false);
    this.user.next(new User());
    //         // Unschedules the refresh token.
//         this.unscheduleRefresh();

//         // Revokes tokens.
//         this.revokeToken();
//         this.revokeRefreshToken();
  }

  private schedualRefresh(): void {
    const _this = this;
    this.clientApplication.acquireTokenSilent(this.authSettings.scopes).then(
        function (accessToken: any) {
            _this.access_token = accessToken;
            alert(accessToken);
            _this.signinStatus.next(true);
        }, function (error: any) {
          console.log(error);
          _this.clientApplication.acquireTokenPopup(_this.authSettings.scopes).then(
            function (accessToken: any) {
                _this.access_token = accessToken;
                alert(accessToken);
                _this.signinStatus.next(true);
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

  /**
   * Calls UserInfo endpoint to retrieve user's data.
   */
  public userChanged(): BehaviorSubject<any> {
      return this.user;
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
    // const token: string = this.browserStorage.get('access_token');
    return /*token != null && */user !== undefined && (this.getExpiry() > new Date().valueOf());
  }

  /**
   * Stores access token & refresh token.
   */
  private storeToken(body: any): void {
      // this.browserStorage.set('access_token', body.access_token);
      // this.browserStorage.set('refresh_token', body.refresh_token);
      // this.browserStorage.set('token_type', body.token_type);
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

  private getUser(): User {
      return this.browserStorage.get('user_info') ? JSON.parse(this.browserStorage.get('user_info')) : undefined;
  }

  private storeUser(user: User): void {
      this.browserStorage.set('user_info', JSON.stringify(user));
  }
}
