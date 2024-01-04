const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require("./customer.js");


const cartDraft=(customerId)=>{
  return{
      "currency" : "EUR",
      "actions": [
        {
            "action" : "setCustomerId",
            "customerId" : customerId
          }
    ]
  }
}

const customerLoginDraft=(customerLoginDraft)=>{
  const {
    email,
    password,
    anonymousCartId,
    anonymousCartSignInMode
  } = customerLoginDraft;
  return {
    email,
    password,
    anonymousCartId,
    anonymousCartSignInMode
  }

}


module.exports.createCart = (customerId) =>
  apiRoot.withProjectKey({ projectKey })
    .carts().post({
      body:cartDraft(customerId)
    }).execute();

module.exports.createAnonymousCart = () =>
  apiRoot.withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute()

module.exports.customerSignIn = (customerDetails) =>
apiRoot.withProjectKey({projectKey}).login().post({
  body:customerLoginDraft(customerDetails)
}).execute();

module.exports.getCartById = (ID) =>
  apiRoot.withProjectKey({ projectKey })
    .carts()
    .withId({ ID })
    .get()
    .execute();

const cartLineItemDraft = (cart, productId) => {
  return {
    "version": cart.body.version,
    "actions": [{
      "action": "addLineItem",
      "productId": productId,
      "variantId": 1,
      "quantity": 1
    }]
  }

}
module.exports.addLineItemsToCart = (ID, productId) =>
  this.getCartById(ID).then((cart) => {
    return apiRoot.withProjectKey({ projectKey })
      .carts()
      .withId({ ID })
      .post(
        {
          body: cartLineItemDraft(cart, productId)
        }).execute();
  })

const addCartDiscountDraft = (cart, disocuntCode) => {
  return {
    "version": cart.body.version,
    "actions": [
      {
        "action": "addDiscountCode",
        "code": disocuntCode
      }
    ]
  }
}
module.exports.addDiscountCodeToCart = (ID, discountCode) =>
  this.getCartById(ID).then((cart) => {
    return apiRoot.withProjectKey({ projectKey })
      .carts().withId({ ID })
      .post({
        body: addCartDiscountDraft(cart, discountCode)
      }).execute();
  })

const createOrderFromCartDraft = (cart, ID) => {
  return {
    cart: {
      id: cart.body.id,
      typeId: "cart"
    },
    version: cart.body.version
  };
};
const setShippingAddress = (cart, ID) => {
  return {
    version: cart.body.version,
    "actions": [
      {
        "action": "setShippingAddress",
        "address": {
          country: 'DE'
        }
      }
    ]
  }
}


module.exports.createOrderFromCart = (ID) =>
  this.getCartById(ID).then((cart) => {
    return apiRoot.withProjectKey({ projectKey })
      .orders()
      .post({
        body: createOrderFromCartDraft(cart, ID)
      }).execute()
  });

module.exports.updateCart = (ID) =>
  this.getCartById(ID).then((cart) => {
    return apiRoot.withProjectKey({ projectKey })
      .carts().withId({ ID }).post({
        body: setShippingAddress(cart, ID)
      }).execute();
  })

module.exports.getOrderById = (ID) =>
  apiRoot.withProjectKey({ projectKey })
    .orders().withId({ ID }).get().execute();

module.exports.updateOrderCustomState = (orderId, customStateKey) => { }

module.exports.createPayment = (paymentDraft) =>
  apiRoot.withProjectKey({ projectKey })
    .payments().post({
      body: paymentDraft
    }).execute();

const orderStateChangeDraft = (order, stateName) => {
  return {
    "version": order.body.version,
    "actions": [
      {
        "action": "changeOrderState",
        "orderState": stateName
      }
    ]
  }
}

module.exports.setOrderState = (ID, stateName) =>
  this.getOrderById(ID).then((order) => {
    return apiRoot.withProjectKey({ projectKey }).
      orders().withId({ ID }).post({
        body: orderStateChangeDraft(order, stateName)
      }).execute()
  });

const addPaymentToOrder = (order, paymentId) => {
  return {
    "version": order.body.version,
    "actions": [
      {
        "action": "addPayment",
        "payment": {
          "typeId": "payment",
          "id": paymentId
        }
      }
    ]
  }
}
module.exports.addPaymentToOrder = (ID, paymentId) =>
  this.getOrderById(ID).then((order) => {
    return apiRoot.withProjectKey({ projectKey })
      .orders().withId({ ID })
      .post({
        body: addPaymentToOrder(order, paymentId)
      }).execute();
  })
const changePaymentStatus=(payment,state,tranactionId)=>{
  return{
      "version": payment.body.version,
      "actions": [
          {
              "action" : "changeTransactionState",
              "transactionId" : tranactionId,
              "state" : state
            }
      ]
  }
}
  module.exports.changePaymentStatus = (ID,state,tranactionId) =>
  this.getPaymentById(ID).then((payment)=>{
    return apiRoot.withProjectKey({projectKey})
    .payments().withId({ID}).post({
      body:changePaymentStatus(payment,state,tranactionId)
    }).execute();
  })
   


const addTransaction=(payment)=>{
  return{
    "version": payment.body.version,
    "actions": [
        {
            "action" : "addTransaction",
            "transaction" : {
              "type" : "Authorization",
              "amount" : {
                "centAmount" : 4000,
                "currencyCode" : "EUR"
              }
            }
          }
    ]
}
}
module.exports.getPaymentById = (ID) =>
apiRoot.withProjectKey({projectKey}).payments().withId({ID}).get().execute();


module.exports.addTransactionToPaymnet = (ID)=>
  this.getPaymentById(ID).then((payment)=>{
    return apiRoot.withProjectKey({projectKey})
    .payments().withId({ID})
    .post({
      body:addTransaction(payment)
    }).execute()
  })

