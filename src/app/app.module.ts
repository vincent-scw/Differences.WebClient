import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { QuestionsModule } from './questions/questions.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';

import { AuthService } from './services/auth.service';
import { IntermediaryService } from './services/intermediary.service';
import { CategoryService } from './services/category.service';
import { BrowserStorage } from './services/browser-storage.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    QuestionsModule,
    ArticlesModule,
    UsersModule
  ],
  providers: [
    Title,
    JwtHelper,
    AuthService,
    IntermediaryService,
    CategoryService,
    BrowserStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
