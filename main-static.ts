import {platformBrowser} from '@angular/platform-browser';
import {AppBrowserModuleNgFactory} from './ngfactory/src/app-browser.ngfactory';

platformBrowser().bootstrapModuleFactory(AppBrowserModuleNgFactory);
