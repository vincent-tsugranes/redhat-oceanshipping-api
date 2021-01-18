"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
var airport_1 = require("./airport");
var Flight = /** @class */ (function () {
    function Flight() {
        this.departure_airport = new airport_1.Airport();
        this.arrival_airport = new airport_1.Airport();
        this.distance = 0;
        this.estimated_time_departure = new Date();
        this.estimated_time_arrival = new Date();
        this.crewmembers = new Array();
    }
    return Flight;
}());
exports.Flight = Flight;
