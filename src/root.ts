import {Component, Renderer, ViewChild, QueryList, ElementRef, AfterViewInit, NgZone, ApplicationRef} from '@angular/core'

import {WeatherData} from './weather/data'
import 'rxjs/add/operator/do';

@Component({
  moduleId: module.id,
	selector: 'ngw-root',
	templateUrl: './root.html',
	styleUrls: ['./root.css'],
})
export class RootComponent {
  viewState = {}
  cities = [];
  constructor(public weatherData:WeatherData){
    weatherData.cities
      .do(cities => console.log('cities', cities))
      .subscribe((cities: any[]) => this.cities = cities);
  }

  showPicker(){
    this.setDialogState(true);
  }
  addCity(city){
    this.setDialogState(false);
    this.weatherData.addCity(city);
  }
  onCancel(event){
    this.setDialogState(false);
  }
  refresh(){
    this.weatherData.refreshData();
  }
  private setDialogState(show:boolean){
    this.viewState['dialog-container--visible'] = show;
  }
}