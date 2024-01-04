const {
  getAllCustomers,
  createCustomer,
  customerDataUpdate,
  deleteCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");

const { log } = require("./logger.js");

//getAllCustomers().then(log).catch(log);

const customerDraftData = {
  firstName: "Rohini",
  lastName: "Test",
  email: "rohini21@yopmail.com",
  password: "Password@11@",
  key: "rohini21",
  countryCode: "DE",
};

const customerUpdateDraftData = {
  email: "rohini16New@yopmail.com",
};

createCustomer(customerDraftData).then(log).catch(log);

//deleteCustomer("e2b91251-47e2-4448-995c-8493c5566fff").then(log).catch(log);

//customerDataUpdate(customerUpdateDraftData , "43eac8f2-bc56-43a7-bbf6-a5199c3cc02e").then(log).catch(log);

//getCustomerByKey("rohini17").then(log).catch(log);

//getCustomerById("87343815-5239-48fe-bc27-2d09b858de70").then(log).catch(log);

// getCustomerByKey('rohini16')
//   .then(createCustomerToken)
//   .then(confirmCustomerEmail)
//   .then(log)
//   .catch(log);

// assignCustomerToCustomerGroup("87343815-5239-48fe-bc27-2d09b858de70", 
// "800ca47d-bfdb-4fe6-b4fb-c9e2c86221ee").then(log).catch(log);