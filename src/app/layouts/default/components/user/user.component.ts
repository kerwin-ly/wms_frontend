import { Component, ChangeDetectorRef, Optional, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService, ConfigService, SiteTheme } from '@services';
import { TranslateService } from '@ngx-translate/core';
import { $storage } from '@utils';
import { LANG } from '@constants';
import { AutoUnsubscribe } from '@bixi/core/utils';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'layout-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  theme: SiteTheme = 'default';
  subscription: Subscription = new Subscription();
  username: string;
  visible: boolean;
  avatarSrc = './assets/images/layout/avatar.svg';
  focus = false;
  lang = $storage.lang;

  LANGS = [{
    text: '中文',
    value: LANG.zh
  }, {
    text: 'English',
    value: LANG.en
  }];

  constructor(
    private router: Router,
    @Optional() private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private renderer: Renderer2,
    public authService: AuthService,
    public configService: ConfigService,
    private i18n: TranslateService
  ) {
    this.subscription.add(this.authService.user$$.subscribe((user) => {
      this.username = user.username || '';
      this.cdr.markForCheck();
    }));
    this.subscription.add(this.configService.settings$$.subscribe(s => {
      this.avatarSrc = s.avatar;
      this.cdr.markForCheck();
    }));
    // init theme
    this.theme = $storage.theme;
    this.onThemeChange(this.theme);
  }

  onGotoProfile() {
    this.router.navigateByUrl('/account/profile');
  }

  onVisibleChange(visible: boolean) {
    this.focus = visible;
  }

  onSwitchLang(lang: string) {
    $storage.lang = lang;
    window.location.reload();
  }

  onLogout(): void {
    this.modalService.confirm({
      nzTitle: this.i18n.instant('layout.logout_confirm'),
      nzContent: this.i18n.instant('layout.logout_confirm_text'),
      nzOnOk: () => {
        this.authService.logout();
      }
    });
  }

  onThemeChange(theme: SiteTheme): void {
    this.theme = theme;
    this.configService.setTheme(theme);
    this.renderer.setAttribute(document.body, 'data-theme', theme);
    const dom = document.getElementById('site-theme');
    if (dom) {
      dom.remove();
    }
    $storage.theme = theme || 'default';
    if (theme !== 'default') {
      const el = document.createElement('link');
      el.type = 'text/css';
      el.rel = 'stylesheet';
      el.id = 'site-theme';
      el.href = `assets/${theme}.css`;
      document.body.append(el);
    }
  }
}
