import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPageComponent, DataAnalysisPageComponent } from './pages';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewPageComponent,
    data: {
      titleI18n: 'monitor.overview'
    }
  },
  {
    path: 'data-analysis',
    component: DataAnalysisPageComponent,
    data: {
      titleI18n: 'monitor.data_analysis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
