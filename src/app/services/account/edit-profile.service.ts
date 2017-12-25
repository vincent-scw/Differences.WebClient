import { UserAgentApplication } from 'msal';
import { Inject, Injectable } from '@angular/core';

import { Config } from '../config';

@Injectable()
export class EditProfileService {
  authSettings = Config.AUTH_SETTINGS;

  authority: string = 'https://login.microsoftonline.com/tfp/'
    + this.authSettings.tenantName + '/'
    + this.authSettings.editProfilePolicy;
}
