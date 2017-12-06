import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IntermediaryService {
  private loadingObj = new Subject();
  private refreshObj = new Subject();
  private errorObj = new Subject();
  private warningObj = new Subject();

  get loadingState() {
    return this.loadingObj;
  }

  get refreshListener() {
    return this.refreshObj;
  }

  get error() {
    return this.errorObj;
  }

  get warning() {
    return this.warningObj;
  }

  onLoaded() {
    this.loadingObj.next({isLoading: false});
  }

  onLoading() {
    this.loadingObj.next({isLoading: true});
  }

  onRefresh() {
    this.refreshObj.next();
  }

  onError(errorMsg: string) {
    this.errorObj.next(errorMsg);
  }

  onWarning(message: string) {
    this.warningObj.next(message);
  }
}
