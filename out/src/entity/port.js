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
exports.Port = void 0;
var portData = __importStar(require("../../data/attributed_ports.json"));
// var portData = ports.JSON
var Port = /** @class */ (function () {
    function Port() {
        this.name = '';
        this.code = '';
        this.country = '';
        this.function = '';
        this.status = '';
        this.outflows = 0;
        this.latitude = 0;
        this.longitude = 0;
        /*
        distanceBetween(airport :Airport, unit :string = "K"){
            let lat1 = this.latitude;
            let lon1 = this.longitude;
            let lat2 = airport.latitude;
            let lon2 = airport.longitude;
    
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return dist;
            }
        }
        */
    }
    Port.prototype.random = function () {
        var randomItem = portData.features[Math.random() * portData.features.length | 0];
        var port = new Port();
        port.name = randomItem.properties.Name;
        port.country = randomItem.properties.Country;
        port.function = randomItem.properties.Function;
        port.code = randomItem.properties.LOCODE;
        port.status = randomItem.properties.Status;
        port.outflows = randomItem.properties.outflows;
        port.latitude = randomItem.geometry.coordinates[0];
        port.longitude = randomItem.geometry.coordinates[1];
        return port;
    };
    return Port;
}());
exports.Port = Port;
//# sourceMappingURL=port.js.map