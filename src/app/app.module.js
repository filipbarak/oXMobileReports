"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var about_1 = require('../pages/about/about');
var home_1 = require('../pages/home/home');
var tabs_1 = require('../pages/tabs/tabs');
var auth_service_1 = require("../services/auth.service");
var company_login_1 = require("../pages/company-login/company-login");
var user_login_1 = require("../pages/user-login/user-login");
var invoices_1 = require("../pages/invoices/invoices");
var filterPipe_1 = require("../pipes/filterPipe");
var filterByPaid_1 = require("../pipes/filterByPaid");
var filterByUnpaid_1 = require("../pipes/filterByUnpaid");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                about_1.AboutPage,
                company_login_1.CompanyLoginPage,
                user_login_1.UserLoginPage,
                home_1.HomePage,
                tabs_1.TabsPage,
                invoices_1.InvoicesPage,
                filterPipe_1.filterPipe,
                filterByPaid_1.FilterByPaid,
                filterByUnpaid_1.FilterByUnPaid
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                about_1.AboutPage,
                company_login_1.CompanyLoginPage,
                user_login_1.UserLoginPage,
                home_1.HomePage,
                tabs_1.TabsPage,
                invoices_1.InvoicesPage
            ],
            providers: [{ provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }, auth_service_1.AuthService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
