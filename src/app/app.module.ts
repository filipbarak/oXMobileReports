import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AuthService} from "../services/auth.service";
import {CompanyLoginPage} from "../pages/company-login/company-login";
import {UserLoginPage} from "../pages/user-login/user-login";
import {InvoicesPage} from "../pages/invoices/invoices";
import {filterPipe} from "../pipes/filterPipe";
import {FilterByPaid} from "../pipes/filterByPaid";
import {FilterByUnPaid} from "../pipes/filterByUnpaid";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CompanyLoginPage,
    UserLoginPage,
    HomePage,
    TabsPage,
    InvoicesPage,
    filterPipe,
    FilterByPaid,
    FilterByUnPaid
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CompanyLoginPage,
    UserLoginPage,
    HomePage,
    TabsPage,
    InvoicesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
