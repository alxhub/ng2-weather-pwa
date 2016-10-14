import {Component, Input} from '@angular/core'

export interface CurrentConditions {
  icon: string;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface City {
  currently:CurrentConditions;
  daily:any;
  flags:any;
  name:string;
}

@Component({
  moduleId: module.id,
	selector: 'weather-card',
	templateUrl: './weather-card.html',
	styleUrls: ['./weather-card.css'],
})
export class WeatherCard {
 name:string;
 time: Date;
 icon: any;
 temperature: number;
 apparentTemp: number;
 loading: boolean = false;
 summary: string;
 probability: number;
 humidity: number;
 windSpeed: number;
 windBearing:string;
 forecast: any[];

 @Input() set city(city){
   this.name = city.name;
   if(city['currently']){
     this.updateConditions(city);
   }
 };

 private updateConditions(city){
   this.time = new Date(city['currently']['time'] * 1000);
   this.icon = city['currently'].icon;
   this.temperature = Math.round(city['currently']['temperature']);
   this.apparentTemp = Math.round(city['currently']['apparentTemperature']);
   this.summary = city['currently']['summary'];
   this.probability = city['currently']['precipProbability'] * 100;
   this.humidity = city['currently']['humidity'] * 100;
   this.windSpeed = city['currently']['windSpeed'];
   this.windBearing = city['currently']['windBearing'];

   this.forecast = city['daily']['data']
     .filter((day, i) => i < 7)
     .map((day,i) => {
       let time = new Date(day['time'] * 1000);
       day.day = daysOfWeek[time.getDay()];
       day.max = Math.round(day['temperatureMax']);
       day.min = Math.round(day['temperatureMin']);
       return day;
     });

 }
}
