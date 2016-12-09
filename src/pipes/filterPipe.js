"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Filip on 9/12/2016.
 */
var core_1 = require('@angular/core');
var filterPipe = (function () {
    function filterPipe() {
    }
    filterPipe.prototype.transform = function (niza, keyword, args) {
        var _this = this;
        if (niza && keyword)
            return niza.filter(function (item) {
                var contains = false;
                if (args)
                    args.forEach(function (arg) {
                        var obj = (arg.indexOf('.') == -1) ? item[arg] : _this.objByString(item, arg);
                        if (obj)
                            if (obj.toLowerCase().indexOf(keyword.toLowerCase()) != -1)
                                contains = true;
                    });
                else
                    contains = item.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
                return contains;
            });
        else
            return niza;
    };
    filterPipe.prototype.objByString = function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        var a = s.split('.'), i = 0;
        while (i < a.length) {
            if (o[a[i]]) {
                o = o[a[i]];
            }
            ++i;
        }
        return o.toString();
    };
    filterPipe = __decorate([
        core_1.Pipe({
            name: 'filter'
        })
    ], filterPipe);
    return filterPipe;
}());
exports.filterPipe = filterPipe;
