import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoadingController, ModalController} from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';
import * as _ from 'lodash';
import {TypeEntreprisesPage} from '../type-entreprises/type-entreprises.page';

@Component({
  selector: 'app-entreprise-listing',
  templateUrl: './entreprise-listing.page.html',
  styleUrls: ['./entreprise-listing.page.scss'],
})
export class EntrepriseListingPage implements OnInit {

    private typeEntreprise: any;
    private nom = "";
    private allEntreprises: any = [];
    private activeTab: any;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {
      const id = this.route.snapshot.paramMap.get('id');
      this.nom = this.route.snapshot.paramMap.get('nom');
      this.activeTab = 'all';
      this.getEntreprisesByType(id);

    }


    ngOnInit() {
    }


    async openTypeEntreprises() {
        const modal = await this.modalCtrl.create({
            component: TypeEntreprisesPage,
            cssClass: 'my-custom-class',
        });

        modal.onDidDismiss()
            .then((data: any) => {
                if (data.role !== undefined) {
                  this.typeEntreprise = data.role;
                  this.getEntreprisesByType(data.role.id);
                  this.nom = data.role.nom;
                }
            });
        return await modal.present();
    }

    tabChanged(ev) {
        this.activeTab = ev.detail.value;
        if (this.activeTab === 'all') {
            this.allEntreprises = _.orderBy(this.allEntreprises, 'nom');
        } else {
            this.allEntreprises = _.orderBy(this.allEntreprises, 'created_at').reverse();
        }
    }

    async getEntreprisesByType(id) {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            type_entreprises_id: id,
            // type_entreprises_id: 1,
            should_paginate: false,
            _includes: 'localisations.villes,note_entreprises.notes',
            statut : 'active'
        };
        this.api.Entreprises.getList(opt).subscribe( d => {
            // classement des notes
            d.forEach(entreprise => {
                entreprise.telephone = this.api.formarPrice(entreprise.telephone);
                let sumNote = 0;
                entreprise.notes = 0;
                entreprise.note_entreprises.forEach(v => {
                    console.log(v.notes.valeur);
                    if (v.notes.valeur === undefined) {
                        v.notes.valeur = 0;
                    }
                    sumNote += v.notes.valeur;
                });
                if (entreprise.note_entreprises.length !== 0) {
                    entreprise.notes = sumNote / entreprise.note_entreprises.length;
                }

            });
            this.allEntreprises = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }

    async openEntrepriseDetail(p) {
        const navigationExtra: NavigationExtras = {state: {entreprise: {id: p.id}}};
        this.router.navigateByUrl('entreprise-detail', navigationExtra);
    }
}
