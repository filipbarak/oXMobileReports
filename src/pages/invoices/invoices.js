"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Filip on 12/7/2016.
 */
var core_1 = require('@angular/core');
var moment = require('moment');
var InvoicesPage = (function () {
    function InvoicesPage(authService) {
        this.authService = authService;
        this.aggregatedInfo = {};
        this.enableFilter = false;
        this.dateNow = new Date();
        this.getDatum();
    }
    InvoicesPage.prototype.getDatum = function () {
        this.authService.selectedClient.Invoices.forEach(function (invoice) {
            var tryDatum = moment(invoice.Datum).fromNow();
            return (tryDatum.indexOf('ago') != 1);
            // console.log(typeof(moment(this.dateNow).format()));
        });
    };
    InvoicesPage = __decorate([
        core_1.Component({
            selector: 'invoices',
            templateUrl: 'invoices.html'
        })
    ], InvoicesPage);
    return InvoicesPage;
}());
exports.InvoicesPage = InvoicesPage;
