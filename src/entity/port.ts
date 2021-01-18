 import * as portData from '../../data/attributed_ports.json'
// var portData = ports.JSON

export class Port{
    name: string = ''
    code: string = ''
    country: string = ''
    function: string = ''
    status: string = ''
    outflows: number = 0
    latitude: number = 0
    longitude: number = 0

    random() :Port {
        var randomItem = portData.features[Math.random() * portData.features.length | 0]
        const port = new Port()
        port.name = randomItem.properties.Name
        port.country = randomItem.properties.Country
        port.function = randomItem.properties.Function
        port.code = randomItem.properties.LOCODE
        port.status = randomItem.properties.Status
        port.outflows = randomItem.properties.outflows
        port.latitude = randomItem.geometry.coordinates[1]
        port.longitude = randomItem.geometry.coordinates[0]
        return port
    }

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

