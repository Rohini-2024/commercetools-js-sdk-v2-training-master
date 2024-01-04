const { apiRoot, projectKey } = require("./handson/client.js");
const {log} = require('./logger');
const types = require("./handson/customeTypes.js");


const typeDraft = {
    key:'ff-allowed-to-place-orders1',
    name:{
        "de":'ff allowed to place orders',
        "en":'ff allowed to place orders'
    },
    description:{
        "de":'allow a customer to place orders',
        "en":'allow a customer to place orders'
    },
    resourceTypeIds:['customer'],
    fieldDefinitions:[{
        type:{
            name:'Boolean'
        },
        name:'allowed-to-place-orders',
        label:{
            "de":'Allowed to place orders',
            "en":'Allowed to place orders'
        },
        required:false,
    }]
}

// TODO : CREATE the custom type

types.createCustomeType(typeDraft).then(log).catch(log);
