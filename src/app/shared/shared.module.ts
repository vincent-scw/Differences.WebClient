import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { ApolloModule } from 'apollo-angular';
import { AvatarModule } from 'ngx-avatar';

import { EasyQuillEditorComponent } from './ez-quill-editor';
import { provideClient } from '../services/apollo-client.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        QuillEditorModule,
        AvatarModule,
        ApolloModule.forRoot(provideClient)
    ],
    declarations: [
      EasyQuillEditorComponent
    ],
    exports: [
        HttpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        QuillEditorModule,
        AvatarModule,
        ApolloModule,
        EasyQuillEditorComponent
    ]
})

export class SharedModule { }
