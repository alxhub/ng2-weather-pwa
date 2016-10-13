import {AppShellModule} from '@angular/app-shell'
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppModule} from './app';
import {RootComponent} from './root';

@NgModule({
  bootstrap: [RootComponent],
  imports: [
    BrowserModule,
    AppShellModule.runtime(),
    AppModule,
  ],
})
export class AppBrowserModule {}