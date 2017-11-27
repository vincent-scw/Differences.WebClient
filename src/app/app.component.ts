import { Component, OnInit } from '@angular/core';

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
    private router: Router) {
  }

  ngOnInit() {
    this.intermediaryService.loadingState.subscribe(
      (loadingObj: any) => {
        this.isFetching = loadingObj.isLoading;
    });
  }

  getQuestionName(id: string): string {
    return '问题 ' + id;
  }

  getArticleName(id: string): string {
    return '文章 ' + id;
  }
}
