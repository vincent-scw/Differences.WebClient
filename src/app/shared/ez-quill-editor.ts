import { Component,
  OnInit,
  Input,
  forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ez-quill-editor',
  template: `
  <quill-editor class="form-control"
    [(ngModel)]="value" [options]="editorOptions"
    (blur)="onBlur()"
    (change)="onChange()">
  </quill-editor>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EasyQuillEditorComponent),
    multi: true
  }]
})

export class EasyQuillEditorComponent implements OnInit, ControlValueAccessor {
  @Input() readOnly: boolean;

  private innerValue: string;

  editorOptions: any;
  onModelChange: Function = (_: any) => {};
  onModelTouched: Function = () => {};

  ngOnInit() {
    this.editorOptions = {
      theme: 'snow',
      readOnly: this.readOnly,
      placeholder: '写点什么...',
      modules: {
        toolbar: this.readOnly ? false : [
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
  }

  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onModelChange(this.innerValue);
    }
  }

  onBlur() {
    this.onModelTouched();
  }

  onChange() {
    this.onModelChange(this.innerValue);
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
