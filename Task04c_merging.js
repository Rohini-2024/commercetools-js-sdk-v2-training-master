const checkout = require("./handson/order");
const { log } = require("./logger.js");

const customerId = "87343815-5239-48fe-bc27-2d09b858de70";

const mergingProcessTest = async () => {
  let anonymousCart = await checkout.createAnonymousCart();

  let customerCart = await checkout.createCart(customerId);

  anonymousCart = await checkout.addLineItemsToCart( anonymousCart.body.id,"22a6fa99-81f1-4882-8b19-0fa5fae7dcbc" );

  customerCart = await checkout.addLineItemsToCart
  ( customerCart.body.id, "341d4861-ff71-4000-bbf1-79679553ce97" );

  log("Anonymous Cart: " + anonymousCart.body.id);
  log("Customer Cart: "+ customerCart.body.id);

  const customerDetails = {
    email: "rohini@yopmail.com",
    password: "Password@11@",
    anonymousCartId: anonymousCart.body.id,
    anonymousCartSignInMode: "UseAsNewActiveCustomerCart", // try switching to UseAsNewActiveCustomerCart
  };
  let result = await checkout.customerSignIn(customerDetails);
  return result.body.cart;
};
mergingProcessTest().then((cart) => {
  log("Active cart: " + cart.id);
  cart.lineItems.forEach(item => {
    log(item.variant.sku+ " :" + item.quantity);
  });
})
.catch(log);
