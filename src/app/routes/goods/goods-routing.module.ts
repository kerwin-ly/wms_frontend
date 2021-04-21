import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/goods-list/goods-list.component';
import { GoodsWrapperComponent } from './pages/goods-wrapper/goods-wrapper.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: GoodsWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule {}
