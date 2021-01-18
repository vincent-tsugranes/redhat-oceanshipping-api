import { Crewmember } from "./crewmember"
import { Port } from "./port";
import * as luxon from "luxon";

export class Voyage {
    id: number = 0
    shipPennant: string = ''
    departurePort: Port = new Port()
    arrivalPort: Port = new Port()
    distance :number = 0

    estimatedTimeDeparture: luxon.DateTime = luxon.DateTime.utc()
    estimatedTimeArrival: luxon.DateTime = luxon.DateTime.utc()

    crewmembers: Array<Crewmember> = new Array<Crewmember>()

    public duration() {
      return this.estimatedTimeDeparture.diff(this.estimatedTimeArrival);
    }

    constructor(id: number) {
        this.id = id
      }

      
}
