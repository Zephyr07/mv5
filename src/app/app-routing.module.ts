import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },*/
  {
    path: '',
    loadChildren: () => import('./pages/iniscreen/iniscreen.module').then( m => m.IniscreenPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'categories-listing',
    loadChildren: () => import('./pages/categories-listing/categories-listing.module').then( m => m.CategoriesListingPageModule)
  },{
    path: 'offre-listing',
    loadChildren: () => import('./pages/offre-listing/offre-listing.module').then( m => m.OffreListingPageModule)
  },
  {
    path: 'categories-detail',
    loadChildren: () => import('./pages/categories-detail/categories-detail.module').then( m => m.CategoriesDetailPageModule)
  },
  {
    path: 'offre-prix',
    loadChildren: () => import('./pages/offre-prix/offre-prix.module').then( m => m.OffrePrixPageModule)
  },
  {
    path: 'offre-detail',
    loadChildren: () => import('./pages/offre-detail/offre-detail.module').then( m => m.OffreDetailPageModule)
  },
  {
    path: 'marques-listing',
    loadChildren: () => import('./pages/marques-listing/marques-listing.module').then( m => m.MarquesListingPageModule)
  },
  {
    path: 'entreprise-listing',
    loadChildren: () => import('./pages/entreprise-listing/entreprise-listing.module').then( m => m.EntrepriseListingPageModule)
  },
  {
    path: 'type-entreprises',
    loadChildren: () => import('./pages/type-entreprises/type-entreprises.module').then( m => m.TypeEntreprisesPageModule)
  },
  {
    path: 'entreprise-detail',
    loadChildren: () => import('./pages/entreprise-detail/entreprise-detail.module').then( m => m.EntrepriseDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
