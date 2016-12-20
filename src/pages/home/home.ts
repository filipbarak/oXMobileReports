import {Component} from '@angular/core';

import {NavController, LoadingController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {InvoicesPage} from "../invoices/invoices";
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  invoices: any = {};
  private clientNames: any = [];
  myInput: string = '';
  dateNow: Date;

  constructor(public authService: AuthService, private nav: NavController, private loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Добивање на фактури...'
    });
    loading.present();
    this.authService.getFakturi().subscribe(invoices => {
      console.log(invoices, "invos.");
      loading.dismiss();
      this.invoices = this.getUniqueFirmi(invoices);
      this.clientNames = Object.keys(this.invoices);

    });
  }

  openFirma(firma) {
    this.authService.selectedClient = this.invoices[firma];
    this.nav.push(InvoicesPage);
  }

  getUniqueFirmi(invoices) {
    let firmi = {};
    invoices.forEach(invoice => {
      if (!firmi[invoice.Ime]) {
        firmi[invoice.Ime] = {
          Invoices: [],
          Ime: invoice.Ime.trim(),
          Kontakt: invoice.Kontakt,
          Telefon: invoice.Telefon,
          Dolzi: invoice.Dolzi,
          DolziVkupno: 0,
          VkupnoPlateno: 0,
          VkupenIznos: 0
        };
      }
      firmi[invoice.Ime].VkupenIznos += invoice.IznosSoDDV;
      firmi[invoice.Ime].DolziVkupno += invoice.Dolzi;
      firmi[invoice.Ime].VkupnoPlateno += invoice.Plateno;
      firmi[invoice.Ime].Invoices.push({
        "Datum": invoice.Datum,
        "RokNaPlacanje": invoice.RokNaPlacanje,
        "IznosSoDDV": invoice.IznosSoDDV,
        "Plateno": invoice.Plateno,
        "Ime": invoice.Ime,
        "Broj": invoice.Broj,
        "Dolzi": invoice.Dolzi
      })
    })
    return firmi;
  }

  // getDatum() {
  //   this.authService.getFakturi().subscribe(invoices => {
  //     invoices.forEach(invoice => {
  //       let tryDatum = moment(invoice.Datum).fromNow();
  //       return (tryDatum.indexOf('ago') != 1);
  //     });
  //
  //   });
  // }

  testInvoices(){
    this.authService.getFakturi().subscribe(invoices => {
      console.log(invoices, "lololollol");
      invoices.forEach(invoice => {
        let tryDatum = moment(invoice.Datum).fromNow();
        console.log(tryDatum);
        return (tryDatum.indexOf('ago') != 1);

      });

    });
  }

}
