import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {UserLoginPage} from "../user-login/user-login";

@Component({
  selector: 'company-login',
  templateUrl: 'company-login.html'
})
export class CompanyLoginPage {
  korisnickoImeFirma: string;
  private token: string;
  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  login(){
    this.authService.postCompanyLogin(this.korisnickoImeFirma)
      .subscribe(token => {
        console.log(token, "ok.");
        this.token = token;
        this.authService.korisnickoImeFirma = this.korisnickoImeFirma;
        this.navCtrl.push(UserLoginPage);

      }, err => {
        this.token = 'Error;'
      })
  }

}
