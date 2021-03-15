import { Subscription } from 'rxjs';
import { AuthService } from '@services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribe } from '@bixi/core/utils';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'account-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfilePageComponent implements OnInit {
  tabIdx = 1;
  form: FormGroup;
  subscription = new Subscription();

  constructor(
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = fb.group({
      username: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  ngOnInit() {
    this.subscription.add(this.authService.user$$.subscribe((user) => {
      this.form.patchValue({
        username: user.username
      });
    }));
  }
}
