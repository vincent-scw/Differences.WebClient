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
  titleCtrl = new FormControl();
  editorContent = new FormControl();
  editorOptions = {
    theme: 'snow',
    placeholder: '输入问题的描述...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  constructor(private questionService: QuestionService,
    private router: Router,
    private dialogRef: MdDialogRef<AskQuestionComponent>) {}

  ngOnInit() {
  }

  onSubmit(): void {
    this.questionService.submitQuestion(
      this.titleCtrl.value + '有什么不同？',
      this.editorContent.value,
      1 // TODO: categoryId
    )
    .subscribe(({ data }) => {
      this.router.navigateByUrl('/questions');
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
