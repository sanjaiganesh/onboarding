/* jshint esversion: 6 */
/* jshint node: true */
/* jshint sub:true */

// Use this to test the onboarding, without using OpenT2T DeviceAccessor APIs.

'use strict';
var q = require('q');
var inquirer = require('inquirer');
var assert = require('assert');

function getUserInput(inputNeeded) {
    return inquirer.prompt(inputNeeded).then(function(answers) {
        return answers;
    });
}

function doOnboarding() {
    var deferred = q.defer();

    var winkOnboarding = require("opent2t-onboarding-winkhub-v2");
    var promises = []; 

    for (var i = 0; i < winkOnboarding.onboardingFlow.length; i++) {
        var item = winkOnboarding.onboardingFlow[i];
        
        if (item.action == 'get-user-input')
        {
            promises.push(getUserInput(item.inputNeeded));
        }
    }

    q.all(promises).done(function (output) {
        winkOnboarding.onboard(output[0]).then(function (tokenInfo) {
            deferred.resolve(tokenInfo);
        });
    });

    return deferred.promise;
}

function createHubAndEnumerate() {
    doOnboarding().then(function (tokenInfo) {
        // Validate token info
        assert(tokenInfo);
        console.log("Authorization Token details: ");
        console.log(tokenInfo.accessToken);
        console.log(tokenInfo);
    
        var winkHubTranslator = require("opent2t-onboarding-winkhub-v2").winkHubTranslator;
        var hub = new winkHubTranslator(tokenInfo.accessToken);

        hub.getDevicesAsync('light_bulb_id').then(function(deviceList){
            console.log("Test - 1 : Filtering for light bulb");
            console.log("---------------------");

            // Validate device list
            assert(deviceList);
            assert(deviceList.length);
            console.log("Number of devices: " + deviceList.length);
            deviceList.forEach(function(device){
                // Validate couple of members
                console.log("Device Name: " + device.name);
                console.log("Device Id: " + device.id);
            });
        }).then(() => {
            hub.getDevicesAsync().then(function(deviceList){
                console.log("-------");
                console.log("");
                console.log("Test - 2 : Get all the devices");
                console.log("---------------------");

                // Validate device list
                assert(deviceList);
                assert(deviceList.length);
                console.log("Number of devices: " + deviceList.length);
                deviceList.forEach(function(device){
                    // Validate couple of members
                    console.log("Device Name: " + device.name);
                    console.log("Device Id: " + device.id);
                });
            });
        });
    }).catch(error => {
        assert(false, error.message);
        console.log("Error: " + error.message);
        throw error;
    });
}

// Run 
createHubAndEnumerate();
