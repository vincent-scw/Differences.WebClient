import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApolloQueryObservable } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { ArticleService } from '../services/article.service';
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
    private intermediaryService: IntermediaryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.intermediaryService.onLoading();
    this.route.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.articleService.getArticle(this.id)
        .subscribe(({data}) => {
          this.article = data.article;
          this.intermediaryService.onLoaded(defaultLoadedObject());

          this.articleService.getArticleAnswers(this.id)
            .subscribe((ret) => {
              this.isCommentsLoading = ret.loading;
              this.comments = ret.data;
              this.isEmpty = this.comments.article_comments == null
                || this.comments.article_comments.length === 0;
          });
        })
      );
  }

  onUpdate(data: any): void {
    alert(JSON.stringify(data));
  }

  submitComment(): void {
    this.articleService.submitComment(this.id, null, this.myCommentContent)
      .subscribe((data) => {
        this.myCommentContent = null;
      });
  }
}
