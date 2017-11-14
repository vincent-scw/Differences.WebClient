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
  comments: ApolloQueryObservable<any>;
  myCommentContent: string;

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

          this.comments = this.articleService.getArticleAnswers(this.id);
        })
      );
  }

  submitAnswer(): void {
    this.articleService.submitComment(this.id, null, this.myCommentContent)
      .subscribe((data) => {
        this.myCommentContent = null;
      });
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
