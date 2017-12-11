import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationNode } from '../models/navigation.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})

export class TopBarComponent {
  topMenuNodes: NavigationNode[] = [
    {
      title: '问题',
      tooltip: '提出与回答问题',
      url: 'questions'
    },
    // {
    //   title: '大神',
    //   tooltip: '大神们',
    //   url: 'users'
    // }
  ];

  constructor(private dialog: MatDialog,
    private location: Location) {

  }

  doSearch(data: any) {

  }
}
