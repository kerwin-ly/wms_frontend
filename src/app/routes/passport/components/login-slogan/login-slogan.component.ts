import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '@services';
import { AutoUnsubscribe } from '@bixi/core/utils';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'passport-login-slogan',
  templateUrl: './login-slogan.component.html',
  styleUrls: ['./login-slogan.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginSloganComponent {
  title = '';
  items = [];
  subscription = new Subscription();

  constructor(
    configService: ConfigService
  ) {
    this.subscription.add(configService.settings$$.subscribe((settings) => {
      this.title = settings.login.main.slogan.title;
      this.items = settings.login.main.slogan.items;
    }));
  }
}
