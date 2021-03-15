import { NgModule } from '@angular/core';
import { FormContainerComponent, FormGroupTitleComponent } from './components';

@NgModule({
  declarations: [
    FormContainerComponent,
    FormGroupTitleComponent
  ],
  exports: [
    FormContainerComponent,
    FormGroupTitleComponent
  ]
})
export class FormUtilsModule { }
