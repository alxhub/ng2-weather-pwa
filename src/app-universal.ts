import {AppShellModule} from '@angular/app-shell';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {UniversalModule, parseDocument} from 'angular2-universal/node';

import {AppModule} from './app';
import {RootComponent} from './root';

@NgModule({
  bootstrap: [RootComponent],
  imports: [
    AppShellModule.prerender(),
    AppModule,
    UniversalModule.withConfig({
      originUrl: 'http://localhost:8080',
      requestUrl: '/',
    }) as any as ModuleWithProviders,
  ],
})
export class AppUniversalModule {}