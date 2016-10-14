import {AppShellModule} from '@angular/app-shell';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RootComponent} from './root';
import {WeatherModule} from './weather';

@NgModule({
  bootstrap: [RootComponent],
  declarations: [
    RootComponent,
  ],
  imports: [
    AppShellModule,
    CommonModule,
    WeatherModule,
  ],
})
export class AppModule {}
