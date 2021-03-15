import { Component } from '@angular/core';
import { BixiACService } from '@bixi/ac';
import { Subscription } from 'rxjs';
import { AuthService } from '@services';
import { AutoUnsubscribe } from '@bixi/core/utils';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'setting-permissions-page',
  templateUrl: './permissions.component.html'
})
export class PermissionsPageComponent {
  subscription = new Subscription();
  allPermissions = [
    'user.view',
    'user.create',
    'user.edit',
    'user.delete'
  ];

  checkedPermissions = [];

  constructor(
    private authService: AuthService,
    private acService: BixiACService
  ) {
    this.subscription.add(this.acService.permissions$.subscribe((permissions) => {
      this.checkedPermissions = permissions;
    }));
  }

  onChecked(checked: boolean, permission: string) {
    if (checked) {
      this.checkedPermissions = [
        ...this.checkedPermissions,
        permission
      ];
    } else {
      this.checkedPermissions = this.checkedPermissions.filter(p => p !== permission);
    }
    this.authService.setPermissions(this.checkedPermissions);
  }
}
