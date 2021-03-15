

import { APP_INITIALIZER } from '@angular/core';
import {  StartupService } from './startup.service';

function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export const STARTUP_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];

export {
  StartupService
};
