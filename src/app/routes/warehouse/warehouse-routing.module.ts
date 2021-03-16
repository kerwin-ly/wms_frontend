import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreHistoryComponent } from './pages/store-history/store-history.component';
import { StoreInComponent } from './pages/store-in/store-in.component';
import { StoreListComponent } from './pages/store-list/store-list.component';
import { StoreOutComponent } from './pages/store-out/store-out.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'store'
  },
  {
    path: 'store',
    component: StoreListComponent
  },
  {
    path: 'in',
    component: StoreInComponent
  },
  {
    path: 'out',
    component: StoreOutComponent
  },
  {
    path: 'history',
    component: StoreHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule {}
