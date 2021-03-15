import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicFormPageComponent, StepFormPageComponent, GroupFormPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'basic-form'
  },
  {
    path: 'basic-form',
    component: BasicFormPageComponent,
    data: {
      titleI18n: 'form.basic_form'
    }
  },
  {
    path: 'step-form',
    component: StepFormPageComponent,
    data: {
      titleI18n: 'form.step_form'
    }
  },
  {
    path: 'group-form',
    component: GroupFormPageComponent,
    data: {
      titleI18n: 'form.group_form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
