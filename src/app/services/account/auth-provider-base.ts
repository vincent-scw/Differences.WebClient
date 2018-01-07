import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

export abstract class AuthProviderBase {
  public abstract get type(): string;
  public abstract signIn();
  public abstract validateParams(params: Params): string;
}
