const states = require("./handson/states");
const { log } = require("./logger.js");

const orderDeliveredStateDraft = {
  key: "new-order-delivered",
  type: "OrderState",
  name: {
    "de": "FF Order Delivered ",
    "en": "FF Order Delivered ",
  },
  initial: true,
};

const orderShippedStateDraft = {
  key: "new-order-shipped",
  type: "OrderState",
  name: {
    "de": "FF Order Shipped ",
    "en": "FF Order Shipped ",
  },
  initial: false,
};

const createStatesWithTransitions = async () => {
  let orderPackedState = await states.createNewState(orderDeliveredStateDraft)
  log(orderPackedState.body.id)
  let orderCompletedState = await states.createNewState(orderShippedStateDraft)
  log(orderCompletedState.body.id)
  orderPackedState = states.createStatesWithTransitions(orderPackedState.body.id, [orderCompletedState.body.id])

  //orderCompletedState = states.createStatesWithTransitions(orderCompletedState.body.id, [])

  return orderPackedState;
};

createStatesWithTransitions();

// states.createStatesWithTransitions("c7aea881-0942-4933-a632-a87aeb416f88",
// "034acd49-02ea-4b08-b563-7905cd1353ba",
// ).then(log).catch(log);

//states.getStateByKey("readyForReview").then(log).catch(log)
