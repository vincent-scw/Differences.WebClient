import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';

import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html'
})

export class AskQuestionComponent implements OnInit {
  constructor(private questionService: QuestionService,
    private router: Router,
    private dialogRef: MdDialogRef<AskQuestionComponent>) {}

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.questionService.askQuestion(
      values.title,
      values.content,
      values.category
    )
    .subscribe(({ data }) => {
      this.router.navigateByUrl('/questions');
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
