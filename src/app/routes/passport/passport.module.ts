import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { PassportRoutingModule } from './passport-routing.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { COMPONENTS } from './components';
import { SERVICES } from './services';
import { PAGES } from './pages';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BasicModule } from '@modules/basic/basic.module';

const ZORRO_MODULES = [
  NzDividerModule,
  NzButtonModule,
  NzInputModule,
  NzIconModule,
  NzCheckboxModule,
  NzAlertModule,
  NzFormModule,
  NzSelectModule
];

@NgModule({
  imports: [
    BasicModule,
    PassportRoutingModule,
    ...ZORRO_MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES
  ],
  providers: [
    ...SERVICES
  ]
})
export class PassportModule { }
