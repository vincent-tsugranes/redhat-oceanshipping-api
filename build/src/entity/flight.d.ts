import { Crewmember } from "./crewmember";
import { Airport } from "./airport";
export declare class Flight {
    departure_airport: Airport;
    arrival_airport: Airport;
    distance: number;
    estimated_time_departure: Date;
    estimated_time_arrival: Date;
    crewmembers: Array<Crewmember>;
}
