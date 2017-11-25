import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html'
})

export class WriteArticleComponent implements OnInit {
  title: string;
  content: string;

  constructor(private articleService: ArticleService,
    private router: Router,
    private dialogRef: MdDialogRef<WriteArticleComponent>) {}

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.articleService.submitArticle(
      values.title,
      values.content,
      1 // TODO: categoryId
    )
    .subscribe(({ data }) => {
      this.router.navigateByUrl('/articles');
      this.dialogRef.close();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
