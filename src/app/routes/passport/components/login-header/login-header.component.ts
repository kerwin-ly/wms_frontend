import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '@services';
import { $storage } from '@utils';
import { LANG } from '@constants';
import { AutoUnsubscribe } from '@bixi/core/utils';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'passport-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginHeaderComponent {
  logo: string;
  langList = [
    {
      text: '简体中文',
      value: LANG.zh
    },
    {
      text: 'English',
      value: LANG.en
    }
  ];
  lang = $storage.lang;

  subscription = new Subscription();
  constructor(
    configService: ConfigService
  ) {
    this.subscription.add(configService.settings$$.subscribe((settings) => {
      this.logo = settings.login.header.logo;
    }));
  }

  onSwitchLang() {
    $storage.lang = this.lang;
    window.location.reload();
  }
}
