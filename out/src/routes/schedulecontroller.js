"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var luxon = __importStar(require("luxon"));
var url = require('url');
var faker = require('faker');
var crewmember_1 = require("../entity/crewmember");
var port_1 = require("../entity/port");
var voyage_1 = require("../entity/voyage");
var ScheduleController = /** @class */ (function () {
    function ScheduleController() {
        this.router = express.Router();
        this.path = '/schedule';
        this.getSchedule = function (request, response) {
            var queryObject = url.parse(request.url, true).query;
            var startDate = luxon.DateTime.utc();
            var endDate = startDate.plus({ months: 12 });
            if ('start' in queryObject && 'end' in queryObject) {
                startDate = luxon.DateTime.fromISO(queryObject.start);
                endDate = luxon.DateTime.fromISO(queryObject.end);
            }
            var shipCount = 10;
            if ('shipCount' in queryObject) {
                shipCount = Number.parseInt(queryObject.shipCount);
            }
            var voyageCount = 20;
            if ('voyageCount' in queryObject) {
                voyageCount = Number.parseInt(queryObject.voyageCount);
            }
            var ports = generateSchedule(shipCount, voyageCount, startDate, endDate);
            response.send(ports);
        };
        this.intializeRoutes();
    }
    ScheduleController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getSchedule);
    };
    return ScheduleController;
}());
function generateSchedule(shipCount, voyageCount, start, end) {
    console.log('Generating ' + shipCount + ' ships with ' + voyageCount + ' voyages from ' + start.toString() + ' to ' + end.toString());
    var voyages = new Array();
    for (var i = 0; i < shipCount; i++) {
        var ship_pennant = 'SS' + faker.random.number({ min: 100, max: 999 }) + 'RH';
        //initialize the first flight
        var lastVoyage = new voyage_1.Voyage(faker.random.number({ min: 100, max: 9999 }) + (i * 10000));
        lastVoyage.arrival_port = new port_1.Port().random();
        lastVoyage.estimated_time_arrival = start.minus({ hours: 4 });
        for (var j = 0; j < voyageCount; j++) {
            var thisVoyage = new voyage_1.Voyage(lastVoyage.id + 1);
            thisVoyage.ship_pennant = ship_pennant;
            thisVoyage.departure_port = lastVoyage.arrival_port;
            thisVoyage.arrival_port = new port_1.Port().random();
            if (thisVoyage.arrival_port.code == thisVoyage.departure_port.code) {
                thisVoyage.arrival_port = new port_1.Port().random();
            }
            thisVoyage.estimated_time_departure = lastVoyage.estimated_time_arrival.plus({ hours: faker.random.number({ min: 1, max: 6 }) }); //add random between 1-4 for ground
            thisVoyage.estimated_time_arrival = thisVoyage.estimated_time_departure.plus({ hours: faker.random.number({ min: 3, max: 12 }) }); //add random between 3-10 for flight 
            //thisVoyage.distance = thisVoyage.departure_airport.distanceBetween(thisVoyage.arrival_airport);
            thisVoyage.crewmembers.push(new crewmember_1.Crewmember().random());
            thisVoyage.crewmembers.push(new crewmember_1.Crewmember().random());
            voyages.push(thisVoyage);
            lastVoyage = thisVoyage;
        }
    }
    return voyages;
}
exports.default = ScheduleController;
//# sourceMappingURL=schedulecontroller.js.map