import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarquesListingPage } from './marques-listing.page';

const routes: Routes = [
  {
    path: '',
    component: MarquesListingPage
  },
  {
    path: 'offre-listing/:type/:id/:nom',
    loadChildren: () => import('../offre-listing/offre-listing.module').then(m => m.OffreListingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarquesListingPageRoutingModule {}
