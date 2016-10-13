import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ngw-home',
  templateUrl: './route.html',
})
export class HomeRoute {

  prebootTest() {
    console.log('preboot test');
  }
}
