const { apiRoot, storeApiRoot, projectKey } = require("./client.js");
const {
  getProductSelectionByKey
} = require("./productSelections.js");

//TODO store and productProjection endpoint
let ID = "";
module.exports.getStoreByKey = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .stores()
    .withKey({ key })
    .get()
    .execute()


// module.exports.getCustomersInStore = (storeKey) =>
//   apiRoot.withProjectKey({ projectKey })
//     .inStoreKeyWithStoreKeyValue({ storeKey }).customers().get().execute();

module.exports.getCustomersInStore = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ key:key }).customers().get()
    .execute();


const addProjectSelectionToStore = (store, projectSelection) => {
  return {
    "version": store.body.version,
    "actions": [
      {
        "action": "setProductSelections",
        "productSelections": [{
          "productSelection": {
            "typeId": "product-selection",
            "id": projectSelection.body.id
          },
          "active": true
        }
        ]
      }
    ]
  }
}

module.exports.addProductSelectionToStore = (storeKey, productSelectionKey) =>
  this.getStoreByKey(storeKey).then((store) => {
    ID = store.body.id;
    getProductSelectionByKey(productSelectionKey).then((projectSelection) => {
      return apiRoot.withProjectKey({ projectKey })
        .stores()
        .withId({ ID }).post({
          body: addProjectSelectionToStore(store, projectSelection)
        })
    })
  })

module.exports.getProductsInStore = (storeKey) => 
apiRoot.withProjectKey({projectKey}).
inStoreKeyWithStoreKeyValue({storeKey}).productSelectionAssignments().get().execute();

const addCustomerToStoreDraft = (customer, storeKey) => {
  return {
    "version": customer.body.version,
    "actions": [
      {
        "action": "addStore",
        "store": {
          "key": storeKey,
          "typeId": "store"
        }
      }
    ]
  }
}

module.exports.createInStoreCart = (customer, key, customerKey) =>
  apiRoot.withProjectKey({ projectKey })
    .customers().withKey({ key: customerKey }).post({
      body: addCustomerToStoreDraft(customer, key)
    }).execute();
