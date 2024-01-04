const { apiRoot, projectKey } = require("./client.js");
const { log } = require("../logger.js");

module.exports.getAllCustomers = () => {
  return apiRoot.withProjectKey({ projectKey })
    .customers().get({
      queryArgs: {
        // limit:1,
        // offset:3,
        //where:"firstName=\"Rohini\"",
        sort: "createdAt desc"
      }
    }).execute()
}

module.exports.getCustomerById = (ID) =>
  apiRoot.withProjectKey({ projectKey })
    .customers().withId({ ID })
    .get()
    .execute()

module.exports.getCustomerByKey = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .customers().withKey({ key })
    .get()
    .execute()

module.exports.getCustomerGroupByKey = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .customerGroups().withKey({ key })
    .get()
    .execute()

const createCustomerDraft = (customerData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    key,
    countryCode
  } = customerData;
  return {
    firstName,
    lastName,
    email,
    key,
    password,
    addresses: [
      {
        "country": countryCode
      }]
  }
}
//create Customer
module.exports.createCustomer = (customerData) =>
  apiRoot.withProjectKey({ projectKey })
    .customers()
    .post({
      body: createCustomerDraft(customerData)
    }).execute()



module.exports.customerDataUpdate = (customerUpdateData, ID) =>
  this.getCustomerById(ID).then((customer) => {
    return apiRoot.withProjectKey({ projectKey })
      .customers()
      .withId({ ID })
      .post({
        body: customerUpdateDraftData(customerUpdateData, customer)
      }).execute()
  }).catch(log)

module.exports.deleteCustomer = (ID) =>
  this.getCustomerById(ID).then((customer) => {
    return apiRoot.withProjectKey({ projectKey })
      .customers()
      .withId({ ID }).delete({
        queryArgs: {
          version: customer.body.version
        }
      }
      ).execute()
  })



// module.exports.createCustomerToken = (customer) => 
// apiRoot.withProjectKey({projectKey}).customers().emailToken().post({
//   body:
// })

module.exports.confirmCustomerEmail = (token) => { }

//Update Customer
const customerUpdateDraftData = (customerUpdateData, customer) => {
  const {
    email
  } = customerUpdateData;
  return {
    "version": customer.body.version,
    "actions": [
      {
        "action": "changeEmail",
        "email": email
      }
    ]
  }
}
const customerGroupUpdate = (customer, customerGroupKey) => {
  return {
    "version": customer.body.version,
    "actions": [
      {
        "action": "setCustomerGroup",
        "customerGroup": {
          "id": customerGroupKey,
          "typeId": "customer-group"
        }
      }
    ]
  }
}

module.exports.assignCustomerToCustomerGroup = (ID, customerGroupKey) =>
  this.getCustomerById(ID).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID })
      .post({
        body: customerGroupUpdate(customer, customerGroupKey)
      })
      .execute();
  })
