///<reference path="../../../node_modules/msal/out/msal.d.ts" />
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../config';

@Injectable()
export class AuthService {
  signinStatus = new BehaviorSubject<boolean>(this.tokenNotExpired());
  userAgentApp: Msal.UserAgentApplication;

  isAuthenticated = false;
  authSettings = Config.AUTH_SETTINGS;

  constructor() {
    const self = this;
    const authority: string = 'https://login.microsoftonline.com/tfp/'
       + this.authSettings.tenantName + '/'
       + this.authSettings.policyName + '/';

    this.userAgentApp = new Msal.UserAgentApplication(this.authSettings.clientId, authority,
      (errorDesc: string, token: string, error: string, tokenType: string) => {
        const scopedUserAgentApp = window.msal as Msal.UserAgentApplication;
        if (token) {
          scopedUserAgentApp.acquireTokenSilent(self.authSettings.scopes)
            .then((accessToken: string) => {
              // Update status.
              self.setAuthenticated(accessToken);
            },
            (ex) => {
              console.log(ex);
              scopedUserAgentApp.acquireTokenPopup(self.authSettings.scopes)
                .then((accessToken: string) => {
                  // Update status.
                  self.setAuthenticated(accessToken);
              }, (ex2) => {
                console.log(ex2);
              });
            });
        }

        if (errorDesc || error) {
          console.log(error + ':' + errorDesc);
        }
      }
    );

    this.signinStatus.next(false);
  }

  login() {
    this.userAgentApp.loginPopup(this.authSettings.scopes)
      .then(idToken => {
        const user = this.userAgentApp.getUser();
        alert(JSON.stringify(user));
        if (user) {
          return user;
        } else {
            return null;
        }
      }, () => {
        return null;
      });
  }

  logout() {
    this.userAgentApp.logout();
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
    return false;
      // const token: string = this.browserStorage.get('access_token');
      // return token != null && (this.getExpiry() > new Date().valueOf());
  }
}
