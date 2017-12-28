import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { Config } from '../../config';
import { UserAgentApplication } from 'msal/lib-commonjs/UserAgentApplication';
import { IntermediaryService } from '../intermediary.service';
import { User } from '../../models/user.model';
import { UserService } from '../user.service';

export enum Policy {
  sign,
  editProfile,
  passwordReset
}

export abstract class AccountBase {
  ACCESS_TOKEN_KEY = 'access_token';
  USER_INFO_KEY = 'user_info';
  USER_ID_KEY = 'user_id';
  MSAL_ID_TOKEN_KEY = 'msal.idtoken';

  protected authSettings = Config.AUTH_SETTINGS;

  /**
   * Token info.
   */
  private expiresIn: number;
  private authTime: number;
  private interval: number;

  constructor(protected jwtHelper: JwtHelper,
    protected userService: UserService) {
  }

  protected getAuthority(policy: Policy): string {
    let policyName: string;
    switch (policy) {
      case Policy.sign:
        policyName = this.authSettings.signPolicy;
        break;
      case Policy.editProfile:
        policyName = this.authSettings.editProfilePolicy;
        break;
      case Policy.passwordReset:
        policyName = this.authSettings.passwordRestPolicy;
        break;
    }
    return `https://login.microsoftonline.com/tfp/${this.authSettings.tenantName}/${policyName}`;
  }

  /**
   * Checks for presence of token and that token hasn't expired.
   */
  protected accessTokenNotExpired(): boolean {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY); // window.sessionStorage.getItem(MSAL_ID_TOKEN_KEY);
    return tokenNotExpired(null, token);
  }

  protected idTokenNotExpired(): boolean {
    const token = window.sessionStorage.getItem(this.MSAL_ID_TOKEN_KEY);
    return tokenNotExpired(null, token);
  }

  protected getExpiryDate(): Date {
    // check id token is enougth,
    // because it will try to refresh accesstoken after
    const token = window.sessionStorage.getItem(this.MSAL_ID_TOKEN_KEY);
    if (token == null) { return null; }
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  protected cleanCache() {
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.USER_INFO_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}
