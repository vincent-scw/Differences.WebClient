import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { IntermediaryService } from '../services/intermediary.service';

import { AskQuestionComponent } from '../questions/ask-question.component';
import { WriteArticleComponent } from '../articles/write-article.component';

@Component({
  selector: 'app-scrollable-top-bar',
  templateUrl: './scrollable-top-bar.component.html'
})

export class ScrollableTopBarComponent {
  constructor(private dialog: MdDialog,
    private location: Location,
    private intermediaryService: IntermediaryService) {

  }

  askQuestion(): void {
    this.dialog.open(AskQuestionComponent, {
    });
  }

  writeArticle(): void {
    this.dialog.open(WriteArticleComponent, {});
  }

  goBack(): void {
    this.location.back();
  }

  refresh(): void {
    this.intermediaryService.onRefresh();
  }
}
