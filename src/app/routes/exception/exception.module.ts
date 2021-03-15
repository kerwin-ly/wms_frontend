import { NgModule } from '@angular/core';
import { BasicModule } from '@modules/basic/basic.module';
import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { ExceptionRoutingModule } from './exception-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    BasicModule,
    NzButtonModule,
    ExceptionRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES
  ]
})
export class ExceptionModule { }
