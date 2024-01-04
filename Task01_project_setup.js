const { getProjectDetails, getShippingMethodById, getTaxCategoryByKey } = require("./handson/project.js");
const { log } = require("./logger.js");

// TODO 1: Complete the functions in

getProjectDetails().then(log).catch(log)
//getProDetails();

// TODO : GET ShippingMethod by ID
//getShippingMethodById("0c1e9744-1bc1-4f0e-9231-0562f23543cb").then(log).catch(log);

//getTaxCategoryByKey("standard").then(log).catch(log);

// TODO : GET Tax Category by key
