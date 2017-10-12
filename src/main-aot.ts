import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import 'hammerjs';

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
// import { environment } from './environments/environment';
// import { AppModule } from './app/app.module';
// import 'hammerjs';

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule);
