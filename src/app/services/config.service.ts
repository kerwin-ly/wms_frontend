import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ISettings } from '@models';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { $storage } from '@utils';
import { IMenu as IBixiMenu } from '@bixi/core/layout';

export type SiteTheme = 'default' | 'dark' | 'compact';

export type IMenu = IBixiMenu & { requireAuth?: string };

/*
  一般来说 laLayoutService 会依赖 AuthService 获取到最新的权限，然后拿到对应的视图配置
*/
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  theme: SiteTheme = 'default';
  theme$ = new ReplaySubject<SiteTheme>(1);
  private settings$ = new BehaviorSubject<ISettings>($storage.settings);
  public settings$$ = this.settings$.pipe(
    filter((s) => !!s),
    distinctUntilChanged()
  );

  public menus$ = new BehaviorSubject<IMenu[]>($storage.menus);

  public menus$$ = this.menus$.pipe(
    filter((s) => !!s),
    distinctUntilChanged()
  );

  setSettings(settings: ISettings) {
    $storage.settings = settings;
    this.settings$.next(settings);
  }

  setMenus(menus: IMenu[]) {
    $storage.menus = menus;
    this.menus$.next(menus);
  }

  setTheme(theme: SiteTheme): void {
    this.theme = theme;
    this.theme$.next(theme);
  }
}
