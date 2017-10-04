import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ApolloQueryObservable } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html'
})

export class QuestionDetailComponent implements OnInit {
  question: any;
  id: number;

  titleCtrl = new FormControl();
  editorContent = new FormControl();
  editorOptions = {
    readOnly: true,
    modules: {
      toolbar: false
    }
  };

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: Params) => this.id = params.get('id'))
      .subscribe(() => this.questionService.getQuestion(this.id)
        .subscribe(({data}) => {
          this.question = data.question;
          // this.editorContent = data.question.content;
        })
      );
  }

  goBack(): void {
    this.location.back();
  }
}
