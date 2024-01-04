const { apiRoot, projectKey } = require("./client.js");

//TODO Product Selections

module.exports.getProductSelectionByKey = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

const createProductSelection = (key, name) => {
  return {
    "key": key,
    "name": {
      "en": name
    }
  }
}

module.exports.createProductSelection = (key, name) =>
  apiRoot.withProjectKey({ projectKey }).productSelections().post({
    body: createProductSelection(key, name)
  }).execute()

const addProductToProductSelection = (productSelection) => {
  return {
    "version": productSelection.body.version,
    "actions": [
      {
        "action": "addProduct",
        "product": {
          "typeId": "product",
          "key": "78844"
        },
        "variantSelection": {
          "type": "includeOnly",
          "skus": [ "M0E20000000DTZL" ]
        }
      }
    ]
  }
}
module.exports.addProductsToProductSelection = async (productSelectionKey) =>
  this.getProductSelectionByKey( productSelectionKey).then((productSelection) =>{
    const ID = productSelection.body.id
    console.log(ID)
    return apiRoot.withProjectKey({ projectKey })
      .productSelections().withId( {ID}).post({
        body: addProductToProductSelection(productSelection)
      }).execute();
  })


module.exports.getProductsInProductSelection = (productSelectionKey) =>
  apiRoot.withProjectKey({ projectKey })
    .productSelections().get({
      queryArgs: {
      }
    }).execute();