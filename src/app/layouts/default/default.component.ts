import { Subscription, combineLatest } from 'rxjs';
import { AutoUnsubscribe } from '@bixi/core/utils';
import { ConfigService } from '@services/config.service';
import { Component, OnInit } from '@angular/core';
import { IMenu } from '@bixi/core/layout';
import { BixiACService } from '@bixi/ac';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']

})
export class LayoutDefaultComponent implements OnInit {
  logoSmall = '';
  logoLarge = '';
  menus: IMenu[] = [];
  subscription = new Subscription();
  open = true;
  fullscreen = false;
  constructor(
    private configService: ConfigService,
    private acService: BixiACService
  ) {
  }

  formatMenus(menus: (IMenu & { requireAuth?: string })[], permissions: string[]) {
    return menus.map(menu => {
      const children = (menu.children && menu.children.length) ? this.formatMenus(menu.children, permissions) : [];
      return {
        ...menu,
        children,
        _visible: menu.requireAuth ? this.acService.ac(menu.requireAuth) : true
      };
    })
      .filter(menu => menu._visible)
      .filter(menu => (menu.link || menu.children.length));
  }

  ngOnInit() {
    this.subscription.add(this.configService.settings$$.subscribe((settings) => {
      this.logoSmall = settings.menu.logoSmall;
      this.logoLarge = settings.menu.logoLarge;
    }));
    this.subscription.add(combineLatest([this.configService.menus$$, this.acService.permissions$])
      .subscribe(([menus, permissions]) => {
        this.menus = this.formatMenus(menus, permissions);
      })
    );
  }
}
