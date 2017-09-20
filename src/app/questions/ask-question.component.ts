import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubmitQuestionService } from '../services/submit-question.service';

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

  constructor(private submitQuestionService: SubmitQuestionService) {}

  ngOnInit() {
    // this.editorContent = '<h3>I am Example content</h3>';
  }

  onSubmit(): void {
    this.submitQuestionService.submitQuestion(
      this.titleCtrl.value,
      this.editorContent.value
    )
    .subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
