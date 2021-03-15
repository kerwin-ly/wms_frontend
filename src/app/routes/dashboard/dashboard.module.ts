import { NgModule } from '@angular/core';
import { BasicModule } from '@modules/basic/basic.module';
import { PAGES } from './pages';
import { SERVICES } from './services';
import { COMPONENTS } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BixiChartModule } from '@bixi/chart';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  imports: [
    BasicModule,
    NzCardModule,
    NzIconModule,
    NzSkeletonModule,
    NzDatePickerModule,
    NzGridModule,
    DashboardRoutingModule,
    BixiChartModule
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  providers: [
    ...SERVICES
  ]
})
export class DashboardModule { }
