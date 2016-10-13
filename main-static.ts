import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from './ngfactory/src/app.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
