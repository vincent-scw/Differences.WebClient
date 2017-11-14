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
  title: string;
  content: string;

  constructor(private questionService: QuestionService,
    private router: Router,
    private dialogRef: MdDialogRef<AskQuestionComponent>) {}

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.questionService.askQuestion(
      values.title,
      values.content,
      1 // TODO: categoryId
    )
    .subscribe(({ data }) => {
      this.router.navigateByUrl('/questions');
      this.dialogRef.close();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
