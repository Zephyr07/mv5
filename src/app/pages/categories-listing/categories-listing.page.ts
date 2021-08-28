import { Component, OnInit } from '@angular/core';
import {ApiProvider} from '../../providers/api/api';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-categories-listing',
  templateUrl: './categories-listing.page.html',
  styleUrls: ['./categories-listing.page.scss'],
})
export class CategoriesListingPage implements OnInit {
    private categories: any = [];
    private nom = '';
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider,
        private loadingCtrl: LoadingController
    ) {

    }

    ngOnInit() {
      this.getCategories();
    }

    openOffreByCategories(o){
        const navigationExtra: NavigationExtras = { state: { categories: { id: o.id, nom: o.nom} } };
        this.router.navigateByUrl('categories-detail', navigationExtra);
    }

    async getCategories(){
        const loading = await this.loadingCtrl.create({
            message: 'Chargement des catégories...'
        });
        loading.present();
        this.api.Categories.getList({statut: 'active', parent_id: 999999999, should_paginate: false, _sort: 'nom', _sortDir: 'asc'}).subscribe(d => {
            this.categories = d;
            loading.dismiss();
        }, e => {
            console.log(e);
            loading.dismiss();
        });
    }


}
