const checkout = require("./handson/order");
const { log } = require("./logger.js");

const customerId = "87343815-5239-48fe-bc27-2d09b858de70";
const cartId = "cfacf028-6be0-4880-bcd4-50574c0065d9";
const orderId = "c1f7d1e6-1bf6-44b5-af9f-acbcee7e65d2";
const paymentId="b79b176c-99d6-4b04-afa4-b473e8afed07";
const tranactionId = "99324905-4469-407d-9a6b-4ae8fb398cd4";

const paymentDraft = {
  key:"payment" + Math.random().toString(36).substr(2, 5),
  amountPlanned:{
    currencyCode: 'EUR',
    centAmount: 5000
  }
}

// create a cart and update the catId variable
//checkout.createCart(customerId).then(log).catch(log);

//checkout.addLineItemsToCart(cartId,"22a6fa99-81f1-4882-8b19-0fa5fae7dcbc").then(log).catch(log);

 //checkout.addDiscountCodeToCart(cartId, "CART_10Per_OFF").then(log).catch(log);
// checkout.getCartById(cartId).then(log).catch(log);

//set shippign address to cart
//checkout.updateCart(cartId).then(log).catch(log);
 //create order from cart and update the orderId
//checkout.createOrderFromCart(cartId).then(log).catch(log);

//checkout.getOrderById(orderId).then(log).catch(log);

// set order state to confirmed and custom workflow state to order packed
//checkout.setOrderState(orderId, 'Confirmed').then(log).catch(log);
//checkout.updateOrderCustomState(orderId,"ff-order-packed").then(log).catch(log);

//create payment
//checkout.createPayment(paymentDraft).then(log).catch(log);
//add payment to order
//checkout.addPaymentToOrder(orderId, paymentId).then(log).catch(log);

//add transaction to payment
//checkout.addTransactionToPaymnet(paymentId).then(log).catch(log);
//update payment status
checkout.changePaymentStatus(paymentId,"Success",tranactionId).then(log).catch(log);

// const checkoutProcess = async () => {
//   let emptyCart = await checkout.createCart(customerKey);

//   let filledCart = await checkout.addLineItemsToCart(
//     emptyCart.body.id,['tulip-seed-box','tulip-seed-sack']
//   );
//   filledCart = await checkout.addDiscountCodeToCart(
//     emptyCart.body.id, 'SUMMER'
//   );

//   let order = await checkout.createOrderFromCart(filledCart.body.id);
//   const payment = await checkout.createPayment(paymentDraft);
//   order = await checkout.addPaymentToOrder(order.body.id, payment.body.id);
//   order = await checkout.setOrderState(order.body.id, 'Confirmed');
//   order = await checkout.updateOrderCustomState(order.body.id,'ff-order-packed');
//   if (order) {
//     return {
//       status: 201,
//       message: "order created: " + order.body.id,
//     };
//   }
// };

// checkoutProcess().then(log).catch(log);
