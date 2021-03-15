import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ISafeAny } from '@models';

@Injectable({
  providedIn: 'root'
})
export class RoutePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<ISafeAny>): Observable<ISafeAny> {
    return route.data?.preload === true ? load() : of(null);
  }
}
