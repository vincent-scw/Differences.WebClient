import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { AskQuestionComponent } from '../questions/ask-question.component';
import { WriteArticleComponent } from '../articles/write-article.component';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html'
})
export class TocComponent {
  constructor(private dialog: MdDialog) {

  }

  askQuestion(): void {
    this.dialog.open(AskQuestionComponent, {
    });
  }

  writeArticle(): void {
    this.dialog.open(WriteArticleComponent, {});
  }
}
