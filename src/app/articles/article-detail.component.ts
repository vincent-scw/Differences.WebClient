import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { ArticleService } from '../services/article.service';
import { ArticleCommentService } from '../services/article-comment.service';
import { defaultLoadedObject,
  IntermediaryService } from '../services/intermediary.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html'
})

export class ArticleDetailComponent implements OnInit {
  article: any;
  id: number;
  comments: any;
  myCommentContent: string;
  isEmpty: boolean;
  isCommentsLoading = true;

  constructor(
    private articleService: ArticleService,
    private articleCommentService: ArticleCommentService,
    private intermediaryService: IntermediaryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.intermediaryService.onLoading();
    this.route.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.articleService.getArticle(this.id)
        .valueChanges
        .subscribe(({data}) => {
          this.article = data.article;
          this.intermediaryService.onLoaded(defaultLoadedObject());

          this.articleCommentService.getArticleAnswers(this.id)
            .valueChanges
            .subscribe((ret) => {
              this.isCommentsLoading = ret.loading;
              this.comments = ret.data.article_comments;
              this.isEmpty = this.comments == null
                || this.comments.length === 0;
          });
        })
      );
  }

  onUpdate(data: any): void {
    alert(JSON.stringify(data));
  }

  submitComment(): void {
    this.articleCommentService.submitComment(this.id, null, this.myCommentContent)
      .subscribe((data) => {
        this.myCommentContent = null;
      });
  }
}
