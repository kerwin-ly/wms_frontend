import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfigService } from '@services';
import { BixiLayoutService } from '@bixi/core/layout';
import { combineLatest } from 'rxjs';
import { ISafeAny } from '@models';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  template: `
    <bixi-progress id="root" position="fixed"></bixi-progress>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private modalService: NzModalService,
    private layoutService: BixiLayoutService,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    const events = this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd)
      );
    const settings = this.configService.settings$$;

    combineLatest([events, settings])
      .subscribe(([e, s]) => {
        this.layoutService.setPageTitle((titles = []) => {
          // 取最后一个面包屑的
          const appName = s.title;
          if (!titles.length) return appName;
          const lastTitle = titles[titles.length - 1].name;
          return lastTitle ? `${lastTitle} - ${appName}` : appName;
        });
        this.modalService.closeAll();
      });

    this.configService.settings$$.subscribe((s) => {
      console.warn('settings:', s);
      const icon = (document.querySelector('link[rel="icon"]') as ISafeAny);
      if (icon) {
        icon.href = s.favicon;
      }
    });
  }
}
