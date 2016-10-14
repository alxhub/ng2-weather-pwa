import {AppShellModule} from '@angular/app-shell';
import {ModuleWithProviders, NgModule, Injectable} from '@angular/core';
import {UniversalModule, parseDocument} from 'angular2-universal/node';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {AppModule} from './app';
import {RootComponent} from './root';
import {WeatherAPI} from './weather/api';
import {CITIES} from './weather/cities';
import {Storage, InMemoryStorage} from './storage';

@Injectable()
export class FakeWeatherApi implements WeatherAPI {

  fetchCities(): Observable<any> {
    return Observable.of(CITIES);
  }

  fetchCity(city: string): Observable<any> {
    return Observable.of({});
  }
}

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
  providers: [
    {provide: WeatherAPI, useClass: FakeWeatherApi},
    {provide: Storage, useClass: InMemoryStorage},
  ],
})
export class AppUniversalModule {}