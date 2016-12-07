import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
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

  }

  login(){
    this.authService.postUsernameLogin(this.client.username, this.client.password)
      .subscribe(data => {
        this.authService.token = data.token;
        this.navCtrl.setRoot(HomePage);
      }, err => {
        this.token = 'Error;'
      })
  }

}
