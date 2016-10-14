import {Injectable} from '@angular/core'
import {CITIES} from './cities'
import {WeatherAPI} from './api'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/take'

import {Storage} from '../storage';

@Injectable()
export class WeatherData {
  allCities: any[];
  cities: BehaviorSubject<any[]>;
  actions = new Subject();
  constructor(private api:WeatherAPI, private storage: Storage){
    let savedData: any[] = this._getSavedState() || [{key: 'austin'}];
    this.cities = new BehaviorSubject(savedData);
    this.allCities = CITIES;
    this.actions
      .scan(this._updateState, savedData)
      .do(state => this._saveState(state))
      .forEach((state: any[]) => this.cities.next(state));

    this.refreshData();
  }

  addCity(key) {
    let city = this.allCities.find(c => c.key === key);
    this.actions.next({type: 'ADD_CITY', payload: city});
    this.getCityData(city)
      .map(payload => ({type: 'UPDATE_CITY', payload: payload}))
      .subscribe(action => this.actions.next(action));
  }
  private getCityData(city) {
    console.log(city['key'])
    return this.api.fetchCity(city['key'])
      .map(cityData => Object.assign({}, cityData, city));
  }
  deleteCity(key) {
    this.actions.next({type: 'DELETE_CITY', payload: key});
  }

  refreshData() {
    this.cities
      .take(1)
      .flatMap(cities => cities)
      .concatMap(city => this.getCityData(city))
      .map(payload => ({type: 'UPDATE_CITY', payload: payload}))
      .subscribe(action => this.actions.next(action))
  }

  private _saveState(state): void {
    this.storage.setItem('weather_data', JSON.stringify(state));
  }

  private _getSavedState(): any[] {
    return JSON.parse(this.storage.getItem('weather_data'));
  }

  private _updateState(state, action): any[] {
    switch (action.type) {
      case 'ADD_CITY':
        let exists = state.find(city => city.key === action.payload.key);
        if(exists){
          return state;
        }
        return state.concat([action.payload]);
      case 'DELETE_CITY':
        return state.filter(city => city.key !== action.payload);
      case 'UPDATE_CITY':
        return state.map(city => city.key === action.payload.key ? Object.assign({}, city, action.payload) : city);
      default:
        break;
    }
    return state;
  }
}