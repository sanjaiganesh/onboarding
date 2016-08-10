// update to point to the right place
var AllJoynConverter = require("openT2T/converters/AllJoynConverter");

module.exports = AllJoynConverter.readDeviceInterfacesFromFile(
    require("path").join(__dirname, "../../org.OpenT2T.Onboarding.Hub/org.OpenT2T.Sample.SuperPopular.Hub.xml"))[0];

