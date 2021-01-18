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
exports.Voyage = void 0;
var port_1 = require("./port");
var luxon = __importStar(require("luxon"));
var Voyage = /** @class */ (function () {
    function Voyage(id) {
        this.id = 0;
        this.ship_pennant = '';
        this.departure_port = new port_1.Port();
        this.arrival_port = new port_1.Port();
        this.distance = 0;
        this.estimated_time_departure = luxon.DateTime.utc();
        this.estimated_time_arrival = luxon.DateTime.utc();
        this.crewmembers = new Array();
        this.id = id;
    }
    Voyage.prototype.duration = function () {
        return this.estimated_time_departure.diff(this.estimated_time_arrival);
    };
    return Voyage;
}());
exports.Voyage = Voyage;
//# sourceMappingURL=voyage.js.map