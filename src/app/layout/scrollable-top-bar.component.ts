import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IntermediaryService } from '../services/intermediary.service';

import { AskQuestionComponent } from '../questions/ask-question.component';

@Component({
  selector: 'app-scrollable-top-bar',
  templateUrl: './scrollable-top-bar.component.html'
})

export class ScrollableTopBarComponent {
  constructor(private dialog: MatDialog,
    private location: Location,
    private intermediaryService: IntermediaryService) {

  }

  askQuestion(): void {
    this.dialog.open(AskQuestionComponent, {
    });
  }

  goBack(): void {
    this.location.back();
  }

  refresh(): void {
    this.intermediaryService.onRefresh();
  }
}
