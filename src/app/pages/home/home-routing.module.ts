import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'entreprise-listing/:id/:nom',
    loadChildren: () => import('../entreprise-listing/entreprise-listing.module').then(m => m.EntrepriseListingPageModule)
  },
  {
    path: 'marques-listing',
    loadChildren: () => import('../marques-listing/marques-listing.module').then(m => m.MarquesListingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
