import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-type-entreprises',
  templateUrl: './type-entreprises.page.html',
  styleUrls: ['./type-entreprises.page.scss'],
})
export class TypeEntreprisesPage implements OnInit {

    private typeEntreprises: any = [];

    constructor(
        private api: ApiProvider,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {
        this.getTypeEntrerpisesData();
    }

    ngOnInit() {
    }

    async getTypeEntrerpisesData() {
      const loading = await this.loadingCtrl.create({
        message: 'Chargement...'
      });
      loading.present();
      const opt = {
        should_paginate: false,
        _sort: 'nom',
        _sortDir: 'asc',
      };
      this.api.TypeEntreprises.getList(opt).subscribe(d => {
          this.typeEntreprises = d;
          loading.dismiss();
      }, err => {
          console.log(err);
        loading.dismiss();
      });
    }

    dismiss(category) {
      if(category != undefined ){
        this.modalCtrl.dismiss({
          dismissed: true
        }, category);
      } else {
        this.modalCtrl.dismiss();
      }

    }
}
