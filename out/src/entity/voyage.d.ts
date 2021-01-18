import { Crewmember } from "./crewmember";
import { Port } from "./port";
import * as luxon from "luxon";
export declare class Voyage {
    id: number;
    ship_pennant: string;
    departure_port: Port;
    arrival_port: Port;
    distance: number;
    estimated_time_departure: luxon.DateTime;
    estimated_time_arrival: luxon.DateTime;
    crewmembers: Array<Crewmember>;
    duration(): luxon.Duration;
    constructor(id: number);
}
