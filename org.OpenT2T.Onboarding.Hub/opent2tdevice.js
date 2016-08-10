/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

class deviceInfo{
    constructor(
            name,
            id,
            hubId,
            modelName,
            manufacturer,
            location,  // Description of the location
            locationLatLong, // Lattitute and longitude of the location
            radioType, // ex: zigbee
            subscriptionKey, // pubnub related, if applicable
            channel // pubnub related, if applicable
        )
    {
        this.name = name;
        this.id = id;
        this.hubId = hubId;
        this.modelName = modelName;
        this.manufacturer = manufacturer;
        this.location = location; 
        this.locationLatLong = locationLatLong; 
        this.radioType = radioType;
        this.subscriptionKey = subscriptionKey;
        this.channel = channel;
    }
}

module.exports = deviceInfo;