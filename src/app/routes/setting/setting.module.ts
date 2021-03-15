import { NgModule } from '@angular/core';
import { BasicModule } from '@modules/basic/basic.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PAGES } from './pages';
import { SERVICES } from './services';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  imports: [
    BasicModule,
    SettingRoutingModule,
    NzCheckboxModule,
    NzAlertModule
  ],
  declarations: [
    ...PAGES
  ],
  providers: [
    ...SERVICES
  ]
})
export class SettingModule { }
