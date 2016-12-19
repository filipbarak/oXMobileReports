/**
 * Created by Filip on 12/7/2016.
 */
import {Component} from '@angular/core'
import {AuthService} from "../../services/auth.service";
import * as moment from 'moment';

@Component({
  selector: 'invoices',
  templateUrl: 'invoices.html'

})

export class InvoicesPage {
  aggregatedInfo: any = {

  };
  dateNow: Date;
  constructor(private authService: AuthService) {
    this.dateNow = new Date();
    this.getDatum();
  }



  getDatum() {
    this.authService.selectedClient.Invoices.forEach(invoice=> {
    let tryDatum = moment(invoice.Datum).fromNow();
      return (tryDatum.indexOf('ago') != 1);
      // console.log(typeof(moment(this.dateNow).format()));

    });
  }



}
