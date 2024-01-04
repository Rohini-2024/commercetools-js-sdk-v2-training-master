const {getStoreByKey, getCustomersInStore, createInStoreCart,addProductSelectionToStore, getProductsInStore } = require("./handson/store");
const { getCustomerByKey } = require("./handson/customer");
const { log } = require("./logger");

const storeKey = "random-key-123";
const customerKey = "rohini17";
const productSelectionKey = "ff-random-store-selection";
//getStoreByKey(storeName).then(log).catch(log);

// getCustomersInStore(storeKey).then(customers => {
//     log(customers.body.count);
//     customers.body.results.forEach(customer =>{
       
//         if(customer.stores == ""){
//         }else{
//             log(customer.email + "is created under : ")
//             log(customer.stores[0].key + " store")
//         }
//     }
//     )}).catch(log);


//getCustomersInStore(storeKey).then(log).catch(log);

getProductsInStore(storeKey).then(log).catch(log)

// getCustomerByKey(customerKey).then((customer) => {
//    createInStoreCart(customer,storeKey,customerKey).then(log).catch(log);
// }).catch(log);


//addProductSelectionToStore(storeKey,productSelectionKey).then(log).catch(log);