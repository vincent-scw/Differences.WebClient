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
    super(jwtHelper, userService);

    this.clientApplication = new UserAgentApplication(
      this.authSettings.clientId, this.getAuthority(Policy.sign),
      (errorDesc: string, token: string, error: string, tokenType: string) => {
        console.warn(tokenType);

        this.intermediaryService.onError(error);
      },
      { redirectUri: Config.DEFAULT_REDIRECT_URL }
    );
  }

  public login(): void {
    this.clientApplication.authority = this.getAuthority(Policy.sign);
    this.clientApplication.loginPopup(this.authSettings.scopes)
      .then((idToken: any) => {
        this.cleanCache();

        const fromToken = this.jwtHelper.decodeToken(idToken);
        const user: User = {
          id: fromToken.oid,
          displayName: fromToken.name,
          // jobTitle = fromToken.jobTitle;
          email: fromToken.emails[0]
        };
        this.storeUser(user);
        // acquire access token right after signin
        this.tryGetTokens().then();
      }, (error: any) => {
        if (error && error.indexOf('AADB2C90118') > -1) {
          this.handleForgotPassword();
        } else {
          this.intermediaryService.onError('未能成功登录');
          console.error(error);
        }
      });
  }

  private handleForgotPassword(): void {
    this.clientApplication.authority = this.getAuthority(Policy.forgotPassword);
    this.clientApplication.loginPopup(this.authSettings.scopes)
      .then((idToken: any) => {
        // there are some issues in MSAL, so ask for login again.
        this.intermediaryService.onWarning('修改密码成功，请登录！');
      }, (error: any) => {
        this.intermediaryService.onError('修改密码失败');
        console.error(error);
      });
  }

  public logout() {
    this.clientApplication.logout();
    this.cleanCache();
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
        console.error(error);
        this.cleanCache();
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

  public getUser(): User {
    const userInfo = localStorage.getItem(this.USER_INFO_KEY);
    return userInfo == null ? null : JSON.parse(userInfo);
  }

  // After updating user info, allow store user, so make it public
  public storeUser(user: User): void {
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(user));
    this.user.next(user);
  }

  private checkUserInDb() {
    const userInDb = localStorage.getItem(this.USER_ID_KEY);
    const currentUser = this.getUser();
    if (userInDb != null && userInDb === currentUser.id) { return; }

    // Check user is stored in DB
    this.userService.checkUserInDb()
      .subscribe((data: any) => {
        localStorage.setItem(this.USER_ID_KEY, data.checkUserInDb.id);
      },
      (error) => {
        console.error(error);
      });
  }
}
