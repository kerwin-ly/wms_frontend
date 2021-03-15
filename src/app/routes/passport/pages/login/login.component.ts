import { Component } from '@angular/core';
import { AutoUnsubscribe } from '@bixi/core/utils';
import { ConfigService } from '@services';
import { Subscription } from 'rxjs';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'passport-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginPageComponent {
  style = {};

  subscription = new Subscription();
  constructor(
    configService: ConfigService
  ) {
    this.subscription.add(configService.settings$$.subscribe((settings) => {
      this.style = {
        'background-image': `url(${settings.login.main.background})`
      };
    }));
  }
}
