import { Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ez-quill-editor',
  templateUrl: './ez-quill-editor.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EasyQuillEditorComponent),
    multi: true
  }]
})

export class EasyQuillEditorComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() readOnly: boolean;

  private innerValue: string;

  editorOptions = {
    theme: 'snow',
    placeholder: '写点什么...',
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

  onModelChange: Function = (_: any) => {};
  onModelTouched: Function = () => {};

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

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
