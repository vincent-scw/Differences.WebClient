import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { NavigationNode } from './models/navigation.model';
import { Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError } from '@angular/router';
import { IntermediaryService } from './services/intermediary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isOpened = true;
  isFetching: boolean;

  constructor(
    private intermediaryService: IntermediaryService,
    private router: Router,
    private titleService: Title,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.router.events.filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        this.titleService.setTitle('有什么不同');
      });

    this.intermediaryService.loadingState.subscribe(
      (loadingObj: any) => {
        this.isFetching = loadingObj.isLoading;
    });

    this.intermediaryService.error.subscribe((errorMsg: string) => {
      this.snackBar.open(errorMsg, 'OK');
    });

    this.intermediaryService.warning.subscribe((warning: string) => {
      this.snackBar.open(warning, null, { duration: 2000 });
    });
  }
}
