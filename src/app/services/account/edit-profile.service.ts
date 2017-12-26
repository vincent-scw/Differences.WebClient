import { UserAgentApplication } from 'msal';
import { Inject, Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { Config } from '../../config';
import { UserService } from '../user.service';
import { AccountBase, Policy } from './account-base.service';
import { IntermediaryService } from '../intermediary.service';

@Injectable()
export class EditProfileService extends AccountBase {
  private clientApplication: UserAgentApplication;
  constructor(protected jwtHelper: JwtHelper,
    protected userService: UserService,
    private intermediaryService: IntermediaryService) {
    super(Policy.editProfile, jwtHelper, userService);
  }

  edit() {
    
  }
}
