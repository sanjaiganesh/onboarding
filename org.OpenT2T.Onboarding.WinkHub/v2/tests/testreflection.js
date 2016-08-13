/* jshint esversion: 6 */
/* jshint node: true */
/* jshint sub:true */

/// Test using reflection API (DeviceAccessor)

'use strict';
var q = require('q');
var inquirer = require('inquirer');
var opent2t = require('opent2t');
var ava = require('ava');
var config = require('./testconfig');

// This boilerplate code is copied from transpiled typescript AVA test code, which enables usage of 'yield' keyword. 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};

console.log(config.accessToken);
// Enumerate light bulb
ava.test.serial("", (t) => __awaiter(this, void 0, void 0, function* () {
    
    let device = yield opent2t.DeviceAccessor.createTranslatorAsync("../..", "winkhubtranslator", config.accessToken); // Path is relative to the OpenT2T module
    t.is(typeof device, "object") && t.truthy(device);

    var devices = yield opent2t.DeviceAccessor.invokeMethodAsync(device, "org.OpenT2T.Sample.SuperPopular.Hub", "getDevices", ['light_bulb_id']);
    t.is(typeof devices, "object") && t.truthy(devices);

    t.not(devices.length, 0); // Expect non-zero number of devices
    console.log("Number of devices : " + devices.length);
    console.log(devices[0].name);
    console.log(devices[0].id);
    t.true(!!(devices[0].name));
    t.true(!!(devices[0].id));
}));
console.log("------------------------------------------");
console.log("");

// Enumerate all the devices
ava.test.serial("", (t) => __awaiter(this, void 0, void 0, function* () {
    
    let device = yield opent2t.DeviceAccessor.createTranslatorAsync("../..", "winkhubtranslator", config.accessToken); // Path is relative to the OpenT2T module
    t.is(typeof device, "object") && t.truthy(device);

    var devices = yield opent2t.DeviceAccessor.invokeMethodAsync(device, "org.OpenT2T.Sample.SuperPopular.Hub", "getDevices", []);
    t.is(typeof devices, "object") && t.truthy(devices);

    t.not(devices.length, 0); // Expect non-zero number of devices
    console.log("Number of devices : " + devices.length);
    t.true(!!(devices[0].name));
}));
