import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsPageComponent  } from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'permissions'
  },
  {
    path: 'permissions',
    component: PermissionsPageComponent,
    data: {
      titleI18n: 'menu.setting_permissions'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
