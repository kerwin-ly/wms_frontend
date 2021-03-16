import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsDetailComponent } from './components/goods-detail/goods-detail.component';
import { BasicModule } from '@modules/basic/basic.module';
import { BixiModule } from '@modules/bixi/bixi.module';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [ListComponent, GoodsDetailComponent],
  imports: [CommonModule, GoodsRoutingModule, BasicModule, BixiModule, SharedModule]
})
export class GoodsModule {}
