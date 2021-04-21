import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/goods-list/goods-list.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsDetailComponent } from './components/goods-detail/goods-detail.component';
import { BasicModule } from '@modules/basic/basic.module';
import { BixiModule } from '@modules/bixi/bixi.module';
import { SharedModule } from '@modules/shared/shared.module';
import { TypeListComponent } from './pages/type-list/type-list.component';
import { GoodsWrapperComponent } from './pages/goods-wrapper/goods-wrapper.component';
import { GoodsTypeDetailComponent } from './components/goods-type-detail/goods-type-detail.component';

@NgModule({
  declarations: [ListComponent, GoodsDetailComponent, TypeListComponent, GoodsWrapperComponent, GoodsTypeDetailComponent],
  imports: [CommonModule, GoodsRoutingModule, BasicModule, BixiModule, SharedModule]
})
export class GoodsModule {}
