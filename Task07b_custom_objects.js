const { apiRoot, projectKey } = require("./handson/client.js");
const {log} = require('./logger');
const customeObj = require("./handson/customeTypes.js");



const customObjectDraft = {
    container: "compatibility-info",
    key:'tulip-seed-product',
    value: {
        IncompatibleSKUs: "basil-seed-product",
        LeafletID: "leaflet_1234",
        Instructions: {
            Title: "Plant Handling",
            Distance: "2 meter",
            Watering: "heavy watering"
        }
    }

}

// TODO : CREATE the custom object
//customeObj.craeteCustomeObj(customObjectDraft).then(log).catch(log);
// TODO : GET the custom object by container and key
customeObj
.getCustomeObjByContainerAndKey("compatibility-info","tulip-seed-product")
.then(log).catch(log)