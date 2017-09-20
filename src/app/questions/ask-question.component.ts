import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html'
})

export class AskQuestionComponent implements OnInit {
  model: any = {};
  private editorContent = new FormControl();
  private editorOptions = {
    theme: 'bubble',
    placeholder: '输入问题的描述...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  constructor() {}

  ngOnInit() {
    // this.editorContent = '<h3>I am Example content</h3>';
  }

  onSubmit(): void {
    alert(JSON.stringify(this.editorContent.value));
  }
}
