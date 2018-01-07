import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { AuthProviderBase } from './auth-provider-base';

export class MicrosoftAuthProvider extends AuthProviderBase {
  public type = 'microsoft';
  constructor(private authService: AuthService) {
    super();
  }

  public signIn() {
    const clientId = environment.microsoft.clientId;
    const redirect_uri = environment.microsoft.redirectUrl;
    const scope = environment.microsoft.scope;
    const state = environment.state;
    window.location.href = 'https://login.live.com/oauth20_authorize.srf?'
      + `response_type=code`
      + `&client_id=${clientId}`
      + `&scope=${scope}`
      + `&state=${state}`
      + `&redirect_uri=${redirect_uri}`;
  }
}
