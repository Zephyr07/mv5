import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ApiProvider} from "../../providers/api/api";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.page.html',
  styleUrls: ['./categories-detail.page.scss'],
})
export class CategoriesDetailPage implements OnInit {

  private categories: any = [];
  private nom = '';
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private api: ApiProvider,
    private loadingCtrl: LoadingController
  ) {
    this.route.queryParams.subscribe(params => {
      const id = this.route.snapshot.paramMap.get('id');
      this.nom = this.route.snapshot.paramMap.get('nom');
      this.getCategories(id);
    });
  }

  ngOnInit() {
  }

  openOffreByCategories(o){
    const navigationExtra: NavigationExtras = { state: { categories: { id: o.id, nom: o.nom} } };
    this.router.navigateByUrl('offre-listing', navigationExtra);
  }

  async getCategories(id){
    const loading = await this.loadingCtrl.create({
      message: 'Chargement des catégories...'
    });
    loading.present();
    this.api.Categories.getList({statut: 'active', parent_id: id, should_paginate: false, _sort: 'nom', _sortDir: 'asc'}).subscribe(d => {
      this.categories = d;
      console.log(d);
      loading.dismiss();
    }, e => {
      console.log(e);
      loading.dismiss();
    });
  }


}
