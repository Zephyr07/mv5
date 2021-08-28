import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { ModalController, MenuController } from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private marques: any = [];
  private promotions: any = [];
  private typeEntreprises: any = [];
  public slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    speed : 2000,
    autoplay: true
  };
  constructor(
    private api: ApiProvider,
    private router: Router,
    private modalCtrl: ModalController,
    private menu: MenuController
  ) {
    this.menu.enable(true, 'custom');
    this.getMarques();
    this.getPromotions();
    this.getTypeEntreprises();
  }


  ngOnInit() {

  }

  getTypeEntreprises(){
    this.api.TypeEntreprises.getList({_sort: 'nom', _sortDir: 'asc', should_paginate: false}).subscribe(d => {
      this.typeEntreprises = d;
    });
  }

  getMarques(){
    const opt = {
      should_paginate : true,
      per_page: 4,
      statut : 'active',
      _sort: 'nom',
      _sortDir: 'asc'
    };
    this.api.Marques.getList(opt).subscribe(d => {
      this.marques = d;
    });
  }

  getPromotions(){
    const opt = {
      should_paginate : true,
      per_page: 4,
      statut : 'active',
      _sort: 'priorite',
      _sortDir: 'desc'
    };
    this.api.Promotions.getList(opt).subscribe(d => {
      this.promotions = d;
    });
  }

  marqueListing() {
    this.router.navigateByUrl('marques-listing');
  }

  openOffreByMarque(id, nom){
    const navigationExtra: NavigationExtras = { state: { marque: { id, nom} } };
    this.router.navigateByUrl('offre-listing', navigationExtra);
  }

  entreprisesListing(title, id) {
    const navigationExtra: NavigationExtras = { state: { type_entreprise: { title, id} } };
    this.router.navigateByUrl('entreprise-listing', navigationExtra);
  }

  promotionsLinsting() {
    this.router.navigateByUrl('promotion-listing');
  }

  async search() {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

}
