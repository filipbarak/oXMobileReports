"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var invoices_1 = require("../invoices/invoices");
var moment = require('moment');
var HomePage = (function () {
    function HomePage(authService, nav, loadingCtrl) {
        var _this = this;
        this.authService = authService;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.invoices = {};
        this.clientNames = [];
        this.myInput = '';
        var loading = this.loadingCtrl.create({
            content: 'Добивање на фактури...'
        });
        loading.present();
        this.authService.getFakturi().subscribe(function (invoices) {
            console.log(invoices, "invos.");
            loading.dismiss();
            _this.invoices = _this.getUniqueFirmi(invoices);
            _this.clientNames = Object.keys(_this.invoices);
            _this.dateNow = new Date();
            console.log(moment().date());
        });
    }
    HomePage.prototype.openFirma = function (firma) {
        this.authService.selectedClient = this.invoices[firma];
        this.nav.push(invoices_1.InvoicesPage);
    };
    HomePage.prototype.getUniqueFirmi = function (invoices) {
        var firmi = {};
        invoices.forEach(function (invoice) {
            if (!firmi[invoice.Ime]) {
                firmi[invoice.Ime] = {
                    Invoices: [],
                    Ime: invoice.Ime.trim(),
                    Kontakt: invoice.Kontakt,
                    Telefon: invoice.Telefon,
                    Dolzi: invoice.Dolzi,
                    DolziVkupno: 0,
                    VkupnoPlateno: 0,
                    VkupenIznos: 0
                };
            }
            firmi[invoice.Ime].VkupenIznos += invoice.IznosSoDDV;
            firmi[invoice.Ime].DolziVkupno += invoice.Dolzi;
            firmi[invoice.Ime].VkupnoPlateno += invoice.Plateno;
            firmi[invoice.Ime].Invoices.push({
                "Datum": invoice.Datum,
                "RokNaPlacanje": invoice.RokNaPlacanje,
                "IznosSoDDV": invoice.IznosSoDDV,
                "Plateno": invoice.Plateno,
                "Ime": invoice.Ime,
                "Broj": invoice.Broj,
                "Dolzi": invoice.Dolzi
            });
        });
        return firmi;
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
