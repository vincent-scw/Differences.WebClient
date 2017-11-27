import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

interface ILoadingObject {
  isLoading: boolean;
  success: boolean;
  errorCode: string;
  errorMessage: string;
  data: any;
}

export function defaultLoadedObject(): ILoadingObject {
  return {
    isLoading: false,
    success: true,
    errorCode: null,
    errorMessage: null,
    data: {}
  };
}

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

  onLoaded(loadingObject: ILoadingObject) {
    this.loadingObj.next(loadingObject);
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
