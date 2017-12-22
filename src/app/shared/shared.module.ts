import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { ApolloModule } from 'apollo-angular';
import { AvatarModule } from 'ngx-avatar';
import { MomentModule } from 'angular2-moment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import * as moment from 'moment';
import 'moment/min/locales';

import { TitlePipe } from '../utlities/title.pipe';

moment.locale('zh-cn'); // Chinese

@NgModule({
    declarations: [
        TitlePipe
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        QuillEditorModule,
        AvatarModule,
        MomentModule,
        ApolloModule,
        MDBBootstrapModule.forRoot()
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
        MomentModule,
        MDBBootstrapModule,
        TitlePipe
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class SharedModule { }
