import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesListingPage } from './categories-listing.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListingPage,
  },
  {
    path: 'categories-detail/:id/:nom',
    loadChildren: () => import('../categories-detail/categories-detail.module').then(m => m.CategoriesDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesListingPageRoutingModule {}
