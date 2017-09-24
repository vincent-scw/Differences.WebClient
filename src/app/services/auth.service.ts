///<reference path="../../../node_modules/msal/out/msal.d.ts" />
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../config';
import { User } from '../models/user';
import { BrowserStorage } from './browser-storage.service';

@Injectable()
export class AuthService {
  signinStatus = new BehaviorSubject<boolean>(this.tokenNotExpired());
  user = new BehaviorSubject<User>(this.getUser());

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

  constructor(private browserStorage: BrowserStorage) {

  }

  public login(): void {
    const _this = this;
    this.clientApplication.loginPopup(this.authSettings.scopes)
      .then(function (idToken: any) {
        const info = _this.clientApplication.getUser();
        const user = new User();
        user.id = '';
        user.name = info.name;

        _this.signinStatus.next(true);
        _this.user.next(user);
        _this.storeUser(user);
        // _this.clientApplication.acquireTokenSilent(_this.authSettings.scopes).then(
        //     function (accessToken: any) {
        //         _this.access_token = accessToken;
        //         alert(accessToken);
        //         _this.signinStatus.next(true);
        //     }, function (error: any) {
        //         _this.clientApplication.acquireTokenPopup(_this.authSettings.scopes).then(
        //             function (accessToken: any) {
        //                 _this.access_token = accessToken;
        //                 alert(accessToken);
        //                 _this.signinStatus.next(true);
        //             }, function (ex: any) {
        //                 console.log('Error acquiring the popup:\n' + ex);
        //             });
        //     });
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
    return this.getUser().name !== undefined;
      // const token: string = this.browserStorage.get('access_token');
      // return token != null && (this.getExpiry() > new Date().valueOf());
  }

  /**
   * Stores access token & refresh token.
   */
  private store(body: any): void {
      // this.browserStorage.set('access_token', body.access_token);
      // this.browserStorage.set('refresh_token', body.refresh_token);
      // this.browserStorage.set('token_type', body.token_type);

      // // Calculates token expiration.
      // this.expiresIn = body.expires_in as number * 1000; // To milliseconds.
      // this.storeExpiry(this.authTime + this.expiresIn);
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
      return this.browserStorage.get('user_info') ? JSON.parse(this.browserStorage.get('user_info')) : new User();
  }

  private storeUser(user: User): void {
      this.browserStorage.set('user_info', JSON.stringify(user));
  }
}
