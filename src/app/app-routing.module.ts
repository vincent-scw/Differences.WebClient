import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    { path: '', redirectTo: 'questions', pathMatch: 'full' },
    { path: 'oauth2/:type', component: AuthComponent },
    { path: 'notfound', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
