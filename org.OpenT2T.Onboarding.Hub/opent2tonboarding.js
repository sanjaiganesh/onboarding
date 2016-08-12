/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

class accessTokenInfo {
        constructor(
            accessToken,
            refreshToken,
            tokenType, // ex: 'bearer'
            scopes // ex: 'full_access'
        )
    {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType;
        this.scopes = scopes;
    }
}

class deviceInfo{
    constructor(
            name,
            id,
            hubId,
            modelName,
            firmwareVersion,
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
        this.firmwareVersion = firmwareVersion;
        this.manufacturer = manufacturer;
        this.location = location; 
        this.locationLatLong = locationLatLong; 
        this.radioType = radioType;
        this.subscriptionKey = subscriptionKey;
        this.channel = channel;
    }
}

module.exports.deviceInfo = deviceInfo;
module.exports.accessTokenInfo = accessTokenInfo;