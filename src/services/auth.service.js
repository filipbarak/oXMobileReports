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
    function AuthService(http) {
        this.http = http;
        this.url = "http://localhost:3001/webapp";
        this.korisnickoImeFirma = '';
        this.token = '';
        this.selectedClient = {};
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
                _this.http.post(_this.url + "/webapp/validateToken", JSON.stringify({ token: localToken }), { headers: getHeaders })
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
            }
        });
    };
    AuthService.prototype.logoutUserFirma = function () {
        localStorage.removeItem('firmaId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };
    AuthService.prototype.getUserFirma = function () {
        return localStorage.getItem('username');
    };
    AuthService.prototype.postUsernameLogin = function (username, password) {
        var body = JSON.stringify({
            "companyIdentifier": this.korisnickoImeFirma,
            "user": { "username": username, "password": password }
        });
        return this.http.post(this.url + "/login", body, { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.postCompanyLogin = function (korisnickoImeFirma) {
        var body = JSON.stringify({ "companyIdentifier": korisnickoImeFirma });
        return this.http.post(this.url + "/companyLogin", body, { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.isUserFirmaLoggedIn = function () {
        if (!this.getFirma()) {
            return false;
        }
        return this.getUserFirma() != null;
    };
    AuthService.prototype.getFakturi = function () {
        var headers = new http_1.Headers();
        headers.set('x-access-token', this.token);
        console.log(this.token, "DES TOKEn .");
        return this.http.get(this.url + "/fakturiIzvestaj", { headers: headers })
            .map(function (response) { return response.json(); });
    };
    AuthService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
