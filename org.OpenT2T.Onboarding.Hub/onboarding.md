# Onboarding Scenarios

Onboarding allows dvelopers to add devices to the opent2t system allowing opent2t apps and services to talk to them.

Onboarding covers various scenarios: devices with physical hubs, devices with virtual hubs (devices connected to the cloud), and direct access devices.  

The onboarding flow is:

### Overview
* instantiate onboarding class for your device (NestOnboarding, WinkOnboarding, etc)
* using onboardingFlow and connect() go through auth flow (details below)
* using output of connect, create a hub/translator device

### Details
* onboarding exposes onboardingFlow property
* caller of onboarding uses onboardingFlow to perform actions
* caller of onboarding calls onboarding.onboard() 
* caller receives output and passes that into hub constructor
* app stores all input
* hub needs to throw specific re-auth errors, app needs to call hub.refresh again for refreshing token

## Auth Flow
There are three main authorization scenarios:

Auth Type|Definition|
---|---|
**Implicit Auth**|Client to hub/service auth with credentials|
**Explicit Auth**|User needs to provide permissions to app for auth|
**Manual Auth**|User needs to perform some action, ie press a button, pair, etc|

The flow for onboarding will be very similar:

**For Implicit Auth devices:**
* get input from user
* communicate with hub/service
* enumerate devices 

**For Explicit Auth devices:**
* communciate with hub/service
* ask user to grant permission
* enumerate devices

**For Manual Auth devices:**
* identify device
* ask user to put device in pairing mode
* communicate with device

## Hub based devices
The scenario here is things are connected to a hub, all communication happens through the hub.  For example things like the Wink hub, you ask the hub to turn device 4 on/off. For cloud based devices (Nest) the cloud acts as the hub, we can think of it as a virtual hub, opent2t talks to the virtual hub which talks to the device.

opent2t --> hub --> device

opent2t --> cloud (virtual hub) --> device

An exception to this is the Nest which allows developers to communicate directly to it's devices over the weave protocol.   

### Add Device to Opent2t - add new device to hub
Typically users will onboard devices which are already paired to the hub but inevitably the user will want to add a new device to the system.  Scenario 1 is where the user adds the devices to the hub directly through the hub software and then perform onboarding to get the device into opent2t.  Scenario 2 is where the user adds the devices to the hub through opent2t. Scenario 2 requires the hub to expose add device apis.

todo: add table of which devices enable this.   

## Non Hub based devices
These are devices such as wifi direct or bluetooth.

todo: add more details

## Device Onboarding Info
For onboarding a device, there are two sets of input/action that need to be done, one by the end user and one by the developer.  Each devices is different and requires different input/action for end user/developer.  This table is meant to summarize that info.

Device|Auth Type|Onboarding Type|Input/Action Required from End User|Input/Action Required from Developer|
---|---|---|
Vera|Custom|Implicit Auth|device serial, username, password|none| 
Osram Lightify|Custom|Implicit Auth|device serial, username, password|none|
Wink|O-Auth|Implicit Auth|username, password|register app, client id, client secret?|
Nest|O-Auth|Explicit Auth|login/grant permission on webpage|register app, client id, client secret|
Phillips Hue|O-Auth?|Implicit Auth|userid?|app?

## Proximal Control
Proximal control allows opent2t to talk to things without going to the cloud, only some hubs/things support this.

todo: add table of which devices 