import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffrePrixPage } from './offre-prix.page';

const routes: Routes = [
  {
    path: '',
    component: OffrePrixPage
  },
  {
    path: 'offre-detail',
    loadChildren: () => import('../offre-detail/offre-detail.module').then(m => m.OffreDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffrePrixPageRoutingModule {}
