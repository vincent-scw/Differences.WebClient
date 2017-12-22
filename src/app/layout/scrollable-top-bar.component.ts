import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { IntermediaryService } from '../services/intermediary.service';
import { AuthService } from '../services/auth.service';

import { AskQuestionComponent } from '../questions/ask-question.component';

@Component({
  selector: 'app-scrollable-top-bar',
  templateUrl: './scrollable-top-bar.component.html'
})

export class ScrollableTopBarComponent {
  constructor(private dialog: MatDialog,
    private location: Location,
    private intermediaryService: IntermediaryService,
    private authService: AuthService,
    private router: Router) {

  }

  askQuestion(): void {
    this.authService.forceAuthenticated(() => this.dialog.open(AskQuestionComponent, {}));
  }

  home(): void {
    this.router.navigateByUrl('/questions');
  }

  goBack(): void {
    this.location.back();
  }

  refresh(): void {
    this.intermediaryService.onRefresh();
  }
}
