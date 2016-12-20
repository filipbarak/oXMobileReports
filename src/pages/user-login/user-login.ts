import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {CompanyLoginPage} from "../company-login/company-login";
import {HomePage} from "../home/home";

@Component({
  selector: 'user-login',
  templateUrl: 'user-login.html'
})
export class UserLoginPage {
  client: any = {};
  private token: string;

  constructor(public navCtrl: NavController, private authService: AuthService) {
    if (this.authService.getUserFirma()) {
      console.log("Firma: " + this.authService.getUserFirma());
      console.log(this.authService.getCompanyToken());
      console.log("Username: " + this.authService.getFirma());
      console.log("Password: " + this.authService.getUserPasswordFirma());
      console.log("Password: " + this.authService.getCompanyToken());

      // this.login();
      this.authService.postUsernameLogin(this.authService.getUsername(), this.authService.getUserPasswordFirma())
        .subscribe(data => {
          console.log(data.token);
          this.authService.token = data.token;
          console.log(authService.token);
          this.navCtrl.setRoot(HomePage);
        }, err => {
          this.token = 'Error;'
        })
    }
  }

  login() {
    this.authService.postUsernameLogin(this.client.username, this.client.password)
      .subscribe(data => {
        // console.log(data.user.name);
        this.authService.token = data.token;
        this.authService.loginUserFirma(true, data.token, this.client.username, this.client.password);
        this.navCtrl.setRoot(HomePage);
      }, err => {
        this.token = 'Error;'
      })
  }

}
