import {AppShellModule} from '@angular/app-shell';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {RootComponent} from './root';
import {HomeRoute} from './home/route';

@NgModule({
  declarations: [
    HomeRoute,
    RootComponent,
  ],
  imports: [
    AppShellModule,
    CommonModule,
    RouterModule.forRoot([
      {path: '', component: HomeRoute},
    ], {useHash: true}),
  ],
})
export class AppModule {}
