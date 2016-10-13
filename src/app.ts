import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {RootComponent} from './root';
import {HomeRoute} from './home/route';

@NgModule({
  bootstrap: [RootComponent],
  declarations: [
    HomeRoute,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeRoute},
    ], {useHash: true}),
  ],
})
export class AppModule {}
