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
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then((m) => m.WarehouseModule)
      },
      {
        path: 'goods',
        loadChildren: () => import('./goods/goods.module').then((m) => m.GoodsModule)
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
