import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrepriseListingPage } from './entreprise-listing.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepriseListingPage
  },
  {
    path: 'entreprise-detail/:id',
    loadChildren: () => import('../entreprise-detail/entreprise-detail.module').then(m => m.EntrepriseDetailPageModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepriseListingPageRoutingModule {}
