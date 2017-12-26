import { Config } from '../../config';
import { UserAgentApplication } from 'msal/lib-commonjs/UserAgentApplication';
import { IntermediaryService } from '../intermediary.service';

export enum Policy {
  sign,
  editProfile,
  passwordReset
}

export abstract class AccountBase {
  protected authSettings = Config.AUTH_SETTINGS;
  authority: string;
  clientApplication: UserAgentApplication;

  constructor(policy: Policy,
    intermediaryService: IntermediaryService) {
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
    this.authority = 'https://login.microsoftonline.com/tfp/'
      + this.authSettings.tenantName + '/'
      + policyName;

    this.clientApplication = new UserAgentApplication(
      this.authSettings.clientId, this.authority,
      (errorDesc: string, token: string, error: string, tokenType: string) => {
        console.warn(tokenType);
        // Called after loginRedirect or acquireTokenPopup
        if (error != null && error !== '') {
          intermediaryService.onError(error);
        }
      },
      { redirectUri: Config.DEFAULT_REDIRECT_URL }
    );
  }
}
