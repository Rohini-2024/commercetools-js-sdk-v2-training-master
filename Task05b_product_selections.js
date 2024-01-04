const {
  getProductsInStore,
  addProductSelectionToStore
} = require("./handson/store");
const {
  getProductSelectionByKey,
  createProductSelection,
  addProductsToProductSelection,
  getProductsInProductSelection
} = require("./handson/productSelections");

const { log } = require("./logger");
const storeKey = "random-key-123";
const productSelectionKey = "fff-random-store-selection";
const productSelectionName = "FFF Berlin Store Selection";

 //createProductSelection(productSelectionKey,productSelectionName).then(log).catch(log);

 //getProductSelectionByKey(productSelectionKey).then(log).catch(log);

//addProductsToProductSelection(productSelectionKey,"Sneakers Lemare black").then(log).catch(log);

 //addProductSelectionToStore(storeKey,productSelectionKey).then(log).catch(log);

getProductsInProductSelection(productSelectionKey).then(log).catch(log);

//getProductsInStore(storeKey).then(log).catch(log);

//getProductsInProductSelection().then(log).catch(log);
