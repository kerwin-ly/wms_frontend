import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AutoUnsubscribe } from '@bixi/core/utils';
import { ConfigService } from '@services';
import { Subscription } from 'rxjs';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'passport-login-footer',
  templateUrl: './login-footer.component.html',
  styleUrls: ['./login-footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFooterComponent {
  subscription = new Subscription();
  links = [];
  copyright = '';
  constructor(
    configService: ConfigService
  ) {
    this.subscription.add(configService.settings$$.subscribe((settings) => {
      this.links = settings.login.footer.links;
      this.copyright = settings.login.footer.copyright;
    }));
  }
}
