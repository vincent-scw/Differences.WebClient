import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { ControlsModule } from './controls/controls.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

import { AuthService } from './services/auth.service';
import { IntermediaryService } from './services/intermediary.service';
import { CategoryService } from './services/category.service';

import { AppComponent } from './app.component';
import { Config } from './config';
import { from } from 'apollo-link';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    SharedModule,
    ControlsModule,
    LayoutModule,
    QuestionsModule,
    UsersModule
  ],
  providers: [
    Title,
    JwtHelper,
    AuthService,
    IntermediaryService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    intermediaryService: IntermediaryService
  ) {
    const http = httpLink.create({uri: Config.GRAPHQL_API_ENDPOINT});

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('access_token');
      if (!token || !tokenNotExpired(null, token)) {
        return {};
      } else {
        if (headers == null) {
          headers = new HttpHeaders();
        }
        return {
          headers: headers.append('Authorization', `Bearer ${token}`)
        };
      }
    });

    const errorlink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          intermediaryService.onError(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        intermediaryService.onError(`[Network error]: ${JSON.stringify(networkError)}`);
      }
    });

    apollo.create({
      link: errorlink.concat(auth).concat(http),
      cache: new InMemoryCache({
        dataIdFromObject: object => {
          const o = object as any;
          if (o.__typename != null && o.id != null) {
            return `${o.__typename}_${o.id}`;
          }
        }
      }),
      ssrMode: true
    });
  }
}
