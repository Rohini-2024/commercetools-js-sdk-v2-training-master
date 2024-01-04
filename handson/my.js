const { Headers } = require("node-fetch");
const { myApiRoot, projectKey, apiRoot } = require("./client.js");

//TODO me endpoint


module.exports.getMe = () => 
apiRoot.withProjectKey({projectKey}).me())
)

module.exports.getMyOrders = () => {}