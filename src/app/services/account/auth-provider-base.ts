import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

export abstract class AuthProviderBase {
  public abstract signIn();
  public abstract validateParams(params: Params): boolean;
}
