import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  Exception403Component,
  Exception404Component,
  Exception500Component
} from './pages';

const routes: Routes = [
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule {}
