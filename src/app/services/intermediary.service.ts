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

  loadingState() {
    return this.loadingObj;
  }

  onLoaded(loadingObject: ILoadingObject) {
    this.loadingObj.next(loadingObject);
  }

  onLoading() {
    this.loadingObj.next({isLoading: true});
  }
}
