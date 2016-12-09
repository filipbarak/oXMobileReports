"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_login_1 = require("../user-login/user-login");
var CompanyLoginPage = (function () {
    function CompanyLoginPage(navCtrl, authService) {
        this.navCtrl = navCtrl;
        this.authService = authService;
    }
    CompanyLoginPage.prototype.login = function () {
        var _this = this;
        this.authService.postCompanyLogin(this.korisnickoImeFirma)
            .subscribe(function (token) {
            console.log(token, "ok.");
            _this.token = token;
            _this.authService.korisnickoImeFirma = _this.korisnickoImeFirma;
            _this.navCtrl.push(user_login_1.UserLoginPage);
        }, function (err) {
            _this.token = 'Error;';
        });
    };
    CompanyLoginPage = __decorate([
        core_1.Component({
            selector: 'company-login',
            templateUrl: 'company-login.html'
        })
    ], CompanyLoginPage);
    return CompanyLoginPage;
}());
exports.CompanyLoginPage = CompanyLoginPage;
