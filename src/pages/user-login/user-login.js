"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var home_1 = require("../home/home");
var UserLoginPage = (function () {
    function UserLoginPage(navCtrl, authService) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.client = {};
    }
    UserLoginPage.prototype.login = function () {
        var _this = this;
        this.authService.postUsernameLogin(this.client.username, this.client.password)
            .subscribe(function (data) {
            _this.authService.token = data.token;
            _this.navCtrl.setRoot(home_1.HomePage);
        }, function (err) {
            _this.token = 'Error;';
        });
    };
    UserLoginPage = __decorate([
        core_1.Component({
            selector: 'user-login',
            templateUrl: 'user-login.html'
        })
    ], UserLoginPage);
    return UserLoginPage;
}());
exports.UserLoginPage = UserLoginPage;
