import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityPicker} from './city-picker';
import {WeatherCard} from './weather-card';
import {WeatherData} from './data';

export * from './city-picker';
export * from './weather-card';

export const WEATHER_COMPONENTS = [
    CityPicker,
    WeatherCard,
];

@NgModule({
  declarations: WEATHER_COMPONENTS,
  exports: WEATHER_COMPONENTS,
  imports: [
    CommonModule,
  ],
  providers: [
    WeatherData,
  ]
})
export class WeatherModule {}
