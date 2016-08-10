/* jshint esversion: 6 */
/* jshint node: true */
/* jshint sub:true */
// This code uses ES2015 syntax that requires at least Node.js v4.
// For Node.js ES2015 support details, reference http://node.green/

"use strict";
var https = require('https');
var q = require('q');
var deviceInfo = require('../../org.OpenT2T.Onboarding.Hub/OpenT2Tdevice');

/**
* This translator class implements the "Hub" interface.
*/
class winkHubTranslator {
    constructor(accessToken) {
        this._accessToken = accessToken;

        this._baseUrl = "api.wink.com";
        this._devicesPath = '/users/me/wink_devices';

        this._name = "Wink Hub"; // TODO: Can be pulled from OpenT2T global constants. This information is not available, at least, on wink hub.
        this._type = "WinkHub"; // TODO: Can be pulled from OpenT2T global constants 
    }

    /**
     * Get the list of devices discovered through the hub.
     */
    getDevicesAsync(idKeyFilter) {
        return this._makeRequest(this._baseUrl, this._devicesPath, this._accessToken, idKeyFilter, false, 'GET');
    }

    /**
     * Get the name of the hub.
     */
    getName() {
        return this._name;
    }

    /**
     * Get the type of the hub.
     */
    getType(value) {
        return this._type;
    }

    // TODO: If possible, this must implement caching mechanism and get data from the serveer only if new data available.
    _makeRequest(url, path, accessToken, idKeyFilter, returnRawBody, method, content) {
        console.log("-------------------------");
        console.log("method             : " + method);
        console.log("url                : " + url);
        console.log("path               : " + path);
        console.log("accessToken      : " + accessToken);

        var deferred = q.defer();

        var requestOptions = {
            protocol: 'https:',
            host: url,
            path: path,
            method: method,
            headers: {}
        };

        if (accessToken) {
            requestOptions.headers['Authorization'] = 'Bearer ' + accessToken;
            requestOptions.headers['Accept'] = 'application/json';
        }
        else if (content) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.headers['Content-Length'] = content.length;
        }

        var request = https.request(requestOptions);
        
        request.on('response', function(response) {
            var body = '';
            response.setEncoding('utf8');
            
            response.on('data', function(data) {
                body += data;
            });

            response.on('end', function() {
                if (response.statusCode != 200) {
                    deferred.reject(new Error("HTTP Error : " + response.statusCode + " - " + response.statusMessage));

                } else {
                    if (returnRawBody) {
                        deferred.resolve(body);
                    }
                    else {
                        var devices = JSON.parse(body).data;

                        // Apply the id key filter
                        var filteredDevices = [];
                        devices.forEach(function(device) {
                            if(!!device[idKeyFilter])
                            {
                                filteredDevices.push(new deviceInfo(
                                    device.name,
                                    device.light_bulb_id,
                                    device.hub_id,
                                    device.model_name,
                                    device.device_manufacturer,
                                    device.location,
                                    device.lat_lng,
                                    device.radio_type,
                                    device.subscription.pubnub['subscribe_key'],
                                    device.subscription.pubnub['channel']
                                    ));
                            }
                        });
                        deferred.resolve(filteredDevices);
                    }
                }
            });

            response.on('error', function(e) {
                deferred.reject(e);
            });
        });

        request.on('error', (e) => {
            deferred.reject(e);
        });

        if (content) {
            request.write(content);
        }

        request.end();

        return deferred.promise;
    }

    logError(error) {
        console.log("Error!");
        if (error.statusMessage) {
            console.log("HTTP Error: " + error.statusCode + " - " + error.statusMessage);
            console.log("HTTP Headers: ");
            console.log(error.headers);
        }
        else {
            console.log(error);
        }
    }
}

// Export the translator from the module.
module.exports = winkHubTranslator;
