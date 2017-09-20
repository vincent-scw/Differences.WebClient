import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { ApolloModule } from 'apollo-angular';
import { AvatarModule } from 'ngx-avatar';

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
    exports: [
        HttpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        QuillEditorModule,
        AvatarModule,
        ApolloModule,
    ]
})

export class SharedModule { }
