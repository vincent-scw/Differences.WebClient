import { UserAgentApplication } from 'msal';
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
import { AccountBase, Policy } from './account-base.service';

@Injectable()
export class AuthService extends AccountBase {
  user = new BehaviorSubject<User>(this.getUser());
  refreshingToken = new BehaviorSubject<boolean>(false);

  /**
   * Scheduling of the refresh token.
   */
  private refreshSubscription: any;
  private clientApplication: UserAgentApplication;

  constructor(
    protected jwtHelper: JwtHelper,
    protected userService: UserService,
    protected intermediaryService: IntermediaryService) {
    super(Policy.sign, jwtHelper, userService);

    this.clientApplication = new UserAgentApplication(
      this.authSettings.clientId, this.authority,
      (errorDesc: string, token: string, error: string, tokenType: string) => {
        console.warn(tokenType);
      },
      { redirectUri: Config.DEFAULT_REDIRECT_URL }
    );
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
        this.tryGetTokens().then();
      }, (error: any) => {
        this.intermediaryService.onError('未能成功登录');
        console.error(error);
      });
  }

  public logout() {
    this.clientApplication.logout();
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.USER_INFO_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.user.next(null);
  }

  public async tryGetTokens(forceAcquire?: boolean): Promise<void> {
    if (this.getUser() == null) {
      this.intermediaryService.onWarning('请先登录。');
      return;
    }

    while (this.refreshingToken.getValue() === true) {
      await this.refreshingToken.toPromise();
    }

    this.refreshingToken.next(true);
    if (!this.idTokenNotExpired() || forceAcquire) {
      this.acquireIdToken();
    }
    if (!this.accessTokenNotExpired() || forceAcquire) {
      this.acquireAccessToken();
    }
    this.refreshingToken.next(false);
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
        localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
      }, (error: any) => {
        localStorage.removeItem(this.USER_ID_KEY);
        localStorage.removeItem(this.USER_INFO_KEY);
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        this.user.next(null);
        this.intermediaryService.onWarning('会话过期，请重新登录。');
      });
  }

  private isValid(): boolean {
    return this.accessTokenNotExpired();
  }

  private async isAuthenticated(role?: string): Promise<boolean> {
    await this.tryGetTokens();

    if (this.getUser() != null && this.isValid()) { return true; }

    // this.login();
    return false;
  }

  public forceAuthenticated(funcAfterAuth: () => void, role?: string): void {
    this.isAuthenticated().then(data => {
      if (data === true) {
        funcAfterAuth();
      }
    });
  }
}
