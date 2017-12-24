import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { ApolloModule } from 'apollo-angular';
import { AvatarModule } from 'ngx-avatar';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import 'moment/min/locales';

import { TitlePipe } from '../utlities/title.pipe';
import { NormalizeTitlePipe } from '../utlities/normalize-title.pipe';

moment.locale('zh-cn'); // Chinese

@NgModule({
    declarations: [
        TitlePipe,
        NormalizeTitlePipe
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
        ApolloModule
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
        TitlePipe,
        NormalizeTitlePipe
    ]
})

export class SharedModule { }
