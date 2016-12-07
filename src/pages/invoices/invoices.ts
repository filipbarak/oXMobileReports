/**
 * Created by Filip on 12/7/2016.
 */
import {Component} from '@angular/core'
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'invoices',
  templateUrl: 'invoices.html'

})

export class InvoicesPage {
  aggregatedInfo: any = {

  };
  constructor(private authService: AuthService) {

  }


}
