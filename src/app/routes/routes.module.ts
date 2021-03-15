import { NgModule } from '@angular/core';
import { RouteRoutingModule } from './routes-routing.module';
import { RoutePreloadStrategy } from '@cores/preload';

@NgModule({
  imports: [
    RouteRoutingModule
  ],
  providers: [
    RoutePreloadStrategy
  ]
})
export class RoutesModule { }
