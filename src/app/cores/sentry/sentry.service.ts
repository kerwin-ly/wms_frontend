import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '@environments/environment';
import { ISafeAny } from '@models';

@Injectable()
export class SentryService implements ErrorHandler {
  handleError(err: ISafeAny): void {
    console.error(err);
    const sentry = window._sentry;
    if (sentry && sentry.captureException && environment.production) {
      console.log('report error...');
      sentry.captureException(err.originalError || err);
    }
  }
}
