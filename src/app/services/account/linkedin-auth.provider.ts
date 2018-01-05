import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { AuthProviderBase } from './auth-provider-base';

const AuthStateValue = 'BCEeFWf45A53sdfaef434';

export class LinkedInAuthProvider extends AuthProviderBase {
  constructor(private authService: AuthService) {
    super();
  }

  signIn() {
    const clientId = '81rqdvz8syhf8o';
    const redirect_uri = `${environment.selfUrl}/oauth2/linkedin`;
    const scope = 'r_basicprofile';
    const state = AuthStateValue;
    window.open('https://www.linkedin.com/uas/oauth2/authorization?'
      + 'response_type=code'
      + `&client_id=${clientId}`
      + `&redirect_uri=${redirect_uri}`
      + `&state=${state}&scope=${scope}`);
  }

  validateParams(params: Params): boolean {
    const state = params['state'];
    if (state != null && AuthStateValue) {
      const code = params['code'];
      if (code != null) {
        this.authService.authToken = code;
        return true;
      }
    }

    return false;
  }
}
