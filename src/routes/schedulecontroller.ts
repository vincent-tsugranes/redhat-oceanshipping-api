
import * as express from 'express';
import * as luxon from 'luxon';
const url = require('url');

const faker = require('faker');

import { Crewmember } from "../entity/crewmember";

import { Port } from "../entity/port";
import { Voyage } from '../entity/voyage';

class ScheduleController{
    public router = express.Router();
    public path = '/schedule';

    constructor() {
        this.intializeRoutes();
      }

    public intializeRoutes() {
        this.router.get(this.path, this.getSchedule);
       }

      getSchedule = (request: express.Request, response: express.Response) => {
        const queryObject = url.parse(request.url,true).query;

        let startDate = luxon.DateTime.utc();
        let endDate = startDate.plus({months:12})

        if ('start' in queryObject && 'end' in queryObject){
            startDate = luxon.DateTime.fromISO(queryObject.start)
            endDate = luxon.DateTime.fromISO(queryObject.end)
        }

        let shipCount = 10
        if ('shipCount' in queryObject){
            shipCount = Number.parseInt(queryObject.shipCount)
        }

        let voyageCount = 20
        if ('voyageCount' in queryObject){
            voyageCount = Number.parseInt(queryObject.voyageCount)
        }

        const ports = generateSchedule(shipCount, voyageCount, startDate, endDate);
        response.send(ports);
      }

}


function generateSchedule(shipCount: number, voyageCount: number,start: luxon.DateTime, end: luxon.DateTime){
    
    console.log('Generating ' + shipCount + ' ships with ' + voyageCount + ' voyages from ' + start.toString() + ' to ' + end.toString())
    
    let voyages = new Array<Voyage>();
    
    for(var i=0; i<shipCount; i++){
        let ship_pennant = 'SS' + faker.random.number({min: 100, max: 999}) + 'RH';

        //initialize the first flight
        let lastVoyage = new Voyage(faker.random.number({min: 100, max: 9999}) + (i * 10000))
        lastVoyage.arrivalPort = new Port().random();
        lastVoyage.estimatedTimeArrival = start.minus({ hours: 4 });


        for(var j=0; j<voyageCount; j++){
            let thisVoyage :Voyage = new Voyage(lastVoyage.id +1);
            thisVoyage.shipPennant = ship_pennant;
            thisVoyage.departurePort = lastVoyage.arrivalPort;
            thisVoyage.arrivalPort = new Port().random();
            if (thisVoyage.arrivalPort.code == thisVoyage.departurePort.code) { thisVoyage.arrivalPort = new Port().random() }

            thisVoyage.estimatedTimeDeparture = lastVoyage.estimatedTimeArrival.plus({days:faker.random.number({min: 5, max: 20})}); //add random between 1-4 for dock
            thisVoyage.estimatedTimeArrival = thisVoyage.estimatedTimeDeparture.plus({days:faker.random.number({min: 3, max: 30})}); //add random between 3-10 for voyage 
            //thisVoyage.distance = thisVoyage.departure_airport.distanceBetween(thisVoyage.arrival_airport);

            thisVoyage.crewmembers.push(new Crewmember().random());
            thisVoyage.crewmembers.push(new Crewmember().random());

            voyages.push(thisVoyage);
            lastVoyage = thisVoyage;
        }
    }
    return voyages;
}

export default ScheduleController;