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
var router = express.Router();
var faker = require('faker');
var flight_1 = require("../entity/flight");
var airport_1 = require("../entity/airport");
var ScheduleController = /** @class */ (function () {
    function ScheduleController() {
        this.router = express.Router();
        this.path = '/schedule';
        this.getSchedule = function (request, response) {
            var aircraft = generateAircraft(50, 50);
            response.send(aircraft);
        };
        this.intializeRoutes();
    }
    ScheduleController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getSchedule);
    };
    return ScheduleController;
}());
function generateAircraft(aircraftCount, flightsCount) {
    var aircraft = [];
    for (var i = 0; i < aircraftCount; i++) {
        var aircraft_registration = 'N' + faker.random.number({ min: 100, max: 999 }) + 'VT';
        var flights = new Array();
        //let departure_airport = ""
        //let arrival_airport = ""
        //let estimated_time_departure = faker.date.recent();
        //let estimated_time_arrival = 
        //faker.date.recent();
        for (var j = 0; j < flightsCount; j++) {
            var thisFlight = new flight_1.Flight();
            var lastFlight = new flight_1.Flight();
            if (j == 0) {
                lastFlight.departure_airport = new airport_1.Airport().random();
            }
            thisFlight.departure_airport = lastFlight.arrival_airport;
            thisFlight.arrival_airport = new airport_1.Airport().random();
            //thisFlight.distance = thisFlight.departure_airport.distanceBetween(thisFlight.arrival_airport);
            flights.push(thisFlight);
            /*
                        if(arrival_airport == ""){
                            //first flight for aircraft
                            departure_airport = "ATL";
                            estimated_time_departure = faker.date.recent();
                            estimated_time_arrival = estimated_time_departure //add random between 3-10
                        }else{
                            //depart from last arrival airport
                            departure_airport = arrival_airport;
                            estimated_time_departure = estimated_time_arrival //add random between 1-4
            
                        }
                      
                        arrival_airport = faker.random.alpha(3);
            
                        flights.push(
                            {
                                departure_airport: departure_airport,
                                arrival_airport: arrival_airport
                            });
            */
        }
        aircraft.push({ aircraft: aircraft_registration, flights: flights });
    }
    return aircraft;
}
exports.default = ScheduleController;
