import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './pages/store-list/store-list.component';
import { BasicModule } from '@modules/basic/basic.module';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { SharedModule } from '@modules/shared/shared.module';
import { BixiModule } from '@modules/bixi/bixi.module';
import { StoreInComponent } from './pages/store-in/store-in.component';
import { BatchComponent } from './components/batch/batch.component';
import { StoreOutComponent } from './pages/store-out/store-out.component';
import { StoreHistoryComponent } from './pages/store-history/store-history.component';
import { StoreOutDetailComponent } from './components/store-out-detail/store-out-detail.component';
import { StoreInDetailComponent } from './components/store-in-detail/store-in-detail.component';

@NgModule({
  declarations: [
    StoreListComponent,
    StoreInComponent,
    BatchComponent,
    StoreOutComponent,
    StoreHistoryComponent,
    StoreInDetailComponent,
    StoreOutDetailComponent
  ],
  imports: [CommonModule, BasicModule, BixiModule, WarehouseRoutingModule, SharedModule]
})
export class WarehouseModule {}
