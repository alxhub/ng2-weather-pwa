import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

const WEATHER_URL = (path = '') => `https://publicdata-weather.firebaseio.com/${path}.json`;

const getJSON = url => {
  return new Observable(observer => {
    let xhr = new XMLHttpRequest();

    let onReadyStateChange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          observer.next(JSON.parse(xhr.response));
          observer.complete();
          return;
        }
        observer.error(xhr.response);
      }
    }
    let onError = (err) => observer.error(err);
    xhr.addEventListener('readystatechange', onReadyStateChange);
    xhr.addEventListener('error', onError);
    xhr.open('GET', url);
    xhr.send();
    return _ => {
      xhr.addEventListener('readystatechange', onReadyStateChange);
      xhr.addEventListener('error', onError);
      xhr.abort();
    }
  });
}

@Injectable()
export class WeatherAPI {
  fetchCities(){
    return getJSON(`${WEATHER_URL()}?sparse=true`);
  }
  fetchCity(cityName){
    return getJSON(WEATHER_URL(cityName));
  }
}
