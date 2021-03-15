import { SimpleGuard } from '@bixi/auth';
import { NgModule } from '@angular/core';
import { RoutePreloadStrategy } from '@cores/preload';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { LayoutDefaultComponent } from '@layouts/default/default.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    canActivateChild: [SimpleGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard/overview',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
          // preload: true,
          titleI18n: 'menu.chart'
        }
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
        data: {
          titleI18n: 'menu.list'
        }
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
        data: {
          titleI18n: 'menu.form'
        }
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule),
        data: {
          titleI18n: 'menu.setting'
        }
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
        data: {
          titleI18n: 'menu.account'
        }
      },
      {
        path: 'exception',
        loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule),
        data: {
          titleI18n: 'menu.exception'
        }
      }
    ]
  },
  {
    path: 'passport',
    loadChildren: () => import('./passport/passport.module').then((m) => m.PassportModule),
    data: {
      titleI18n: 'menu.login',
      preload: true
    }
  },
  {
    path: '**',
    redirectTo: '/exception/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      scrollPositionRestoration: 'top',
      preloadingStrategy: RoutePreloadStrategy
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
