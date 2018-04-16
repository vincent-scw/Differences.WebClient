import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { QuestionService } from '../services/question.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html'
})

export class AskQuestionComponent implements OnInit {
  constructor(private questionService: QuestionService,
    private categoryService: CategoryService,
    private router: Router,
    private dialogRef: MatDialogRef<AskQuestionComponent>) { }

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.questionService.askQuestion(
      values.title,
      values.content,
      { id: values.categoryId, name: '' }
    ).subscribe();

    this.categoryService.setSelectedCategoryById(values.categoryId);
    this.router.navigateByUrl(`/questions?category=${values.categoryId}`);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
