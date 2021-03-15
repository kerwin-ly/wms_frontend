import { $storage } from '@utils';
import { Router } from '@angular/router';
import { AuthService } from '@services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { PassportService } from '@routes/passport/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { BIXI_SERVICE_TOKEN, ITokenService } from '@bixi/auth';

@Component({
  selector: 'passport-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMsg = '';
  errors = {
    account: false,
    password: false
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    public i18n: TranslateService,
    private authService: AuthService,
    private modalService: NzModalService,
    private passportService: PassportService,
    @Inject(BIXI_SERVICE_TOKEN) private tokenService: ITokenService
  ) {
    this.form = fb.group({
      account: [null, [Validators.required]],
      password: [null, Validators.required],
      remember: [null]
    });
  }

  get account() {
    return this.form.controls.account;
  }
  get password() {
    return this.form.controls.password;
  }
  get remember() {
    return this.form.controls.remember;
  }

  ngOnInit() {
    this.modalService.closeAll();
    this.form.patchValue({
      account: $storage.account,
      remember: $storage.rememberAccount === null ? true : $storage.rememberAccount
    });
  }

  onResetErrors() {
    this.errors = {
      account: false,
      password: false
    };
    this.errorMsg = '';
  }

  onSubmit() {
    this.account.markAsDirty();
    this.account.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.account.invalid) {
      this.errors.account = true;
      this.errorMsg = '账号为必填项';
      return;
    }
    if (this.password.invalid) {
      this.errors.password = true;
      this.errorMsg = '密码为必填项';
      return;
    }
    if (this.account.value !== 'bixi') {
      this.errors.account = true;
      this.errorMsg = '账号错误（试试 bixi/bixi）';
      return;
    }
    if (this.password.value !== 'bixi') {
      this.errors.password = true;
      this.errorMsg = '密码错误（试试 bixi/bixi）';
      return;
    }
    if (this.account.invalid || this.password.invalid) return;
    this.onResetErrors();
    this.loading = true;
    this.passportService
      .login({
        account: this.account.value,
        password: this.password.value
      })
      .subscribe(
        res => {
          this.loading = false;
          this.authService.setToken(res.token);
          this.authService.setUser(res.user);
          this.authService.setPermissions(res.permissions);
          $storage.account = this.remember.value ? this.account.value : null;
          $storage.rememberAccount = this.remember.value;
          this.router.navigateByUrl(this.tokenService.referrer.url || '/');
        },
        err => {
          this.loading = false;
          this.errors = {
            account: false,
            password: true
          };
          this.errorMsg = '账号或密码错误';
        }
      );
  }
}
