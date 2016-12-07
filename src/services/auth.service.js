"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
    }
    AuthService.prototype.loginFirma = function (success, firmaId) {
        if (success) {
            localStorage.setItem('firmaId', firmaId);
            return true;
        }
        return false;
    };
    AuthService.prototype.logoutFirma = function () {
        localStorage.removeItem('firmaId');
        this.router.navigate(['/companyLogin']);
    };
    AuthService.prototype.getFirma = function () {
        return localStorage.getItem('firmaId');
    };
    AuthService.prototype.isFirmaLoggedIn = function () {
        return this.getFirma() != null;
    };
    AuthService.prototype.loginUserFirma = function (success, token, username) {
        if (success) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            return true;
        }
        return false;
    };
    AuthService.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var localToken = localStorage.getItem('token');
            var getHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
            if (localToken) {
                _this.http.post("http://localhost:3001/webapp/validateToken", JSON.stringify({ token: localToken }), { headers: getHeaders })
                    .map(function (res) { return res.json(); })
                    .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); })
                    .subscribe(function (data) {
                    if (data.success) {
                        console.log("Successfully Validated Token.");
                        resolve(true);
                    }
                    else {
                        console.log("Token Validation Failed.");
                        resolve(false);
                    }
                });
            }
            else {
                resolve(false);
                _this.router.navigate(['/companyLogin']);
            }
        });
    };
    AuthService.prototype.logoutUserFirma = function () {
        localStorage.removeItem('firmaId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.router.navigate(['/companyLogin']);
    };
    AuthService.prototype.getUserFirma = function () {
        return localStorage.getItem('username');
    };
    AuthService.prototype.isUserFirmaLoggedIn = function () {
        if (!this.getFirma()) {
            return false;
        }
        return this.getUserFirma() != null;
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
