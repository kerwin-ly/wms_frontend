import { NgModule } from '@angular/core';
import { PAGES } from './pages';
import { AccountService } from './services';
import { AccountRoutingModule } from './account-routing.module';
import { BasicModule } from '@modules/basic/basic.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  imports: [
    BasicModule,
    NzTabsModule,
    NzFormModule,
    AccountRoutingModule
  ],
  declarations: [
    ...PAGES
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
