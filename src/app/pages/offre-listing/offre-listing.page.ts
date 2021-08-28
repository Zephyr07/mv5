import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoadingController, ModalController} from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-offre-listing',
  templateUrl: './offre-listing.page.html',
  styleUrls: ['./offre-listing.page.scss'],
})
export class OffreListingPage implements OnInit {

    private nom = "";
    private type = "";
    private allOffres: any = [];
    private activeTab: any;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {
      this.type = this.route.snapshot.paramMap.get('type');
      const id = this.route.snapshot.paramMap.get('id');
      this.nom = this.route.snapshot.paramMap.get('nom');
      console.log(this.type, id, this.nom);
      if(this.type === 'c') {
        // categories
        this.getOffresByCategories(id);
      } else if (this.type === 'm'){
        // marque
        this.getOffresByMarque(id);
      } else {
        console.log('aucun paramètre');
      }
      this.activeTab = 'all';
    }

    ngOnInit() {
    }

    async openOffrePrix(title, id) {
        const navigationExtra: NavigationExtras = { state: { prix: { nom: title, id} } };
        this.router.navigateByUrl('offre-prix', navigationExtra);
    }

    /*async openCategories() {
        const modal = await this.modalCtrl.create({
            component: CategoriesPage,
            cssClass: 'my-custom-class',
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.role !== undefined) {
                    this.categories = data.role;
                }
                this.getOffresByCategories();
            });
        return await modal.present();
    }*/

    tabChanged(ev) {
        this.activeTab = ev.detail.value;
        // chassement suivant le choix
        if (this.activeTab === 'all') {
          this.allOffres = _.orderBy(this.allOffres, 'nom');
        } else {
            this.allOffres = _.orderBy(this.allOffres, 'created_at').reverse();
        }
    }

    async getOffresByCategories(id) {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            categories_id: id,
            should_paginate: false,
            _includes: 'prix_offres,note_offres.notes',
            statut : 'active'
        };
        this.api.Offres.getList(opt).subscribe( d => {
            d.forEach(offres => {
              offres.loaded = false;
              let sumNote = 0;
              offres.notes = 0;
              offres.note_offres.forEach(v => {
                if (v.notes.valeur === undefined) {
                    v.notes.valeur = 0;
                }
                sumNote += v.notes.valeur;
              });
              if (offres.note_offres.length !== 0) {
                  offres.notes = sumNote / offres.note_offres.length;
              }
            });
            this.allOffres = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }

    async getOffresByMarque(id) {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            marques_id: id,
            should_paginate: false,
            _includes: 'prix_offres,note_offres.notes',
            statut : 'active'
        };
        this.api.Offres.getList(opt).subscribe( d => {
            d.forEach(offres => {
              offres.loaded = false;
              let sumNote = 0;
              offres.notes = 0;
              offres.note_offres.forEach(v => {
                if (v.notes.valeur === undefined) {
                    v.notes.valeur = 0;
                }
                sumNote += v.notes.valeur;
              });
              if (offres.note_offres.length !== 0) {
                  offres.notes = sumNote / offres.note_offres.length;
              }
            });
            this.allOffres = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }
}
