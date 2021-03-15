import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '@models';
import { distinctUntilChanged } from 'rxjs/operators';
import { BIXI_SERVICE_TOKEN, ITokenService } from '@bixi/auth';
import { $storage } from '@utils';
import { BixiACService } from '@bixi/ac';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(BIXI_SERVICE_TOKEN) private tokenService: ITokenService,
    private router: Router,
    private acService: BixiACService
  ) {
  }

  private token$ = new BehaviorSubject<string>($storage.token);

  public token$$ = this.token$.pipe(
    distinctUntilChanged()
  );

  private user$ = new BehaviorSubject<IUser>($storage.user);
  public user$$ = this.user$.pipe(
    distinctUntilChanged()
  );

  setToken(token: string) {
    console.warn('Set Token');
    this.tokenService.set({
      token
    });
    $storage.token = token;
    this.token$.next(token);
  }

  clearToken() {
    console.warn('Clear Token');
    $storage.token = '';
    this.token$.next('');
  }

  setUser(user: IUser) {
    console.warn('Set User', user);
    $storage.user = user;
    this.user$.next(user);
  }

  clearUser() {
    console.warn('Clear User');
    const emptyUser = { username: '', account: '' };
    $storage.user = emptyUser;
    this.user$.next(emptyUser);
  }

  setPermissions(permissions: string[]) {
    console.warn('Set Permissions', permissions);
    $storage.permissions = permissions;
    this.acService.setPermissions(permissions);
  }

  clearPermissions() {
    console.warn('Clear Permissions');
    $storage.permissions = [];
    this.acService.clear();
  }

  clear() {
    console.warn('Clear Useless Data');
    this.clearToken();
    this.clearUser();
    this.clearPermissions();
    $storage.clear();
  }

  logout() {
    this.clear();
    this.router.navigateByUrl('/passport/login');
  }
}
