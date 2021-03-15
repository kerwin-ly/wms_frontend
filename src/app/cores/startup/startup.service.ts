import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService, AuthService } from '@services';
import { loadSentry } from '@cores/sentry';
import { $storage } from '@utils';
import { environment } from '@environments/environment';
import { ISafeAny } from '@models';

@Injectable()
export class StartupService {
  constructor(
    private translate: TranslateService,
    private injector: Injector,
    private httpClient: HttpClient
  ) { }

  private viaHttp(resolve: ISafeAny, reject: ISafeAny) {
    const lang = $storage.lang;
    zip(
      this.httpClient.get(`assets/config/config-${lang}.json`))
      .pipe(
        catchError(([appData]) => {
          resolve(null);
          return [appData];
        })
      )
      .subscribe(
        ([appData]) => {
          const { sentry } = appData.settings;
          if (environment.production && sentry && sentry.open && sentry.dsn) {
            loadSentry(sentry.dsn);
          }
          this.translate.use(lang);
          const configService = this.injector.get(ConfigService);
          configService.setMenus(appData.menus);
          configService.setSettings(appData.settings);
          const authService = this.injector.get(AuthService);
          authService.setPermissions($storage.permissions);
          resolve();
        },
        error => {
          reject();
        }
      );
  }
  load(): Promise<ISafeAny> {
    return new Promise((resolve, reject) => {
      this.viaHttp(resolve, reject);
    });
  }
}
