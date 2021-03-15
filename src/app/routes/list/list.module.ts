import { NgModule } from '@angular/core';
import { BixiModule } from '@modules/bixi/bixi.module';
import { PAGES } from './pages';
import { PIPES } from './pipes';
import { SERVICES } from './services';
import { DIRECTIVES } from './directives';
import { COMPONENTS } from './components';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  imports: [
    BixiModule,
    ListRoutingModule
  ],
  declarations: [
    ...PAGES,
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  providers: [
    ...SERVICES
  ]
})
export class ListModule { }
