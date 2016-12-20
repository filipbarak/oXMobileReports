import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {UserLoginPage} from "../user-login/user-login";
import {HomePage} from "../home/home";

@Component({
  selector: 'company-login',
  templateUrl: 'company-login.html'
})
export class CompanyLoginPage {
  korisnickoImeFirma: string;
  private token: string;

  constructor(public navCtrl: NavController, private authService: AuthService) {
    if (authService.isFirmaLoggedIn()) {
      this.authService.korisnickoImeFirma = this.authService.getFirma();
      console.log("Logirana firma: " + this.authService.getFirma());
      this.token = authService.getCompanyToken();
      this.navCtrl.push(UserLoginPage);
    }
  }

  login() {
    this.authService.postCompanyLogin(this.korisnickoImeFirma)
      .subscribe(token => {
        console.log(token, "ok.");
        this.token = token;

        // save to localstorage
        this.authService.loginFirma(true, this.korisnickoImeFirma);
        this.authService.setFirmaToken(token);
        this.authService.korisnickoImeFirma = this.korisnickoImeFirma;

        // navigate to userLoginPage
        this.navCtrl.push(UserLoginPage);

      }, err => {
        this.token = 'Error;'
      })
  }

}
