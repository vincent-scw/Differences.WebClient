import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { QuestionsModule } from './questions/questions.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';

import { AuthService } from './services/auth.service';
import { IdentityService } from './services/identity.service';
import { BrowserStorage } from './services/browser-storage.service';
import { ApiClientService } from './services/api-client.service';

import { AppComponent } from './app.component';

// angular2-jwt config for JiT and AoT compilation.
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// Set tokenGetter to use the same storage in AuthenticationService.Helpers.
export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
      noJwtError: true,
      tokenGetter: (() => localStorage.getItem('access_token'))
  }), http);
}

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
    UsersModule,
    Ng2BreadcrumbModule.forRoot()
  ],
  providers: [
    Title,
    JwtHelper,
    AuthService,
    IdentityService,
    ApiClientService,
    BrowserStorage,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
