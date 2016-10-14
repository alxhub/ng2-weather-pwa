import {AppShellModule} from '@angular/app-shell'
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppModule} from './app';
import {RootComponent} from './root';
import {WeatherAPI} from './weather/api';
import {Storage, LocalStorage} from './storage';

@NgModule({
  bootstrap: [RootComponent],
  imports: [
    BrowserModule,
    AppShellModule.runtime(),
    AppModule,
  ],
  providers: [
    WeatherAPI,
    {provide: Storage, useClass: LocalStorage},
  ]
})
export class AppBrowserModule {}