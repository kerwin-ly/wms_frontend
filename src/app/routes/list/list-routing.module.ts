import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedListPageComponent, SimpleListPageComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'doc-list'
  },
  {
    path: 'simple-list',
    component: SimpleListPageComponent,
    data: {
      titleI18n: 'list.simple_list'
    }
  },
  {
    path: 'advanced-list',
    component: AdvancedListPageComponent,
    data: {
      titleI18n: 'list.advanced_list'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
