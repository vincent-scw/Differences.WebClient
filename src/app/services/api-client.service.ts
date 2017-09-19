import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import { Config } from '../config';
import { User } from '../models/user';

@Injectable() export class ApiClientService {
  private userChanged: Observable<User>;

  constructor(
    public http: Http,
    public authHttp: AuthHttp) {
  }

  public callAuth(path: string): Observable<Response> {
    return this.authHttp.get(Config.API_ENDPOINT + path);
  }
}
