import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffreListingPage } from './offre-listing.page';

const routes: Routes = [
  {
    path: '',
    component: OffreListingPage
  },
  {
    path: 'offre-prix/:id/:nom',
    loadChildren: () => import('../offre-prix/offre-prix.module').then(m => m.OffrePrixPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreListingPageRoutingModule {}
