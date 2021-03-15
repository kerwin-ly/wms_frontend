import { NgModule } from '@angular/core';
import { BixiModule } from '@modules/bixi/bixi.module';
import { FormUtilsModule } from '@modules/form-utils/form-utils.module';
import { FormRoutingModule } from './form-routing.module';
import { PAGES } from './pages';
import { SERVICES } from './services';

@NgModule({
  imports: [
    BixiModule,
    FormUtilsModule,
    FormRoutingModule
  ],
  declarations: [
    ...PAGES
  ],
  providers: [
    ...SERVICES
  ]
})
export class FormModule { }
